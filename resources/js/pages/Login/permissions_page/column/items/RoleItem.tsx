import { useDeleteRole, useDeleteUser } from "@/features/permissions/lib"
import { IRole } from "@/shared/types/user"
import { WrenchIcon, XIcon } from "@/shared/ui/Icons"
import { FC } from "react"

type Props = {
    role: IRole
}

export const RoleItem: FC<Props> = ({ role }) => {

    const { mutate: deleteRole } = useDeleteRole();

    const handleDelete = () => {
        deleteRole(role.id, {
            onSuccess: () => {
                console.log('Роль успешно удалена:', role.name);
            },
            onError: (error) => {
                console.error('Ошибка при удалении роли:', error);
            }
        });
    };

    return (
        <div className="flex justify-between relative items-center pr-6">
            <span>{role.name}</span>
            <div className="absolute right-0  transition-all flex items-center justify-center gap-1">
                <span onClick={() => {}} className="hover:text-error"><WrenchIcon size={16} /></span>
                <span onClick={handleDelete} className="hover:text-error"><XIcon size={16} /></span>
            </div>
        </div>
    )
}