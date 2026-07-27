function escapeCsvField(field: string | null | undefined): string {
    if (!field) return '""';

    let sanitized = field;
    if (/^[=+\-@]/.test(sanitized)) {
        sanitized = "'" + sanitized;
    }

    sanitized = sanitized.replace(/"/g, '""');

    return `"${sanitized}"`;
}

console.log(escapeCsvField('normal text'));
console.log(escapeCsvField('=cmd|C\\calc.exe'));
console.log(escapeCsvField('text with "quotes"'));
console.log(escapeCsvField(''));
console.log(escapeCsvField(null));
