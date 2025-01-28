import { Header } from '@/Components/Header'
import { Navigate, Route, Routes } from 'react-router'
import { TableLayout } from './TableLayout'
import { Raltable } from '@/features/RalTable/ui/RalTable'
import { CustomFormProvider } from '@/features/RalTable/api/RalFormProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NotFound } from '@/Components/utils/404'

const queryClient = new QueryClient();

function Main() {

    return (
        <div
            className={
                'max-h-svh h-svh flex flex-col overflow-hidden bg-background w-screen font-Inter transition-colors duration-200'
            }>
            <Header />
            <Routes>
                <Route path="/" element={<Navigate to="/directory/ral" replace/>}/>
                <Route path="/directory"element={<TableLayout />}>
                    <Route path="ral" element={ 
                        <QueryClientProvider client={queryClient}>
                            <ReactQueryDevtools initialIsOpen={true} />
                            <CustomFormProvider>
                                <Raltable />
                            </CustomFormProvider>
                        </QueryClientProvider>
                    }/> 
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default Main
