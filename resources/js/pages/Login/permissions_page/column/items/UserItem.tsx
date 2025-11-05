import { useDeleteUser } from "@/features/permissions/lib"
import { IUser } from "@/shared/types/user"
import { WrenchIcon, XIcon } from "@/shared/ui/Icons"
import { FC } from "react"

type Props = {
    user: IUser
    editHandler?: () => unknown
    className?: string
    blured?: boolean
    editing?: boolean
    isEditable?: boolean
    checked: boolean
    onInputChange: (userId: string) => void
}

export const UserItem: FC<Props> = ({ user, editHandler, className, blured = false, editing, isEditable, checked = false, onInputChange }) => {

    const { mutate: deleteUser } = useDeleteUser();

    const handleDelete = () => {
        deleteUser({ id: user.id }, {
            onSuccess: () => {
                console.log('Пользователь успешно удален:', user.id);
            },
            onError: (error) => {
                console.error('Ошибка при удалении пользователя:', error);
            }
        });
    };

    if (isEditable) {
        return (
            <div className="flex justify-between relative items-center pr-6 transition-all">
                <span>{user.name}</span>
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
                            onInputChange(user.id)
                        }}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className={`${className ?? ""} ${blured ? "blur-sm" : ""} flex justify-between relative items-center pr-6`}>
            {blured && <div className="absolute inset-0 z-50" />}
            <span className={blured ? "select-none" : ""}>{user.name}</span>
            <div className="absolute right-0 transition-colors flex items-center justify-center gap-1 z-10">
                <button disabled={editing} onClick={editHandler} className="hover:text-error disabled:hover:text-inherit cursor-pointer disabled:hover:cursor-not-allowed transition-colors"><WrenchIcon size={16} /></button>
                <button disabled={editing} onClick={handleDelete} className=" hover:text-error disabled:hover:text-inherit cursor-pointer disabled:hover:cursor-not-allowed transition-all z-10"><XIcon size={16} /></button>
            </div>
        </div>
    )
}