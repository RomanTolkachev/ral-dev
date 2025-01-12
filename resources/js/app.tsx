import '../css/app.css'
import './bootstrap'

import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '@/services/slices/root-reducer'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CustomFormProvider } from '@/app/providers/CustomFormProvider'
import { BrowserRouter, Router } from 'react-router'

// @ts-ignore
const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
})

const queryClient = new QueryClient()

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Layouts/${name}.tsx`, // @ts-ignore
            import.meta.glob('./Layouts/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el)
        root.render(
            // <StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <QueryClientProvider client={queryClient}>
                        <CustomFormProvider>
                            <ReactQueryDevtools initialIsOpen={true} />
                            <App {...props} />
                        </CustomFormProvider>
                    </QueryClientProvider>
                </BrowserRouter>
            </Provider>,
            // </StrictMode>
        )
    },
    progress: {
        color: '#4B5563',
    },
})
