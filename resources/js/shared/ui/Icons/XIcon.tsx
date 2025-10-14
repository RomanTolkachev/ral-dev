import { FC } from "react"

interface IconProps {
    size?: number;
    strokeWidth?: number;
    className?: string;
}

export const XIcon: FC<IconProps> = ({
    size = 24,
    strokeWidth = 2,
    className = ""
}) => {
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
            className={className}
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}