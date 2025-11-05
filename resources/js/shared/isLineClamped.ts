
/**
 * Проверяет, имеет ли элемент выходящие за границы чилдрены
 * @param element HTMLElement
 * @returns boolean
 */
export const isLineClamped = (element: HTMLElement): boolean => {
	if (!element) return false;

	const isHeightClamped = element.scrollHeight > element.clientHeight;

	const isWidthClamped = element.scrollWidth > element.clientWidth;

	const style = window.getComputedStyle(element);
	const hasLineClamp = style.webkitLineClamp !== 'none' && style.webkitLineClamp !== '';
	const hasTextOverflow = style.textOverflow === 'ellipsis';
	const hasOverflowHidden = style.overflow === 'hidden';
	const hasWhiteSpaceNowrap = style.whiteSpace === 'nowrap';

	return hasLineClamp ||
		isHeightClamped ||
		isWidthClamped ||
		(hasTextOverflow && hasOverflowHidden && (hasWhiteSpaceNowrap || isHeightClamped));
};