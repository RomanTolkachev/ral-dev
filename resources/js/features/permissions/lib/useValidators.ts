import { useMemo } from 'react';
import { IRole, IUser } from "@/shared/types/user";

const validateUnique = (values: string[], value: string, info: string = "Значение занято"): true | string => {
    if (!value) return true;

    const normalizedValue = value.toLowerCase().trim();
    const isDuplicate = values.includes(normalizedValue);

    return !isDuplicate || info;
}

export const useUserValidation = (users: IUser[]) => {
    const validators = useMemo(() => {
        const names = users.map(user => user.name.toLowerCase());
        const emails = users.map(user => user.email.toLowerCase());

        return {
            validateUniqueName: (value: string) => validateUnique(names, value, "Имя занято"),
            validateUniqueEmail: (value: string) => validateUnique(emails, value, "Email занят"),
            validatePasswordStrength: (value: string): true | string => {
                if (!value) return true;
                return value.length >= 6 || "Минимум 6 символов";
            }
        };
    }, [users]);

    return validators;
};

export const useRoleValidation = (roles: IRole[]) => {
    const validators = useMemo(() => {
        const names = roles.map(role => role.name.toLowerCase());

        return {
            validateUniqueRoleName: (value: string) => validateUnique(names, value, "Роль уже есть")
        };
    }, [roles]);

    return validators;
};