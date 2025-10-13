import { ErrorWrapper, Input } from "@/Components/Inputs/Input"
import { MainButton } from "@/shared/ui/Buttons/MainButton"
import { PlusIcon } from "@/shared/ui/Icons/PlusIcon"
import { useClickOutside } from "@/shared/useClickOutside"
import { DevTool } from "@hookform/devtools"
import { useRef, FC, RefObject, useContext } from "react"
import { useCreateRole } from "../lib"
import { useForm } from "react-hook-form"
import { PermissionContext } from "../providers/PermissionsProvider"
import { useRoleValidation } from "../lib/useValidators"

type Props = {
    onClose: () => void
    placeholder?: string
    hasExternalHandler: boolean
    excludeRef?: RefObject<HTMLElement>
}

export const AddRoleForm: FC<Props> = ({
    onClose,
    placeholder,
    hasExternalHandler,
    excludeRef
}) => {
    const formRef = useRef<HTMLDivElement>(null)
    useClickOutside(formRef, onClose, !hasExternalHandler, excludeRef)
    const { mutate: createRole, isPending, isError, error } = useCreateRole();
    const permissionsContext = useContext(PermissionContext);

    const {
        control,
        setValue,
        register,
        watch,
        trigger,
        getValues,
        reset,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<{ role_name: string }>({
        mode: "onChange",
        defaultValues: {
            role_name: ""
        }
    })


    const {
        validateUniqueRoleName
    } = useRoleValidation(permissionsContext.roles);

    const onSubmit = (data: { role_name: string }) => {
        createRole(data, {
            onSuccess: () => {
                console.log('Пользователь успешно создан:', data);
                reset();
                onClose();
            },
            onError: (error) => {
                console.error('Ошибка при создании пользователя:', error);
            }
        });
    };

    const roleNameValue = watch("role_name");

    if (hasExternalHandler) {
        return null
    }

    return (
        <div ref={formRef} className="min-h-0 overflow-hidden w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 pb-2 w-full">
                <ErrorWrapper isAbsolute={false} fieldName="role_name" errors={errors}>
                    <Input
                        {...register("role_name", { required: true, validate: validateUniqueRoleName })}
                        value={roleNameValue ?? ""}
                        className="shrink grow"
                        error={errors.role_name as boolean | undefined}
                        icon={<PlusIcon className="text-gray-500" />}
                        placeholder={placeholder} />
                </ErrorWrapper>
                <MainButton
                    isDisabled={!isValid || isPending}
                    color="violet">
                    сохранить
                </MainButton>
            </form>
            <DevTool control={control} />
        </div>
    )
}