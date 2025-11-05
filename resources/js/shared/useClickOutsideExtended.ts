import { RefObject, useEffect } from 'react';

type CommonKeyboardKey =
    | 'Escape'
    | 'Enter'
    | 'Space'
    | 'Tab'
    | 'ArrowUp'
    | 'ArrowDown'
    | 'ArrowLeft'
    | 'ArrowRight'
    | 'Home'
    | 'End'
    | 'PageUp'
    | 'PageDown'
    | 'Delete'
    | 'Backspace'
    | 'Insert'
    | 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10' | 'F11' | 'F12';

/**
 * Буквенно-цифровые клавиши
 */
type AlphanumericKey =
    | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M'
    | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
    | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

/**
 * Модификаторы
 */
type ModifierKey = 'Shift' | 'Control' | 'Alt' | 'Meta' | 'CapsLock' | 'NumLock' | 'ScrollLock';

/**
 * Объединенный тип всех допустимых клавиш
 */
type KeyboardKey = CommonKeyboardKey | AlphanumericKey | ModifierKey;

/**
 * Опции для хука useClickOutsideExtended
 */
interface UseClickOutsideExtendedOptions {
    /** Функция, вызываемая при срабатывании условия */
    callback: () => void;
    /** Рефы элементов, клик по которым ВСЕГДА вызывает callback (даже если они внутри mainRef) */
    includeRefs?: RefObject<HTMLElement> | RefObject<HTMLElement>[];
    /** Рефы элементов, клик по которым НИКОГДА не вызывает callback */
    excludeRefs?: RefObject<HTMLElement> | RefObject<HTMLElement>[];
    /** Клавиши, нажатие которых вызывает callback, escape по умолчанию */
    keys?: KeyboardKey[];
    /** Флаг активации/деактивации хука */
    enabled?: boolean;
}

/**
 * Хук для обработки кликов вне целевого элемента и нажатий клавиш с расширенной логикой
 * 
 * @param mainRef - Референс основного элемента, клик вне которого отслеживается
 * @param options - Объект с настройками поведения хука
 * 
 * @example
 * // Сработает при клике вне containerRef, ИЛИ при клике на rolesRef/permissionsRef, 
 * // ИЛИ при нажатии Escape, но НЕ сработает при клике на usersRef
 * useClickOutsideExtended(containerRef, {
 *   callback: () => console.log("Сработало!"),
 *   includeRefs: [rolesRef, permissionsRef],
 *   excludeRefs: usersRef,
 *   keys: ['Escape'],
 *   enabled: true
 * });
 */
export const useClickOutsideExtended = (
    mainRef: RefObject<HTMLElement>,
    options: UseClickOutsideExtendedOptions
): void => {
    const {
        callback,
        includeRefs,
        excludeRefs,
        keys = ["Escape"],
        enabled = true
    } = options;

    useEffect((): (() => void) | void => {
        if (!enabled) return;

        /**
         * Обработчик клика по документу
         * @param event - Событие мыши
         */
        const handleClick = (event: MouseEvent): void => {
            const target = event.target as Node;

            // Нормализация параметров в массивы для единообразной обработки
            const includeArray: RefObject<HTMLElement>[] = Array.isArray(includeRefs)
                ? includeRefs
                : includeRefs ? [includeRefs] : [];

            const excludeArray: RefObject<HTMLElement>[] = Array.isArray(excludeRefs)
                ? excludeRefs
                : excludeRefs ? [excludeRefs] : [];

            // 1. Проверяем исключения - если кликнули на excludeRef, ничего не делаем
            const isExcluded = excludeArray.some(ref =>
                ref?.current && ref.current.contains(target)
            );
            if (isExcluded) return;

            // 2. Проверяем включения - если кликнули на includeRef, ВСЕГДА вызываем callback
            const isIncluded = includeArray.some(ref =>
                ref?.current && ref.current.contains(target)
            );
            if (isIncluded) {
                callback();
                return;
            }

            // 3. Стандартная логика - если кликнули ВНЕ mainRef, вызываем callback
            if (mainRef.current && !mainRef.current.contains(target)) {
                callback();
            }
        };

        /**
         * Обработчик нажатия клавиш
         * @param event - Событие клавиатуры
         */
        const handleKeyDown = (event: KeyboardEvent): void => {
            // Приводим event.key к типу KeyboardKey для проверки
            if (keys.includes(event.key as KeyboardKey)) {
                callback();
            }
        };

        // Добавляем обработчики событий
        document.addEventListener('mousedown', handleClick);

        if (keys.length > 0) {
            document.addEventListener('keydown', handleKeyDown);
        }

        // Функция очистки
        return (): void => {
            document.removeEventListener('mousedown', handleClick);
            if (keys.length > 0) {
                document.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, [mainRef, callback, enabled, includeRefs, excludeRefs, keys]);
};