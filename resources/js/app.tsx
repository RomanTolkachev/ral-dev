import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import {StrictMode} from "react";
import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "@/services/reducers/root-reducer";
import {Provider} from "react-redux";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

export const store = configureStore({
    reducer: rootReducer,
})

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Layouts/${name}.tsx`,
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
