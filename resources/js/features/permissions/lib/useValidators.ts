import { useMemo } from 'react';
import { IUser } from "@/shared/types/user";

export const useUserValidation = (users: IUser[]) => {
    const validators = useMemo(() => {
        const names = users.map(user => user.name.toLowerCase());
        const emails = users.map(user => user.email.toLowerCase());

        const validateUniqueName = (value: string): true | string => {
            if (!value) return true;

            const normalizedValue = value.toLowerCase().trim();
            const isDuplicate = names.includes(normalizedValue);

            return !isDuplicate || "Имя уже занято";
        };

        const validateUniqueEmail = (value: string): true | string => {
            if (!value) return true;

            const normalizedValue = value.toLowerCase().trim();
            const isDuplicate = emails.includes(normalizedValue);

            return !isDuplicate || "Email уже занят";
        };

        const validatePasswordStrength = (value: string): true | string => {
            if (!value) return true;

            if (value.length < 6) {
                return "Минимум 6 символов";
            }

            return true;
        };

        return {
            validateUniqueName,
            validateUniqueEmail,
            validatePasswordStrength
        };
    }, [users]);

    return validators;
};