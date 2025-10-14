import { useDeleteUser } from "@/features/permissions/lib"
import { IUser } from "@/shared/types/user"
import { XIcon } from "@/shared/ui/Icons"
import { FC } from "react"

type Props = {
    user: IUser
}

export const UserItem: FC<Props> = ({ user }) => {

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

    return (
        <div className="flex justify-between relative items-center">
            <span>{user.name}</span>
            <span onClick={handleDelete} className="absolute right-0 hover:text-error transition-all"><XIcon size={14} /></span>
        </div>
    )
}