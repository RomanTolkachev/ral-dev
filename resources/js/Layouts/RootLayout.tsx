import Header from '@/Components/Header'
import { Router } from '@/app/Router'



function RootLayout() {
    return (
        <div
            className='max-h-svh h-svh flex flex-col overflow-hidden bg-background w-screen font-Inter transition-colors duration-200'>
            <Header />
            <Router />
        </div>
    )
}

export default RootLayout
