import { ReactNode, CSSProperties } from 'react';
import highlight from '../../../lib/highlightText';
import { makeClamp } from '.';

interface SplitStringOptions {
    delimiter?: string;
    ulClassName?: string;
    liClassName?: string;
    showBullets?: boolean;
    trimItems?: boolean;
    filterEmpty?: boolean;
    highlightPattern?: string | string[];
    maxLines?: number;
    maxLiItems?: number;
    clampStyles?: CSSProperties;
    showMoreText?: 'howMany' | string;
    showDelimiter?: boolean; // Новый опциональный параметр
}

const getElementWord = (count: number): string => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return 'элементов';
    }

    switch (lastDigit) {
        case 1:
            return 'элемент';
        case 2:
        case 3:
        case 4:
            return 'элемента';
        default:
            return 'элементов';
    }
};

export const makeList = (
    text: string | ReactNode,
    options: SplitStringOptions = {}
): ReactNode => {
    const {
        delimiter = ';',
        ulClassName = 'space-y-2 h-max',
        liClassName = 'text-start',
        showBullets = false,
        trimItems = true,
        filterEmpty = true,
        highlightPattern,
        maxLines,
        maxLiItems: maxItems,
        clampStyles = {},
        showMoreText,
        showDelimiter = true // По умолчанию показываем разделитель
    } = options;

    if (!text) {
        return null;
    }

    if (typeof text !== 'string') {
        const liStyle = maxLines ? makeClamp(maxLines, clampStyles) : undefined;

        return (
            <ul className={showBullets ? `list-disc list-inside ${ulClassName}` : `list-none ${ulClassName}`}>
                <li className={liClassName} style={liStyle}>
                    {text}
                </li>
            </ul>
        );
    }

    let parts = text.split(delimiter);

    if (trimItems) {
        parts = parts.map(part => part.trim());
    } {
        parts = parts.map(part => part.replace(/^\s+/, '')); // удаляю пробелы в начале строки, чтобы список был ровным
    }

    if (filterEmpty) {
        parts = parts.filter(part => part.length > 0);
    }

    if (parts.length === 0) {
        return null;
    }

    // Ограничиваем количество элементов если указано maxItems
    const displayedItems = maxItems ? parts.slice(0, maxItems) : parts;
    const hiddenItemsCount = maxItems ? parts.length - maxItems : 0;

    const listClass = showBullets
        ? `list-disc list-inside ${ulClassName}`
        : `list-none ${ulClassName}`;

    // Стили для ограничения строк в каждом элементе
    const liStyle = maxLines ? makeClamp(maxLines, clampStyles) : undefined;

    return (
        <ul className={listClass}>
            {displayedItems.map((part, index) => {
                const isLastItem = index === displayedItems.length - 1;
                const shouldShowDelimiter = showDelimiter && !isLastItem;

                return (
                    <li
                        key={index}
                        className={liClassName}
                        style={liStyle}
                        title={maxLines ? part : undefined}
                    >
                        {highlightPattern ? highlight(part, highlightPattern) : part}
                        {shouldShowDelimiter && delimiter}
                    </li>
                );
            })}

            {/* покажу сообщение о скрытых элементах если явно указан проп showMoreText */}
            {hiddenItemsCount > 0 && showMoreText && (
                <li className={`${liClassName} line-clamp-1`}>
                    {showMoreText === 'howMany'
                        ? `... +${hiddenItemsCount} ${getElementWord(hiddenItemsCount)}`
                        : showMoreText
                    }
                </li>
            )}
        </ul>
    );
};