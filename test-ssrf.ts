import dns from 'node:dns/promises';

export function isPrivateIP(ip: string): boolean {
    const parts = ip.split('.');
    if (parts.length === 4) {
        if (parts[0] === '127') return true;
        if (parts[0] === '10') return true;
        if (parts[0] === '169' && parts[1] === '254') return true;
        if (parts[0] === '0') return true;
        if (parts[0] === '192' && parts[1] === '168') return true;
        if (parts[0] === '172') {
            const second = parseInt(parts[1], 10);
            if (second >= 16 && second <= 31) return true;
        }
    }

    const ip6 = ip.toLowerCase();
    if (ip6 === '::1') return true;
    if (ip6.startsWith('fe80:')) return true;
    if (ip6.startsWith('fc00:') || ip6.startsWith('fd')) return true;

    return false;
}

export async function isSafeUrl(urlString: string): Promise<boolean> {
    try {
        const url = new URL(urlString);
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
            return false;
        }

        const hostname = url.hostname;

        if (hostname === 'localhost') {
            return false;
        }

        const lookup = await dns.lookup(hostname);
        if (isPrivateIP(lookup.address)) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
}
