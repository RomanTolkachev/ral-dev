import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import {StrictMode} from "react";
import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "@/services/slices/root-reducer";
import {Provider} from "react-redux";

// @ts-ignore
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
})


createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Layouts/${name}.tsx`,// @ts-ignore
            import.meta.glob('./Layouts/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <StrictMode>
                <Provider store={store}>
                    <App {...props} />
                </Provider>
            </StrictMode>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
