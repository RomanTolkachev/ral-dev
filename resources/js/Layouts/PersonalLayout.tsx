import { AuthContext } from "@/app/providers/AuthProvider";
import { Preloader } from "@/Components/utils/Preloader";
import { FC, useContext, useMemo } from "react";
import { NavLink, Outlet } from "react-router-dom";

export const PersonalLayout: FC = () => {

    const loginContext = useContext(AuthContext);

    if (!loginContext) {
        return <Preloader widthStyles='size-8' />
    }

    const { userInfo } = loginContext;

    const isAdmin = useMemo<boolean>(() => {
        return userInfo?.role === import.meta.env.VITE_SUPER_ADMIN
    }, [userInfo?.role])

    return (
        <div className="flex grow shrink min-h-0 text-table-base">
            <div className='p-2 flex flex-col shrink-0 grow-0 basis-[300px]'>
                <NavLink className={({ isActive }) => `transition-colors ${isActive ? "text-link-active" : ""}`} to="bio">информация</NavLink>
                {isAdmin && <NavLink className={({ isActive }) => `transition-colors ${isActive ? "text-link-active" : ""}`} to="permissions">работа с правами</NavLink>}
            </div>
            <div className="p-2 overflow-hidden shrink grow flex flex-col min-h-0">
                <div className="flex-1 min-h-0">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}