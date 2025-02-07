    /**
     * открытые picker календаря при клике на кастомную иконку
     * @param e событие клика
     */
    function openCalendarPicker(e: React.MouseEvent<SVGSVGElement>): void {
        const parent: HTMLElement | null = e.currentTarget.parentElement;
        if (parent) {
            let input = parent.querySelector('input');
            input?.showPicker();
        }
    }

    export default openCalendarPicker;