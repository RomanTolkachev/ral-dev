import { forwardRef, useState } from "react";
import { Input } from "../Input";
import { Eye, EyeOff } from "./Eye";

interface PasswordInputProps {
    placeholder?: string;
    className?: string;
    error?: boolean
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps & React.InputHTMLAttributes<HTMLInputElement>>(
    ({ placeholder = "пароль", className = "", error, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        const togglePasswordVisibility = () => {
            setShowPassword(prev => !prev);
        };

        return (
            <div className="relative">
                <Input
                    ref={ref}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className={`${className}`}
                    {...props}
                    error={error}
                />
                {props.value && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-5 top-1/2 transform -translate-y-1/2 
                         text-gray-700 hover:text-gray-500 focus:outline-none
                         transition-all duration-200"
                    >
                        {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                )}
            </div>
        );
    }
);