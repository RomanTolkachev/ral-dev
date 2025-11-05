export function getErrorMessage(
    failureCount: number | null = null,
    errorCode?: string,
): string {
    if (errorCode === 'ERR_CANCELED' || errorCode === 'ECONNABORTED') {
        return "Запрос отменен. Сервер не отвечает. Попробуйте позже.";
    }

    if (errorCode === 'ERR_NETWORK' || errorCode === "ERR_BAD_REQUEST") {
        return "Сетевая ошибка. Проверьте подключение к интернету.";
    }

    if (failureCount === null || failureCount === 0) {
        return "Идет загрузка данных...";
    }

    switch (failureCount) {
        case 1:
            return "Ожидайте ответа от сервера...";
        case 2:
            return "Повторная попытка подключения...";
        case 3:
            return "Последняя попытка. Если проблема сохранится, проверьте соединение.";
        default:
            return "Не удалось загрузить данные. Пожалуйста, обновите страницу.";
    }
}