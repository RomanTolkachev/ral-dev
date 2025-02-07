    /**
     * Валидация поля даты и периода даты:
     * - если значение введено, то оно больше 1 января 1900 года.
     * - если оба значения введены, то дата начала меньше или равна дате окончания
     * @param value Массив с 2 строковыми элементами, 
     * @returns true, если валидация пройдена, либо строка с текстом ошибки, которая доступка в поле error компонента Controller
     */
    function dateRangeValidation(value: Array<string>):boolean | string {
        const START_DATE = new Date("1900-01-01")
        const dateFrom = value[0];
        const dateTo = value[1];

        function isInRange(dateString: string): boolean | string {
            const checkableDate = new Date(dateString)
            if (checkableDate >= START_DATE) {
                return true
            } else {
                return "дата должна быть меньше 01 января 1900 г."
            }
        }

        function isStartLess(dates: Array<string>): boolean | string {
            let startDate = new Date(dates[0]);
            let endDate = new Date(dates[1]);
            return startDate <= endDate ? true : "Начальная дата должна быть меньше конечной"
        }

        if (!value) return true;
        if (!dateFrom && !dateTo) return true;
        if (isInRange(dateFrom) && !dateTo) return isInRange(dateFrom);
        if (!dateFrom && isInRange(dateTo)) return isInRange(dateTo);
        if (isInRange(dateFrom) && isInRange(dateTo)) {
           return isStartLess([dateFrom, dateTo])   
        } else {
            return true
        } 
    }

    export default dateRangeValidation