import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: '0.0.0.0', // слушать все интерфейсы
        port: 5173,
        hmr: {
            host: 'localhost', // HMR всегда через localhost
            protocol: 'ws'
        },
        // Важно: укажите правильный origin для SSR
        // origin: 'http://192.168.42.28:5173',
        // proxy: {
        //     '/api': {
        //         target: 'http://192.168.42.28:8000', // Адрес вашего Laravel
        //         changeOrigin: true,
        //         secure: false,
        //         headers: {
        //             Origin: 'http://localhost:3000' // Или другой из allowed_origins
        //         }
        //     },
        //     '/sanctum': {
        //         target: 'http://192.168.42.28:8000',
        //         changeOrigin: true,
        //         secure: false,
        //         headers: {
        //             Origin: 'http://localhost:3000'
        //         }
        //     },
        //     '/login': {
        //         target: 'http://192.168.42.28:8000',
        //         changeOrigin: true,
        //         secure: false,
        //         headers: {
        //             Origin: 'http://localhost:3000'
        //         }
        //     },
        //     '/logout': {
        //         target: 'http://192.168.42.28:8000',
        //         changeOrigin: true,
        //         secure: false,
        //         headers: {
        //             Origin: 'http://localhost:3000'
        //         }
        //     }
        // }
    },
});
