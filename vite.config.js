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
    build: {
        chunkSizeWarningLimit: 600,
    },
    server: {
        host: '0.0.0.0', 
        port: 5173,
        hmr: {
            host: 'localhost',
            protocol: 'ws'
        },
    },
});
