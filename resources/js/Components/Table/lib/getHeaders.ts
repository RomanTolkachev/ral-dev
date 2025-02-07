import { IRalItem } from '@/shared/types/ral';

export const getHeaders = (ral: IRalItem[]): string[] => {
    return ral.length !== 0 ? Object.keys(ral[0]) : []; // вытаскиваем ключи в массив - это будут заголовки
};
