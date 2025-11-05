import { AnimatePresence, motion } from 'motion/react';
import {
    FC,
    ReactNode,
    RefObject,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
    content: ReactNode;
    className?: string;
    delay?: number;
    hideDelay?: number;
    maxWidth?: string;
    maxHeight?: string;
    distanceFromTrigger?: number;
    windowEdgeMargin?: number;
    padding?: number;
    triggerRef: RefObject<HTMLElement>;
    tooltipRef?: RefObject<HTMLDivElement>;
}

export const Tooltip: FC<TooltipProps> = ({
    content,
    className = '',
    maxWidth = '800px',
    maxHeight = '400px',
    distanceFromTrigger = 0,
    windowEdgeMargin = 16,
    padding = 12,
    triggerRef,
    tooltipRef,
    delay = 400,
    hideDelay = 300,
}) => {
    const [visible, setVisible] = useState(false);
    const [isReadyToShow, setIsReadyToShow] = useState(false);
    const [position, setPosition] = useState({
        top: '',
        bottom: '',
        left: '',
        right: '',
        maxWidth,
        maxHeight,
    });

    const internalTooltipRef = useRef<HTMLDivElement | null>(null);
    const combinedTooltipRef = tooltipRef || internalTooltipRef;

    const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const mousePosRef = useRef({ x: 0, y: 0 });

    const clearTimers = () => {
        if (showTimerRef.current) {
            clearTimeout(showTimerRef.current);
            showTimerRef.current = null;
        }
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }
    };

    const handleShow = () => {
        clearTimers();
        showTimerRef.current = setTimeout(() => {
            setVisible(true);
        }, delay);
    };

    const handleHide = () => {
        clearTimers();
        hideTimerRef.current = setTimeout(() => {
            const el = document.elementFromPoint(mousePosRef.current.x, mousePosRef.current.y);
            const stillHovering =
                triggerRef.current?.contains(el) ||
                combinedTooltipRef.current?.contains(el);
            if (!stillHovering) {
                setVisible(false);
            }
        }, hideDelay);
    };

    const handleImmediateHide = () => {
        clearTimers();
        setVisible(false);
    };

    // Track mouse position
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePosRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Scroll outside — hide
    useEffect(() => {
        const handleScroll = (e: Event) => {
            const target = e.target as Node;
            if (combinedTooltipRef.current?.contains(target)) return;
            handleImmediateHide();
        };

        window.addEventListener('scroll', handleScroll, true);
        return () => {
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, []);

    // Mouse events on trigger
    useEffect(() => {
        const triggerEl = triggerRef.current;
        if (!triggerEl) return;

        triggerEl.addEventListener('mouseenter', handleShow);
        triggerEl.addEventListener('mouseleave', handleHide);

        return () => {
            triggerEl.removeEventListener('mouseenter', handleShow);
            triggerEl.removeEventListener('mouseleave', handleHide);
        };
    }, [triggerRef.current]);

    // Recalculate tooltip position
    const calculatePosition = () => {
        if (!triggerRef?.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const newPosition = {
            top: '',
            bottom: '',
            left: '',
            right: '',
            maxWidth,
            maxHeight,
        };

        const viewportCenterX = window.innerWidth / 2;
        const viewportCenterY = window.innerHeight / 2;
        const triggerCenterX = triggerRect.left + triggerRect.width / 2;
        const triggerCenterY = triggerRect.top + triggerRect.height / 2;

        const horizontalSide = triggerCenterX < viewportCenterX ? 'right' : 'left';
        const verticalSide = triggerCenterY < viewportCenterY ? 'bottom' : 'top';

        if (verticalSide === 'bottom') {
            newPosition.top = `${triggerRect.bottom + distanceFromTrigger}px`;
        } else {
            newPosition.bottom = `${window.innerHeight - triggerRect.top + distanceFromTrigger}px`;
        }

        if (horizontalSide === 'right') {
            newPosition.left = `${triggerRect.right + distanceFromTrigger}px`;
        } else {
            newPosition.right = `${window.innerWidth - triggerRect.left + distanceFromTrigger}px`;
        }

        // Calculate max width
        let calcMaxWidth = parseInt(maxWidth);
        if (horizontalSide === 'right') {
            const available = window.innerWidth - triggerRect.right - windowEdgeMargin - distanceFromTrigger;
            calcMaxWidth = Math.min(calcMaxWidth, available);
        } else {
            const available = triggerRect.left - windowEdgeMargin - distanceFromTrigger;
            calcMaxWidth = Math.min(calcMaxWidth, available);
        }
        calcMaxWidth = Math.max(calcMaxWidth, 100);
        newPosition.maxWidth = `${calcMaxWidth}px`;

        // Calculate max height
        let calcMaxHeight = parseInt(maxHeight);
        if (verticalSide === 'bottom') {
            const available = window.innerHeight - triggerRect.bottom - windowEdgeMargin - distanceFromTrigger;
            calcMaxHeight = Math.min(calcMaxHeight, available);
        } else {
            const available = triggerRect.top - windowEdgeMargin - distanceFromTrigger;
            calcMaxHeight = Math.min(calcMaxHeight, available);
        }
        calcMaxHeight = Math.max(calcMaxHeight, 60);
        newPosition.maxHeight = `${calcMaxHeight}px`;

        setPosition(newPosition);
        setIsReadyToShow(true);
    };

    useLayoutEffect(() => {
        if (visible) calculatePosition();
    }, [visible]);

    const portal = document.getElementById('portal');
    if (!portal) {
        throw new Error('Element with id "portal" not found');
    }

    return createPortal(
        <AnimatePresence>
            {visible && isReadyToShow && (
                <motion.div
                    ref={combinedTooltipRef}
                    key="tooltip"
                    initial={{ opacity: 0.7, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`fixed z-[9999] text-sm rounded-2xl border bg-background-block text-table-base shadow-lg ${className}`}
                    style={{
                        top: position.top,
                        bottom: position.bottom,
                        left: position.left,
                        right: position.right,
                        maxWidth: position.maxWidth,
                        maxHeight: position.maxHeight,
                        padding,
                    }}
                    onMouseEnter={handleShow}
                    onMouseLeave={handleHide}
                >
                    <div
                        className="overflow-y-auto"
                        style={{
                            maxHeight: `calc(${position.maxHeight} - ${padding * 2}px)`,
                        }}
                    >
                        <div className="h-max pr-2">{content}</div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        portal
    );
};
