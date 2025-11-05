// Components/ColumnForm.tsx
import { Input } from "@/Components/Inputs/Input"
import { MainButton } from "@/shared/ui/Buttons/MainButton"
import { useClickOutside } from "@/shared/useClickOutside"
import { useRef, FC } from "react"

type ColumnFormProps = {
    isOpen: boolean
    onClose: () => void
    placeholder?: string
    hasExternalHandler: boolean
}

export const ColumnForm: FC<ColumnFormProps> = ({ 
    isOpen, 
    onClose, 
    placeholder,
    hasExternalHandler 
}) => {
    const formRef = useRef<HTMLDivElement>(null)

    useClickOutside(formRef, onClose, !hasExternalHandler)

    if (!isOpen || hasExternalHandler) {
        return null
    }

    return (
        <div 
            ref={formRef}
            className="min-h-0 overflow-hidden"
        >
            <form className="flex gap-3 pb-2">
                <Input placeholder={placeholder} />
                <MainButton color="violet">сохранить</MainButton>
            </form>
        </div>
    )
}