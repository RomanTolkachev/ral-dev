import { Header } from '@/Components/Header'
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router'
import { TableLayout } from './TableLayout'
import { Raltable } from '@/features/ralTable/ui/RalTable/RalTable'
import { CustomFormProvider } from '@/features/ralTable/api/RalFormProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NotFound } from '@/Components/utils/404'
import Modal from '@/Components/modal/Modal'
import { AnimatePresence } from 'motion/react'
import { memo, useEffect } from 'react'
import { RalModal } from '@/features/ralModal/ui/RalModal'

const queryClient = new QueryClient();


function Main() {
    const navigate = useNavigate();
    const location = useLocation();
    const background = location.state && location.state.background

    function closeRalModal() {
        location.state ? navigate(-1) : navigate("/directory/ral")
    }

    return (
        <div
            className={
                'max-h-svh h-svh flex flex-col overflow-hidden bg-background w-screen font-Inter transition-colors duration-200'
            }>
            <Header />
            <Routes>
                <Route path="/" element={<Navigate to="/directory/ral" replace />} />
                <Route path="/directory" element={<TableLayout />}>
                    <Route path="ral/*" element={
                        <QueryClientProvider client={queryClient}>
                            <ReactQueryDevtools initialIsOpen={true} />
                            <CustomFormProvider>
                                <Raltable />
                                {/* <AnimatePresence> //TODO: не работает exit animation. blocker */}
                                    {/* {background && ( */}
                                        <Routes location={location} key={location.pathname}>
                                            <Route
                                                path=":ralId"
                                                element={
                                                    <Modal closeModal={closeRalModal} children={<RalModal />} />
                                                }
                                            />
                                        </Routes>
                                    {/* )} */}
                                {/* </AnimatePresence> */}
                            </CustomFormProvider>
                        </QueryClientProvider>
                    } />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default Main
