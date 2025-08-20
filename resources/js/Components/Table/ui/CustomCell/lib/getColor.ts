export function getStatusColor(status: string): string {

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