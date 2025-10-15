import { ComponentProps, FC } from "react";

interface ChevronIconProps extends ComponentProps<"svg"> {
    size?: number;
    strokeWidth?: number;
    direction?: "up" | "down" | "left" | "right";
}

export const ChevronIcon: FC<ChevronIconProps> = ({
    size = 24,
    strokeWidth = 2,
    direction = "down",
    className = "",
    ...props
}) => {
    const rotationMap = {
        up: "0",
        right: "90",
        down: "180",
        left: "270"
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`lucide lucide-chevron-icon transition-all transform ${className}`}
            style={{ transform: `rotate(${rotationMap[direction]}deg)` }}
            {...props}
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
};