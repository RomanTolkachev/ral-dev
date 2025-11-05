import { IRalItem } from '@/shared/types/ral';

export const getHeaders = (ral: IRalItem[], excludable?: string[]): string[] => {
    let headers = ral.length !== 0 ? Object.keys(ral[0]) : []; // вытаскиваем ключи в массив - это будут заголовки
    if (excludable) {
        headers = headers.filter(item => !excludable.includes(item))
    }
    return headers; 
};
