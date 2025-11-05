import { CSSProperties } from "react"
/**
 * Возвращает инлайн стили для создания line-clamp
 * @param lines максимально строк
 * @param additionLtyles любые css свойства
 * @returns CSSProperties
 */
export const makeClamp = (lines: number, additionLtyles?: CSSProperties): CSSProperties => {
    return {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: lines,
        ...additionLtyles
    }
}