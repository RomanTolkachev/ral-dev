import { TNPStatus, TStatus } from "../model";


export function getStatusColor(status: TStatus): string {

    const normalizedStatus = status.toLowerCase()
        .replace(/ё/g, 'е'); // Приводим "ё" к "е" для унификации

    if (!status) {
        return "";
    }

    switch (normalizedStatus) {
        case 'действует':
            return 'var(--cell-active)'; // Зеленый

        case 'прекращен':
            return 'var(--cell-terminated)'; // Красный

        case 'продлен':
            return 'var(--cell-extended)'; // коралловый

        case 'приостановлен':
            return 'var(--cell-suspended)'; // Оранжевый

        case 'частично приостановлен':
            return 'var(--cell-part-suspended)'; // Синий

        case 'архивный':
            return 'var(--cell-archive)'; // Фиолетовый

        case 'недействителен':
            return 'var(--cell-void)'; // Желтый

        default:
            return 'inherit';
    }
}

export function getNPStatusColor(status: TNPStatus): string {
    console.log("getNPStatusColor received:", status, "type:", typeof status);

    if (!status) {
        console.log("Status is empty, returning empty string");
        return "";
    }

    const lowerStatus = status.toLowerCase().trim();
    console.log("Lowercase status:", lowerStatus);

    switch (lowerStatus) {
        case 'да':
            console.log("Returning green color");
            return 'var(--cell-active)';
        case 'нет':
            console.log("Returning red color");
            return 'var(--cell-terminated)';
        default:
            console.log("Returning transparent");
            return 'transparent';
    }
}