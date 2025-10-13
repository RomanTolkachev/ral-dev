import { FC } from "react"

interface IconProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const PlusIcon: FC<IconProps> = ({ 
  size = 20, 
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
            <path d="M5 12h14"/>
            <path d="M12 5v14"/>
        </svg>
    )
}