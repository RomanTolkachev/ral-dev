import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
        visualizer({
            filename: 'dist/stats.html',
            open: true,
            gzipSize: true,
        })
    ],
    server: {
        host: '0.0.0.0', // слушать все интерфейсы
        port: 5173,
        hmr: {
            host: 'localhost', // HMR всегда через localhost
            protocol: 'ws'
        },
    },
});
