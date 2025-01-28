import '../css/app.css'
import './bootstrap'

import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '@/services/slices/root-reducer'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import ReactDOM from "react-dom/client"
import Main from './Layouts/Main'

export const store = configureStore({
    reducer: rootReducer, //@ts-ignore
    devTools: process.env.NODE_ENV !== 'production',
})

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    </Provider>
)


