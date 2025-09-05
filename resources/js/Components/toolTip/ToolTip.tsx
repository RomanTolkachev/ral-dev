import { isLineClamped as getIsLineClamped } from '@/shared/isLineClamped';
import { AnimatePresence, motion } from 'motion/react';
import { useState, useRef, useEffect, useLayoutEffect, FC, ReactElement, ReactNode, cloneElement } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
	content: ReactNode;
	children: ReactElement;
	className?: string;
	delay?: number;
	hideDelay?: number;
	maxWidth?: string;
	maxHeight?: string;
	distanceFromTrigger?: number;
	windowEdgeMargin?: number;
	alwaysShow?: boolean;
	padding?: number;
}

export const Tooltip: FC<TooltipProps> = ({
	content,
	children,
	className = '',
	delay = 800,
	hideDelay = 150,
	maxWidth = '800px',
	maxHeight = '400px',
	distanceFromTrigger = 0,
	windowEdgeMargin = 16,
	alwaysShow = false,
	padding = 12
}) => {
	const [isVisible, setIsVisible] = useState(false);
	const [isReadyToShow, setIsReadyToShow] = useState(false);
	const [isLineClamped, setIsLineClamped] = useState(false);
	const [shouldShowTooltip, setShouldShowTooltip] = useState(false);
	const [position, setPosition] = useState({
		top: '',
		bottom: '',
		left: '',
		right: '',
		maxWidth: maxWidth,
		maxHeight: maxHeight
	});

	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const triggerRef = useRef<HTMLDivElement>(null);
	const tooltipRef = useRef<HTMLDivElement>(null);
	const childrenRef = useRef<HTMLElement | null>(null);
	const originalRef = useRef<any>(null);
	const isScrollingTooltipRef = useRef(false);

	const portal = document.getElementById('portal')

	// Сохраняем оригинальный ref при монтировании
	useEffect(() => {
		if (children && 'ref' in children) originalRef.current = (children as any).ref;
	}, [children]);

	const showTooltip = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			setIsVisible(true);
			setShouldShowTooltip(true);
		}, delay);
	};

	const hideTooltip = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			setIsVisible(false);
			setIsReadyToShow(false);
			setShouldShowTooltip(false);
		}, hideDelay);
	};

	// Функция для проверки line-clamp на children
	const checkLineClamp = () => {
		if (childrenRef.current) {
			const clamped = getIsLineClamped(childrenRef.current);
			setIsLineClamped(clamped);
		}
	};

	const calculatePosition = () => {
		if (!triggerRef.current) return;

		const triggerRect = triggerRef.current.getBoundingClientRect();

		const newPosition = {
			top: '',
			bottom: '',
			left: '',
			right: '',
			maxWidth: maxWidth,
			maxHeight: maxHeight,
		};

		// Центр viewport
		const viewportCenterX = window.innerWidth / 2;
		const viewportCenterY = window.innerHeight / 2;

		// Центр триггера
		const triggerCenterX = triggerRect.left + triggerRect.width / 2;
		const triggerCenterY = triggerRect.top + triggerRect.height / 2;

		// Определяем сторону для позиционирования
		const horizontalSide = triggerCenterX < viewportCenterX ? 'right' : 'left';
		const verticalSide = triggerCenterY < viewportCenterY ? 'bottom' : 'top';

		// Вертикальное позиционирование (fixed)
		if (verticalSide === 'bottom') {
			// Показываем снизу от триггера + отступ
			newPosition.top = `${triggerRect.bottom + distanceFromTrigger}px`;
		} else {
			// Показываем сверху от триггера + отступ
			newPosition.bottom = `${window.innerHeight - triggerRect.top + distanceFromTrigger}px`;
		}

		// Горизонтальное позиционирование (fixed)
		if (horizontalSide === 'right') {
			// Показываем справа от триггера + отступ
			newPosition.left = `${triggerRect.right + distanceFromTrigger}px`;
		} else {
			// Показываем слева от триггера + отступ
			newPosition.right = `${window.innerWidth - triggerRect.left + distanceFromTrigger}px`;
		}

		// Расчет максимальной ширины
		let calculatedMaxWidth = parseInt(maxWidth);
		if (horizontalSide === 'right') {
			const availableSpace = window.innerWidth - triggerRect.right - windowEdgeMargin - distanceFromTrigger;
			calculatedMaxWidth = Math.min(calculatedMaxWidth, availableSpace);
		} else {
			const availableSpace = triggerRect.left - windowEdgeMargin - distanceFromTrigger;
			calculatedMaxWidth = Math.min(calculatedMaxWidth, availableSpace);
		}
		calculatedMaxWidth = Math.max(calculatedMaxWidth, 100);
		newPosition.maxWidth = `${calculatedMaxWidth}px`;

		// Расчет максимальной высоты
		let calculatedMaxHeight = parseInt(maxHeight);
		if (verticalSide === 'bottom') {
			const availableSpace = window.innerHeight - triggerRect.bottom - windowEdgeMargin - distanceFromTrigger;
			calculatedMaxHeight = Math.min(calculatedMaxHeight, availableSpace);
		} else {
			const availableSpace = triggerRect.top - windowEdgeMargin - distanceFromTrigger;
			calculatedMaxHeight = Math.min(calculatedMaxHeight, availableSpace);
		}
		calculatedMaxHeight = Math.max(calculatedMaxHeight, 60);
		newPosition.maxHeight = `${calculatedMaxHeight}px`;

		setPosition(newPosition);
		setIsReadyToShow(true);
	};

	// Обработчик скролла - проверяем, скроллится ли тултип
	const handleScroll = (event: Event) => {
		// Проверяем, является ли цель скролла нашим тултипом
		if (tooltipRef.current && event.target instanceof Node) {
			const isScrollingTooltip = tooltipRef.current.contains(event.target);

			if (isScrollingTooltip) {
				// Если скроллится тултип, устанавливаем флаг и не закрываем его
				isScrollingTooltipRef.current = true;
				return;
			}
		}

		// Если скроллится не тултип, закрываем его
		if (!isScrollingTooltipRef.current) {
			setShouldShowTooltip(false);
		}

		// Сбрасываем флаг после обработки
		isScrollingTooltipRef.current = false;
	};

	// Проверяем line clamp только если alwaysShow = false
	useEffect(() => {
		if (!alwaysShow) {
			checkLineClamp();

			const observer = new ResizeObserver(() => checkLineClamp());
			if (childrenRef.current) observer.observe(childrenRef.current);

			return () => observer.disconnect();
		}
	}, [alwaysShow]);

	// Слушаем скролл на window с capture флагом
	useEffect(() => {
		window.addEventListener('scroll', handleScroll, {
			passive: true,
			capture: true
		});

		return () => {
			window.removeEventListener('scroll', handleScroll, true);
		};
	}, [isVisible, shouldShowTooltip]);

	// Используем useLayoutEffect для расчета позиции
	useLayoutEffect(() => {
		if (isVisible && shouldShowTooltip) {
			calculatePosition();
		}
	}, [isVisible, shouldShowTooltip]);

	// Очистка таймеров
	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	// Обработчик ref для children
	const handleChildrenRef = (node: HTMLElement | null) => {
		childrenRef.current = node;
		if (originalRef.current && typeof originalRef.current === 'function') originalRef.current(node);
	};

	const childrenWithRef = cloneElement(children, {
		ref: handleChildrenRef
	});

	// Рендерим тултип через портал
	// Рендерим тултип через портал
	// Рендерим тултип через портал
	const renderTooltip = () => {
		if (!portal) {
			throw new Error(`в документе не найден элемент с id "portal"`)
		}

		const shouldRender = isVisible &&
			isReadyToShow &&
			shouldShowTooltip &&
			(alwaysShow || isLineClamped);

		return createPortal(
			<AnimatePresence>
				{shouldRender && (
					<motion.div
						ref={tooltipRef}
						key="tooltip"
						initial={{ opacity: 0.7, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.15 }}
						className={`
						fixed z-[9999] text-sm rounded-2xl border 
						bg-background-block text-table-base
						shadow-lg ${className}
					`}
						style={{
							top: position.top,
							bottom: position.bottom,
							left: position.left,
							right: position.right,
							maxWidth: position.maxWidth,
							maxHeight: position.maxHeight,
							padding: padding,
						}}
						onMouseEnter={() => {
							if (timeoutRef.current) clearTimeout(timeoutRef.current);
						}}
						onMouseLeave={hideTooltip}
						onScroll={(e) => {
							isScrollingTooltipRef.current = true;
						}}
					>
						{/* Контейнер для скролла с правильной высотой */}
						<div
							className="overflow-y-auto"
							style={{
								maxHeight: `calc(${position.maxHeight} - ${padding * 2}px)`,
							}}
						>
							<div className="h-max pr-2">
								{content}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>,
			portal
		);
	};

	return (
		<div
			ref={triggerRef}
			className="relative inline-block h-fit w-full"
			onMouseEnter={showTooltip}
			onMouseLeave={hideTooltip}
		>
			{childrenWithRef}
			{renderTooltip()}
		</div>
	);
};