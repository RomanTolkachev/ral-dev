import { AnimatePresence, motion } from 'motion/react';
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  maxWidth?: string;
  maxHeight?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  className = '',
  delay = 800,
  maxWidth = '800px',
  maxHeight = '400px',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ 
    top: '', 
    bottom: '', 
    left: '', 
    right: '',
    transform: '',
    maxWidth: maxWidth,
    maxHeight: maxHeight
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsVisible(false), 150);
  };

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    // Центр viewport
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;

    // Центр триггера
    const triggerCenterX = triggerRect.left + triggerRect.width / 2;
    const triggerCenterY = triggerRect.top + triggerRect.height / 2;

    // Определяем сторону для позиционирования
    const horizontalSide = triggerCenterX < viewportCenterX ? 'right' : 'left';
    const verticalSide = triggerCenterY < viewportCenterY ? 'bottom' : 'top';

    const newPosition = {
      top: '',
      bottom: '',
      left: '',
      right: '',
      transform: '',
      maxWidth: maxWidth,
      maxHeight: maxHeight
    };

    // Вертикальное позиционирование
    if (verticalSide === 'bottom') {
      newPosition.top = '100%';
    } else {
      newPosition.bottom = '100%';
    }

    // Горизонтальное позиционирование
    if (horizontalSide === 'right') {
      newPosition.left = '100%';
    } else {
      newPosition.right = '100%';
    }

    // Добавляем отступ
    const distanceFromTrigger = '8px';
    if (newPosition.top === '100%') newPosition.top = `calc(100% + ${distanceFromTrigger})`;
    if (newPosition.bottom === '100%') newPosition.bottom = `calc(100% + ${distanceFromTrigger})`;
    if (newPosition.left === '100%') newPosition.left = `calc(100% + ${distanceFromTrigger})`;
    if (newPosition.right === '100%') newPosition.right = `calc(100% + ${distanceFromTrigger})`;

    // Динамически вычисляем максимальные размеры с учетом границ экрана
    const edgeMargin = 16; // отступ от краев экрана

    // Расчет максимальной ширины
    let calculatedMaxWidth = parseInt(maxWidth);
    if (horizontalSide === 'right') {
      // Подсказка справа - ограничиваем правым краем экрана
      const availableSpace = window.innerWidth - triggerRect.right - edgeMargin;
      calculatedMaxWidth = Math.min(calculatedMaxWidth, availableSpace);
    } else {
      // Подсказка слева - ограничиваем левым краем экрана
      const availableSpace = triggerRect.left - edgeMargin;
      calculatedMaxWidth = Math.min(calculatedMaxWidth, availableSpace);
    }
    calculatedMaxWidth = Math.max(calculatedMaxWidth, 100); // Минимальная ширина
    newPosition.maxWidth = `${calculatedMaxWidth}px`;

    // Расчет максимальной высоты
    let calculatedMaxHeight = parseInt(maxHeight);
    if (verticalSide === 'bottom') {
      // Подсказка снизу - ограничиваем нижним краем экрана
      const availableSpace = window.innerHeight - triggerRect.bottom - edgeMargin;
      calculatedMaxHeight = Math.min(calculatedMaxHeight, availableSpace);
    } else {
      // Подсказка сверху - ограничиваем верхним краем экрана
      const availableSpace = triggerRect.top - edgeMargin;
      calculatedMaxHeight = Math.min(calculatedMaxHeight, availableSpace);
    }
    calculatedMaxHeight = Math.max(calculatedMaxHeight, 60); // Минимальная высота
    newPosition.maxHeight = `${calculatedMaxHeight}px`;

    setPosition(newPosition);
  };

  // Используем useLayoutEffect для точного позиционирования
  useLayoutEffect(() => {
    if (isVisible) {
      // Даем время на рендер тултипа, затем вычисляем позицию
      requestAnimationFrame(() => {
        calculatePosition();
      });
    }
  }, [isVisible]);

  // Очистка таймеров
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={triggerRef}
      className="relative inline-block h-fit w-full"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            key="tooltip"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className={`
              absolute z-[9999] px-3 py-1.5 text-sm rounded-2xl border
              bg-background-block text-table-base
              shadow-lg ${className}
            `}
            style={{
              top: position.top,
              bottom: position.bottom,
              left: position.left,
              right: position.right,
              transform: position.transform,
              maxWidth: position.maxWidth,
              maxHeight: position.maxHeight,
              width: 'max-content',
              whiteSpace: 'normal',
              overflow: 'auto', // добавляем скролл если контент не помещается
            }}
            onMouseEnter={() => timeoutRef.current && clearTimeout(timeoutRef.current)}
            onMouseLeave={hideTooltip}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};