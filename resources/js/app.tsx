import '../css/app.css'
import './bootstrap'

import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '@/features/store/root-reducer'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from "react-dom/client"
import MainLayout from './Layouts/MainLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AuthProvider from './app/providers/AuthProvider'
import { CookiesProvider } from 'react-cookie';

export const store = configureStore({
    reducer: rootReducer, //@ts-ignore
    devTools: process.env.NODE_ENV !== 'production',
})

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
const queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <Provider store={store}>
            <BrowserRouter>
                <CookiesProvider>
                    <AuthProvider>
                        <MainLayout />
                    </AuthProvider>
                </CookiesProvider>
            </BrowserRouter>
        </Provider>
    </QueryClientProvider>
)


