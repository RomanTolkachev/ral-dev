import { axiosApi } from "@/shared/api/api"
import { IUser, IRole, IPermission } from "@/shared/types/user"
import { useQuery } from "@tanstack/react-query"
import { TPermissionsContext } from "../types"

export const usePermissions = (): TPermissionsContext => {
    const { data: users = [], isLoading: usersLoading } = useQuery<Array<IUser>>({
        queryKey: ["users"],
        queryFn: () => axiosApi.get("/users").then(res => res.data),
        refetchOnMount: false
    })

    const { data: roles = [], isLoading: rolesLoading } = useQuery<Array<IRole>>({
        queryKey: ["roles"],
        queryFn: () => axiosApi.get("/roles").then(res => res.data),
        refetchOnMount: false
    })

    const { data: permissions = [], isLoading: permissionsLoading } = useQuery<Array<IPermission>>({
        queryKey: ["permissions"],
        queryFn: () => axiosApi.get("/permissions").then(res => res.data),
        refetchOnMount: false
    })

    return {
        users,
        roles,
        permissions,
        loading: { usersLoading, rolesLoading, permissionsLoading }
    }
}