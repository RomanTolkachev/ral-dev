    // проверка, что дата начала меньше даты окончания
    function isStartLessEnd(value: Array<string>):boolean {
        if (value) {
            let startDate = new Date(value[0]);
            let endDate = new Date(value[1]);
            return startDate <= endDate
        } else {
            return false;
        }
    }

    export default isStartLessEnd