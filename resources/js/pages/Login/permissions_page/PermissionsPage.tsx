import { FC } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { PermissionsProvider, usePermissions } from "@/features/permissions"
import { Column } from "./column"

export const PermissionsPage: FC = () => {

    const navigate = useNavigate()
    const permissionsContext = usePermissions()
    const { loading: { rolesLoading, permissionsLoading, usersLoading }, permissions, roles, users } = permissionsContext;

    return (
        <PermissionsProvider contextValue={permissionsContext}>
            <div className="grid gap-2 grid-cols-3 w-full h-full grod-rows-[1fr]">
                <Column header="пользователь" loading={usersLoading} addFn={() => navigate("add_user")}>
                    {users.map((item, key) => <li key={key}>{item.name}</li>)}
                </Column>
                <Column addPlaceholder="" header="роль" loading={rolesLoading}>
                    {roles.map((item, key) => <li key={key}>{item.name}</li>)}
                </Column>
                <Column addPlaceholder="" header="права" loading={permissionsLoading}>
                    {permissions.map((item, key) => <li key={key}>{item.name}</li>)}
                </Column>
                <Outlet /> {/* для моладочки */}
            </div>
        </PermissionsProvider>
    )
}