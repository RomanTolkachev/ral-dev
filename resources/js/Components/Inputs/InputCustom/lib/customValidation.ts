import { isEmpty } from "lodash"

    /**
     * Если не валидно, то возващает строку и записывает ее в поле message объекта error компонента Controller
     * @param value Массив. Т.к в данном инпуте всегда массив, то проверяем только первое значение
     * @returns 
     */
    function customValidation(value: Array<string>) {
        return isEmpty(value) || value[0].length >= 4 ? true : "минимум 4 символа"
    }

    export default customValidation