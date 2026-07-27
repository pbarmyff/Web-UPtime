import https from "https";
import http from "http";
import net from "net";

function isPrivateIP(ip: string): boolean {
    if (!net.isIP(ip)) return false;

    // Normalize IPv4-mapped IPv6 addresses (e.g. ::ffff:127.0.0.1)
    if (ip.startsWith('::ffff:')) {
        ip = ip.substring(7);
    }

    if (net.isIPv4(ip)) {
        const parts = ip.split('.').map(Number);
        return (
            parts[0] === 0 || // Current network
            parts[0] === 10 || // Private network
            parts[0] === 127 || // Loopback
            (parts[0] === 169 && parts[1] === 254) || // Link-local
            (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) || // Private network
            (parts[0] === 192 && parts[1] === 168) || // Private network
            (parts[0] === 100 && parts[1] >= 64 && parts[1] <= 127) || // Carrier-grade NAT
            parts[0] >= 224 // Multicast and reserved
        );
    }

    if (net.isIPv6(ip)) {
        const normalized = ip.toLowerCase();
        return (
            normalized === '::1' || // Loopback
            normalized === '::' || // Unspecified
            normalized.startsWith('fc') || normalized.startsWith('fd') || // Unique local address (fc00::/7)
            normalized.startsWith('fe8') || normalized.startsWith('fe9') || // Link-local address (fe80::/10)
            normalized.startsWith('fea') || normalized.startsWith('feb')
        );
    }

    return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function safeCreateConnection(options: any, callback: any) {
    if (net.isIP(options.host) && isPrivateIP(options.host)) {
        throw new Error(`Access to private IP ${options.host} is forbidden`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (net.Socket.prototype as any).connect.call(new net.Socket(), {
        ...options,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        lookup: (hostname: string, lookupOptions: any, cb: any) => {
            if (net.isIP(hostname)) {
                if (isPrivateIP(hostname)) {
                    return cb(new Error(`Access to private IP ${hostname} is forbidden`));
                }
                return cb(null, hostname, net.isIPv4(hostname) ? 4 : 6);
            }

            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const dns = require('dns');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dns.lookup(hostname, lookupOptions, (err: any, address: any, family: any) => {
                if (err) return cb(err, address, family);

                if (Array.isArray(address)) {
                    for (const addr of address) {
                        if (isPrivateIP(addr.address)) {
                            return cb(new Error(`Access to private IP ${addr.address} is forbidden`), address, family);
                        }
                    }
                } else if (typeof address === 'string' && isPrivateIP(address)) {
                    return cb(new Error(`Access to private IP ${address} is forbidden`), address, family);
                }

                cb(null, address, family);
            });
        }
    });
}

class SafeHttpAgent extends http.Agent {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createConnection(options: any, callback: any) {
        return safeCreateConnection(options, callback);
    }
}

class SafeHttpsAgent extends https.Agent {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createConnection(options: any, callback: any) {
        return safeCreateConnection(options, callback);
    }
}

export const getAgent = (parsedUrl: URL) => {
    const isHttps = parsedUrl.protocol === 'https:';
    if (isHttps) {
        return new SafeHttpsAgent({ rejectUnauthorized: true });
    } else {
        return new SafeHttpAgent();
    }
};
