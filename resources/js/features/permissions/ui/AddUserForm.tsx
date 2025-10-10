import { FC, useContext, useState } from "react";
import { PermissionContext } from "../providers/PermissionsProvider";
import { Preloader } from "@/Components/utils/Preloader";
import { ErrorWrapper, Input } from "@/Components/Inputs/Input";
import { PasswordInput } from "@/Components/Inputs/PasswordInput";
import { MainButton } from "@/shared/ui/Buttons/MainButton";
import { Hint } from "./Hint";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useCreateUser, useUserValidation } from "../lib";

type Inputs = {
    name: string
    email: string
    new_user_password: string
}

export const AddUserForm: FC = () => {
    const permissionsContext = useContext(PermissionContext);
    const [russianHint, setRussianHint] = useState("");

    const {
        validateUniqueName,
        validateUniqueEmail,
        validatePasswordStrength
    } = useUserValidation(permissionsContext.users);

    const {
        control,
        setValue,
        register,
        watch,
        trigger,
        reset,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<Inputs>({ mode: "onChange" })

    const form = watch()

    const handleGeneratePassword = async () => {
        const { convertToEnglishLayout, generatePassword } = await import("@/shared/generatePassword");
        const newRussianPassword = generatePassword();
        const newEnglishPassword = convertToEnglishLayout(newRussianPassword);

        setValue("new_user_password", newEnglishPassword, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
        setRussianHint(newRussianPassword);
    };

    const handleManualPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (russianHint && e.target.value !== form.new_user_password) {
            setRussianHint("");
            trigger("new_user_password")
        }
    };

    const { mutate: createUser, isPending, isError, error } = useCreateUser();

    const onSubmit = (data: Inputs) => {
        createUser(data, {
            onSuccess: () => {
                console.log('Пользователь успешно создан:', data);
                reset();
                setRussianHint("");
            },
            onError: (error) => {
                console.error('Ошибка при создании пользователя:', error);
            }
        });
    };

    if (Object.values(permissionsContext.loading).some(item => item === true)) {
        return <Preloader widthStyles="size-8" />
    }

    return (
        <div className="text-table-base flex-col h-full flex items-center justify-center">
            <div className="relative flex flex-col gap-5">
                <h3 className="text-xl mx-auto">Добавление пользователя</h3>
                <form className="w-96" onSubmit={handleSubmit(onSubmit)}>
                    <ErrorWrapper fieldName="name" errors={errors}>
                        <Input
                            value={form.name}
                            autoComplete="name"
                            error={errors.name as boolean | undefined}
                            placeholder="имя"
                            {...register("name", { required: true, validate: validateUniqueName })}
                        />
                    </ErrorWrapper>
                    <ErrorWrapper fieldName="email" errors={errors}>
                        <Input
                            value={form.email}
                            autoComplete="email"
                            error={errors.email as boolean | undefined}
                            placeholder="email"
                            {...register("email", { required: true, validate: validateUniqueEmail })}
                        />
                    </ErrorWrapper>
                    <ErrorWrapper errors={errors} fieldName="new_user_password">
                        <PasswordInput
                            {...register("new_user_password", {
                                required: true,
                                onChange: handleManualPasswordChange,
                                validate: validatePasswordStrength
                            })}
                            error={errors.new_user_password as boolean | undefined}
                            value={watch("new_user_password") || ""}
                            placeholder="пароль"
                        />
                    </ErrorWrapper>
                    <div className="flex">
                        <MainButton type="button" className="mx-2" onClick={handleGeneratePassword} color={"violet"}>
                            <span>Cгенерировать пароль</span>
                        </MainButton>
                        <MainButton
                            className="mx-2"
                            isDisabled={!isValid || isPending}
                            color={"violet"}>
                            {isPending ? "Создание..." : "Сохранить"}
                        </MainButton>
                    </div>
                </form>
                {russianHint && <Hint value={russianHint} />}
            </div>
            <DevTool control={control} />
        </div>
    )
}