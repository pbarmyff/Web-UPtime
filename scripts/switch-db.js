const fs = require('fs');
const path = require('path');

const validProviders = ['sqlite', 'mysql', 'postgresql'];
const targetDb = process.argv[2];

if (!targetDb || !validProviders.includes(targetDb.toLowerCase())) {
    console.error(`❌ Invalid database type. Please specify one of: ${validProviders.join(', ')}`);
    console.log(`Example: npm run db:switch postgresql`);
    process.exit(1);
}

const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
let schemaContent = fs.readFileSync(schemaPath, 'utf8');

// Replace the provider line inside datasource db
const providerRegex = /datasource\s+db\s*{\s*provider\s*=\s*"([^"]+)"/;

if (providerRegex.test(schemaContent)) {
    const currentProvider = schemaContent.match(providerRegex)[1];

    if (currentProvider === targetDb) {
        console.log(`ℹ️  Database is already set to ${targetDb}.`);
        process.exit(0);
    }

    // Change provider
    schemaContent = schemaContent.replace(providerRegex, `datasource db {\n  provider = "${targetDb}"`);

    // Change URL fallback based on provider
    let newUrl = 'env("DATABASE_URL")';
    if (targetDb === 'sqlite') {
        newUrl = '"file:./dev.db"';
    }

    const urlRegex = /url\s*=\s*("file:\.\/dev\.db"|env\("DATABASE_URL"\))/;
    schemaContent = schemaContent.replace(urlRegex, `url      = ${newUrl}`);

    fs.writeFileSync(schemaPath, schemaContent);

    console.log(`✅ Successfully switched database provider to: ${targetDb}`);
    console.log(`\nNext Steps:`);
    if (targetDb === 'sqlite') {
        console.log(`1. Run 'npx prisma db push' to create dev.db`);
    } else {
        console.log(`1. Update your .env file with your new DATABASE_URL (e.g. Supabase connection string)`);
        console.log(`2. Run 'npx prisma db push' or 'npx prisma migrate dev' to sync your database`);
    }
} else {
    console.error("❌ Could not find datasource db block in prisma/schema.prisma");
    process.exit(1);
}
