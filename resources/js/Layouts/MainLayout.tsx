import { Header } from '@/Components/Header'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { TableLayout } from './TableLayout'
import { Raltable } from '@/features/ralTable/ui/RalTable/RalTable'
import { RalFormProvider } from '@/features/ralTable/api/RalFormProvider'
import { NotFound } from '@/Components/utils/404'
import Modal from '@/Components/modal/Modal'
import { RalModal } from '@/features/ralModal/ui/RalModal'
import { AnimatePresence } from 'motion/react'
import Home from '@/features/home/ui/Home'
import LoginPage from '@/features/Login/LoginPage'
import RalSettings from '@/features/RalTable/ui/RalSettings/RalSettings'
import { OnlyAuth, OnlyUnAuth } from '@/app/ProtectedRoute'
import PersonalPage from '@/features/Login/PersonalPage'
import AccreditationAreaTable from '@/features/AccreditationArea/AccreditationAreaTable'

function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const background = location.state && location.state.background

    function closeRalModal() {
        location.state ? navigate(-1) : navigate(`/directory/ral/${location.search}`)
    }
    return (
        <div
            className={
                'max-h-svh h-svh flex flex-col overflow-hidden bg-background w-screen font-Inter transition-colors duration-200'
            }>
            <Header />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/directory" element={<TableLayout />}>
                    <Route path="ral/*" element={
                            <RalFormProvider>
                                <Raltable />
                                {/* <AnimatePresence> //TODO: не работает exit animation
                                    {background && ( */}
                                        <Routes location={location} key={location.pathname}>
                                            <Route 
                                                path='settings'
                                                element={<Modal closeModal={() => navigate(-1)} children={<RalSettings />} />}
                                            />
                                            <Route
                                                path=":ralId"
                                                element={
                                                    <Modal closeModal={() => navigate(-1)} children={<RalModal />} />}                                        
                                            />
                                        </Routes>
                                     {/* )} 
                                </AnimatePresence> */}
                            </RalFormProvider>
                    } />
                    <Route path='accreditation_area' element={
                        <AccreditationAreaTable />} 
                    />
                </Route>
                <Route path='/login' element={<OnlyUnAuth component={<LoginPage />} />} />
                <Route path='/personal' element={<OnlyAuth component={<PersonalPage />} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default MainLayout
