import { createContext, FC, PropsWithChildren } from "react";
import { TPermissionsContext } from "../types";

const defaultContext: TPermissionsContext = {
    users: [],
    roles: [],
    permissions: [],
    loading: {
        usersLoading: true,
        rolesLoading: true,
        permissionsLoading: true
    }
}

type Props = {
    contextValue: TPermissionsContext
}

export const PermissionContext = createContext<TPermissionsContext>(defaultContext)

export const PermissionsProvider: FC<PropsWithChildren<Props>> = ({ children, contextValue }) => {
    
    return (
        <PermissionContext.Provider value={contextValue}>
            {children}
        </PermissionContext.Provider>
    )
}