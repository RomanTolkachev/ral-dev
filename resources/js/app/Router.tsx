import { FC, lazy, Suspense } from "react";
import { NotFound } from "@/Components/utils/404";
import Home from "@/features/home/ui/Home";
import LoginPage from "@/features/Login/LoginPage";
import PersonalPage from "@/features/Login/PersonalPage";
import { TableLayout } from "@/Layouts/TableLayout";
import { Routes, Route, useNavigate } from "react-router-dom";
import { OnlyUnAuth, OnlyAuth } from "./ProtectedRoute";
import { config as ralConfig } from '@/features/RalTable/config'
import { config as accAreaConfig } from '@/features/AccreditationArea/config'
import { config as certificatesConfig } from '@/features/Certificates/config'
import { Preloader } from "@/Components/utils/Preloader";
import { TablePage } from "@/pages/TablePage";

const Settings = lazy(() => import("@/shared/ui/Table/ui/settings/ui/Settings").then(module => ({ default: module.Settings })))
const RalModal = lazy(() => import("@/features/ralModal/ui/RalModal").then(module => ({ default: module.RalModal })))
const Modal = lazy(() => import("@/Components/modal/Modal"));

export const Router: FC = () => {
    const navigate = useNavigate();
    return (
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/directory" element={<TableLayout />}>
                    <Route path="ral" element={<TablePage config={ralConfig} />}>
                        <Route path=':ralId' element={<Modal closeModal={() => navigate(-1)} children={<Suspense fallback={<Preloader widthStyles='size-10' />}><RalModal /></Suspense>} />} />
                        <Route path='settings' element={<Modal closeModal={() => navigate(-1)} children={<Suspense fallback={<Preloader widthStyles='size-10' />}><Settings /></Suspense>} />} />
                    </Route>

                    <Route path='accreditation_area' element={<TablePage config={accAreaConfig} />}>
                        <Route path='settings' element={<Modal closeModal={() => navigate(-1)} children={<Suspense fallback={<Preloader widthStyles='size-10' />}><Settings /></Suspense>} />} />
                    </Route>

                    <Route path='certificates' element={<TablePage config={certificatesConfig} />}>
                        <Route path='settings' element={<Modal closeModal={() => navigate(-1)} children={<Suspense fallback={<Preloader widthStyles='size-10' />}><Settings /></Suspense>} />} />
                    </Route>
                </Route>

                <Route path='/login' element={<OnlyUnAuth component={<LoginPage />} />} />
                <Route path='/personal' element={<OnlyAuth component={<PersonalPage />} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
    )
}