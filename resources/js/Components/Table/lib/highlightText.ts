import { createElement, ReactNode } from 'react'
/**
 * Сравнивает значение в ячейке со значением в параметре fullText в query.
 * Если есть совпадение, то вхождение оборачивается в mark
 * @param text 
 * @param pattern 
 * @returns ReactNode
 */
function highlight(text: string | null, pattern: string): ReactNode {
    if (!text || !pattern) return text
    if (pattern[0] === '') return text
    const reg = new RegExp(`(${pattern})`, 'gi')
    let parts = text.toString().split(reg) // тут splitValue оставляет разделитель в массиве
    const highLightedParts = parts.map((item: string, index: number) => {
        return reg.test(item) ? createElement('mark', { key: index }, item) : item
    })
    return highLightedParts
}

export default highlight
