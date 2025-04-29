import {Navigate, useLocation} from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "./providers/AuthProvider";
import { Preloader } from "@/Components/utils/Preloader";

interface IProtectedRoute {
    onlyUnAuth?: boolean
    component: React.ReactElement
}

const ProtectedRoute: React.FunctionComponent<IProtectedRoute> = ({onlyUnAuth = false, component}) => {
    
    const location: { state?: {from?: { pathname: string }}} = useLocation();
    const authContext = useContext(AuthContext);
    const userId = authContext?.userInfo?.id
    const loading = authContext?.isFetching && authContext?.isLoading

    if (!userId && loading) {
        return <Preloader  widthStyles="size-8"/>
    }

    if (onlyUnAuth && userId) {
        const { from } = location.state || { from: {pathname: "/"} }
        return <Navigate to={from!} />
    }

    if (!onlyUnAuth && !userId) {
        return <Navigate to="/login" state={{from: location}}/>
    }

    return component;
}

export const OnlyAuth: React.FunctionComponent<IProtectedRoute> = ProtectedRoute;
export const OnlyUnAuth = ({component}: { component: React.ReactElement }) => {
    return <ProtectedRoute onlyUnAuth={true} component={component}/>
}