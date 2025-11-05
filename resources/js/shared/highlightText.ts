import { createElement, ReactNode } from 'react'

/**
 * Подсвечивает совпадения текста с шаблонами (можно передать строку или массив строк).
 * Все вхождения оборачиваются в <mark>
 *
 * @param text Исходный текст
 * @param pattern Строка или массив строк для подсветки
 * @returns ReactNode
 */
function highlight(text: string | null, pattern: string | string[] | undefined): ReactNode {
    if (!text || !pattern) return text;

    const patterns = Array.isArray(pattern) ? pattern : [pattern];
    const filtered = patterns.filter(p => p.trim() !== '');

    if (filtered.length === 0) return text;

    const escaped = filtered.map(p =>
        p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    );

    const reg = new RegExp(`(${escaped.join('|')})`, 'gi');
    const parts = text.toString().split(reg);

    return parts.map((part, index) =>
        index % 2 === 1
            ? createElement('mark', { key: index }, part)
            : part
    );
}

export default highlight;