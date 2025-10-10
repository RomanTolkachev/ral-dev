import { FC } from "react"

export const Hint: FC<{value: string}> = ({value}) => {
    return (
        <div className="absolute left-2 bottom-0 translate-y-[150%] flex flex-col">
            <span>{`пароль: ${value}`}</span>
            <span className="text-error font-semibold">на английской раскладке</span>
        </div>
    )
}