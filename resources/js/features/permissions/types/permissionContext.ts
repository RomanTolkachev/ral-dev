import { IPermission, IRole, IUser } from "@/shared/types/user"

export type TPermissionsContext = {
    users: IUser[]
    roles: IRole[]
    permissions: IPermission[]
    loading: {
        usersLoading: boolean
        rolesLoading: boolean
        permissionsLoading: boolean
    }
}