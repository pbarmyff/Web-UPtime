const fs = require('fs');
const path = require('path');
require('dotenv').config();

const provider = process.env.DATABASE_PROVIDER || 'sqlite';

const validProviders = ['sqlite', 'postgresql', 'mysql'];

if (!validProviders.includes(provider)) {
    console.error(`Invalid DATABASE_PROVIDER: ${provider}. Must be one of: ${validProviders.join(', ')}`);
    process.exit(1);
}

const schemaPath = path.join(__dirname, '../prisma/schema.prisma');
let schemaContent = fs.readFileSync(schemaPath, 'utf8');

// Replace the provider line inside datasource db
const providerRegex = /datasource\s+db\s*{\s*provider\s*=\s*"([^"]+)"/;

if (providerRegex.test(schemaContent)) {
    const currentProvider = schemaContent.match(providerRegex)[1];

    // Change provider
    schemaContent = schemaContent.replace(providerRegex, `datasource db {\n  provider = "${provider}"`);

    // Change URL fallback based on provider
    let newUrl = 'env("DATABASE_URL")';
    if (provider === 'sqlite') {
        // Only override URL for sqlite if it's not set in env or it looks like a pg/mysql url
        if (!process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith('postgres') || process.env.DATABASE_URL.startsWith('mysql')) {
             newUrl = '"file:./dev.db"';
        }
    }

    const urlRegex = /url\s*=\s*("file:\.\/dev\.db"|env\("DATABASE_URL"\))/;
    schemaContent = schemaContent.replace(urlRegex, `url      = ${newUrl}`);

    fs.writeFileSync(schemaPath, schemaContent);

    console.log(`✅ Prisma schema configured for ${provider}.`);
} else {
    console.error("❌ Could not find datasource db block in prisma/schema.prisma");
    process.exit(1);
}
