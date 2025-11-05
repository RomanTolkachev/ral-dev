import { useDeleteRole } from "@/features/permissions/lib"
import { IRole } from "@/shared/types/user"
import { WrenchIcon, XIcon } from "@/shared/ui/Icons"
import { FC } from "react"

type Props = {
    role: IRole
    editHandler?: () => unknown
    editable?: boolean
    blured?: boolean
    checked: boolean
    onInputChange: (value: string) => void
}

export const RoleItem: FC<Props> = ({ role, editHandler, editable = true, blured, checked, onInputChange }) => {

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

    if (editable) {
        return (
            <div className="flex justify-between relative items-center pr-6 transition-all">
                <span>{role.name}</span>
                <div className="absolute right-0 transition-all flex items-center justify-center gap-1 pr-1">
                    <input
                        checked={checked}
                        className={
                            'ml-auto cursor-pointer checked:text-checkbox-custom' +
                            ' outline-none border focus:ring-checkbox-ring focus:ring-offset-0 rounded active:border-transparent ' +
                            ' focus:outline-none ' +
                            'bg-background-block'
                        }
                        type="checkbox"
                    onChange={() => {
                        onInputChange(role.name)
                    }}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className={`${blured ? "blur-sm " : ""} flex justify-between relative items-center pr-6 transition-all`}>
            {blured && <div className="absolute inset-0 z-50" />}
            <span>{role.name}</span>
            <div className="absolute right-0 flex items-center justify-center gap-1">
                <span onClick={editHandler} className="hover:text-error transition-colors"><WrenchIcon size={16} /></span>
                <span onClick={handleDelete} className="hover:text-error transition-colors"><XIcon size={16} /></span>
            </div>
        </div>
    )
}