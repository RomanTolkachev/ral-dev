import { FC, useEffect, useMemo, useRef, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { PermissionsProvider, usePermissions } from "@/features/permissions"
import { Column } from "./column"
import { UserItem } from "./column/items/UserItem"
import { RoleItem } from "./column/items/RoleItem"
import { Overlay } from "./overlay/Overlay"
import { useQuery } from "@tanstack/react-query"
import { axiosApi } from "@/shared/api/api"
import { useClickOutsideExtended } from "@/shared/useClickOutsideExtended"
import { useUpdateUserRoles } from "@/features/permissions/lib"

type TEditingState = {
    isEditing: boolean
    editable: "role" | "permission" | "user" | null
    editable_id: null | string | number
}

const initialState: TEditingState = {
    isEditing: false,
    editable: null,
    editable_id: null,
}

export const PermissionsPage: FC = () => {

    const navigate = useNavigate()
    const permissionsContext = usePermissions()
    const { loading: { rolesLoading, permissionsLoading, usersLoading }, permissions, roles, users } = permissionsContext;
    const [editing, setEditing] = useState<TEditingState>(initialState)
    const [selectedRoles, setSelectedRoles] = useState<string[]>([])
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])

    const usersRef = useRef<HTMLDivElement>(null);
    const rolesRef = useRef<HTMLDivElement>(null);
    const permissionsRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const excludeRefs = useMemo(() => {
        switch (editing.editable) {
            case "user": return [rolesRef, usersRef]
            case "role": return [rolesRef, usersRef, permissionsRef]
            case "permission": return [rolesRef, permissionsRef]
            default: return []
        }
    }, [editing.editable])

    useClickOutsideExtended(
        containerRef, {
        callback: () => setEditing(initialState),
        excludeRefs: excludeRefs,
        includeRefs: [permissionsRef]
    });

    const { data: userHasRoles, isLoading: userHasRolesLoading } = useQuery<string[]>({
        queryKey: ["user_has_roles", editing.editable_id],
        queryFn: () => axiosApi.get(`/user_has_roles/${editing.editable_id}`).then(res => res.data),
        refetchOnMount: false,
        enabled: editing.isEditing && editing.editable === "user" && !!editing.editable_id,
        staleTime: 10000
    })

    const { data: roleHasUsers, isLoading: roleHasUsersLoading } = useQuery<string[]>({
        queryKey: ["role_has_users", editing.editable_id],
        queryFn: () => axiosApi.get(`/role_has_users/${editing.editable_id}`).then(res => res.data),
        refetchOnMount: false,
        enabled: editing.isEditing && editing.editable === "role" && !!editing.editable_id,
        staleTime: 10000
    })

    const fetching: boolean = userHasRolesLoading;
    const userEditing = editing.isEditing && !fetching && editing.editable === "user"
    const roleEditing = editing.isEditing && !fetching && editing.editable === "role"

    const setRoleEditing = (id: string) => {
        setEditing({
            isEditing: true,
            editable: "role",
            editable_id: id,
        })
    }

    const setUserEditing = (id: string) => {
        setEditing({
            isEditing: true,
            editable: "user",
            editable_id: id,
        })
    }

    useEffect(() => {
        if (userHasRoles && userHasRoles.length) {
            return setSelectedRoles(userHasRoles)
        }
        setSelectedRoles([])
    }, [userHasRoles])

    useEffect(() => {
        if (roleHasUsers && roleHasUsers.length) {
            return setSelectedUsers(roleHasUsers)
        }
        setSelectedUsers([])
    }, [roleHasUsers])

    const handleSelectedRolesChange = (value: string) => {
        setSelectedRoles(prev => {
            if (prev.includes(value)) {
                return prev.filter(name => name !== value);
            } else {
                return [...prev, value];
            }
        });
    }

    const handleSelectedUsersChange = (value: string) => {
        setSelectedUsers(prev => {
            if (prev.includes(value)) {
                return prev.filter(id => id !== value);
            } else {
                return [...prev, value];
            }
        });
    }

    const { mutate: updateModelHasRoles } = useUpdateUserRoles();

    const handleUpdateModelHasRoles = () => {
        if (!userEditing || !editing.editable_id) return console.log("хрен тебе");
        return updateModelHasRoles({ userId: editing.editable_id, newRoles: selectedRoles }, {
            onSuccess: () => {
                console.log("роли обновлены")
            },
            onError: () => {
                console.log("что то сломано")
            }
        })
    }

    return (
        <PermissionsProvider contextValue={permissionsContext}>
            <div ref={containerRef} className={`grid gap-2 grid-cols-3 w-full h-full grod-rows-[1fr] relative`}>
                <Column ref={usersRef} isEditing={roleEditing} header="пользователь" loading={usersLoading} addFn={() => navigate("add_user")}>
                    {users.map((user, key) => {
                        const isUserEditing = editing.isEditing && !fetching && editing.editable === "role"
                        const blured = editing.isEditing && editing.editable === "role" && editing.editable_id !== user.id
                        const isChecked = selectedUsers.includes(user.id)
                        return (
                            <li key={key}>
                                <UserItem onInputChange={handleSelectedUsersChange} isEditable={isUserEditing} checked={isChecked} editing={editing.editable === "user"} blured={blured} editHandler={() => setUserEditing(user.id)} user={user} />
                            </li>
                        )
                    })}
                    <button className="bg-slate-600 px-4" onClick={handleUpdateModelHasRoles}>сохранить роли</button>
                </Column>
                <Column ref={rolesRef} isEditing={userEditing} addPlaceholder="" header="роль" loading={rolesLoading}>
                    {roles.map((role, key) => {
                        const isRoleEditing = editing.isEditing && !fetching && editing.editable === "user"
                        const blured = editing.isEditing && roleEditing && editing.editable_id !== role.id
                        const isChecked = selectedRoles.includes(role.name)
                        return (
                            <li key={key}>
                                <RoleItem onInputChange={handleSelectedRolesChange} checked={isChecked} blured={blured} editable={isRoleEditing} editHandler={() => setRoleEditing(role.id)} role={role} />
                            </li>
                        )
                    })}
                </Column>
                <Column ref={permissionsRef} isEditing={roleEditing} blocked={userEditing} addPlaceholder="" header="права" loading={permissionsLoading}>
                    {permissions.map((item, key) => <li key={key}>{item.name}</li>)}
                </Column>
                {fetching && <Overlay className="absolute inset-0" />}
                <Outlet /> {/* для модалочки */}
            </div>
        </PermissionsProvider>
    )
}