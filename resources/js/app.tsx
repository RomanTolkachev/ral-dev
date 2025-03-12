import '../css/app.css'
import './bootstrap'

import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '@/features/store/root-reducer'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import ReactDOM from "react-dom/client"
import Main from './Layouts/Main'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const store = configureStore({
    reducer: rootReducer, //@ts-ignore
    devTools: process.env.NODE_ENV !== 'production',
})

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
const queryClient = new QueryClient();
console.log("рендер апп")

root.render(
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <Provider store={store}>
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </Provider>
    </QueryClientProvider>
)


