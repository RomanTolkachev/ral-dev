import React, { useState, useRef, useEffect } from 'react';


interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  className?: string;
  delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = 'top',
  align = 'center',
  className = '',
  delay = 100,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    console.log("зашли")
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsVisible(false), 150);
  };

  // Закрытие при escape или клике вне области
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hideTooltip();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      {/* Триггер - отдельный элемент */}
      <div
        ref={triggerRef}
        className="inline-block"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
      </div>

      {/* Тулутип - абсолютно позиционированный */}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`
            fixed z-50 px-3 py-1.5 text-sm rounded-md border
            bg-white dark:bg-gray-800 text-gray-900 dark:text-white
            shadow-lg transition-opacity duration-150
            ${className}
          `}
          style={{
            // Позиционирование относительно триггера
            top: triggerRef.current
              ? triggerRef.current.getBoundingClientRect().bottom + window.scrollY + 8
              : 0,
            left: triggerRef.current
              ? triggerRef.current.getBoundingClientRect().left + window.scrollX
              : 0,
          }}
          onMouseEnter={showTooltip} // 🔥 Важно: пока курсор над тултипом - он виден
          onMouseLeave={hideTooltip}
        >
          {content}
        </div>
      )}
    </>
  );
};