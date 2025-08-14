export function getStatusColor(status: string): string {
    if (!status) {
        return "";
    }
    switch (status.toLowerCase()) {
        case 'действует':
            return 'var(--cell-active)'; // Зеленый
        case 'прекращен':
            return 'var(--cell-terminated)'; // Красный

        case 'приостановлен':
            return 'var(--cell-suspended)'; // Оранжевый

        case 'частично приостановлен':
            return 'var(--cell-part-suspended)'; // Синий

        case 'архивный':
            return 'var(--cell-archive)'; // Фиолетовый

        default:
            return 'transparent';
    }
}

export function getNPStatusColor(status: string): string {
    if (!status) {
        return "";
    }
    switch (status.toLowerCase()) {
        case 'да':
            return 'var(--cell-active)'; // Зеленый
        case 'нет':
            return 'var(--cell-terminated)'; // Красный
        default:
            return 'transparent'; // Прозрачный
    }
}