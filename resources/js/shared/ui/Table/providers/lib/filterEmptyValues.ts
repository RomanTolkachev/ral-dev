/**
 * Удаляет из объекта все ключи с пустыми значениями:
 * - пустые строки ('')
 * - пустые массивы ([])
 * - массивы из пустых строк (['', ''], [''], ['', ' '])
 * - null и undefined
 */
export const filterEmptyValues = <T extends Record<string, any>>(data: T): Partial<T> => {
    return Object.fromEntries(
        Object.entries(data).filter(([_, value]) => {

            if (
                value === null ||
                value === undefined ||
                value === ''
            ) return false;

            if (Array.isArray(value)) {
                if (value.length === 0) return false;

                const hasNonEmptyValue = value.some(item =>
                    item !== null &&
                    item !== undefined &&
                    item.toString().trim() !== ''
                );

                return hasNonEmptyValue;
            }

            if (typeof value === 'object' && !Array.isArray(value)) {
                return Object.keys(filterEmptyValues(value)).length > 0;
            }

            return true;
        })
    ) as Partial<T>;
};