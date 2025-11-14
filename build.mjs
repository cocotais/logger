import { build } from 'esbuild';

try {
    await build({
        entryPoints: ['index.ts'],
        outfile: 'index.js',
        bundle: false,
        platform: 'node',
        format: 'esm',
        target: 'node16',
        sourcemap: false,
        minify: true,
        tsconfig: 'tsconfig.json'
    });
} catch (error) {
    console.error('❌ 构建失败:', error);
    process.exit(1);
}

