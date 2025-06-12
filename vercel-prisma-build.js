import fs from 'fs';
import path from 'path';
import { nodeFileTrace } from '@vercel/nft';


async function main() {
    const { fileList } = await nodeFileTrace(['node_modules/@prisma/client/index.js']);
    for (const file of fileList) {
        const src = path.resolve(file);
        const dest = path.resolve('.next/standalone', file);
        if (fs.existsSync(src)) {
            fs.mkdirSync(path.dirname(dest), { recursive: true });
            fs.copyFileSync(src, dest);
        }
    }
}
main();
