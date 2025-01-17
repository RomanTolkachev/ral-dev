import { createElement, ReactNode } from "react";

function highlight(text: string | null, pattern: string): ReactNode {
    if (!text || !pattern) return text
    if (pattern[0] === "") return text;
    const reg = new RegExp(`(${pattern})`, 'gi'); 
    let parts = text.toString().split(reg); // тут split оставляет разделитель в массиве
    const highLightedParts = parts.map((item: string, index: number) => {
        return reg.test(item) ? createElement('mark', { key: index }, item) : item
    })
    return highLightedParts;
}

export default highlight