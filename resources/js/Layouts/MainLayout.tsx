import Header from '@/Components/Header'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { TableLayout } from './TableLayout'
import { Raltable } from '@/features/ralTable/ui/RalTable/RalTable'
import { NotFound } from '@/Components/utils/404'
import Modal from '@/Components/modal/Modal'
import { RalModal } from '@/features/ralModal/ui/RalModal'
import Home from '@/features/home/ui/Home'
import LoginPage from '@/features/Login/LoginPage'
import RalSettings from '@/features/RalTable/ui/RalSettings/RalSettings'
import { OnlyAuth, OnlyUnAuth } from '@/app/ProtectedRoute'
import PersonalPage from '@/features/Login/PersonalPage'
import AccreditationAreaTable from '@/features/AccreditationArea/AccreditationAreaTable'
import ralConfig from '@/features/ralTable/config'
import { config as accAreaConfig } from '@/features/AccreditationArea/config'
import { AbstractFormProvider } from '@/shared/api/AbstractFormProvider'
import CertificatesTable from '@/features/Certificates/CertificatesTable'
import { config as certificatesConfig } from '@/features/Certificates/config'
import NewRalTable from '@/features/RalTable/ui/RalTable/NewRalTable'



function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div
            className={
                'max-h-svh h-svh flex flex-col overflow-hidden bg-background w-screen font-Inter transition-colors duration-200'
            }>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/directory" element={<TableLayout />}>

                    <Route path="ral/*" element={
                        <>
                            <AbstractFormProvider config={ralConfig} tableName="ral">
                                {/* <Raltable /> */}
                                <NewRalTable />
                            </AbstractFormProvider>

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
                        </>
                    } />

                    <Route path='accreditation_area' element={
                        <AbstractFormProvider
                            config={accAreaConfig}
                            tableName="accreditation_area"
                            rowClickFn={() => { }}>    
                            <AccreditationAreaTable />
                        </AbstractFormProvider>
                    } />

                    <Route path='certificates' element={
                        <AbstractFormProvider
                            config={certificatesConfig}
                            tableName='certificates' 
                            rowClickFn={() => { }}>
                            <CertificatesTable />
                        </AbstractFormProvider>
                    } />

                </Route>
                <Route path='/login' element={<OnlyUnAuth component={<LoginPage />} />} />
                <Route path='/personal' element={<OnlyAuth component={<PersonalPage />} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default MainLayout
