import { FunctionComponent } from "react"

const items = ['bear', 'wolf', 'gorynich', 'fish', 'eagle', 'lion', 'zilael', 'kraken', 'deer', 'snake'] as const;

type IProps = {
    [K in typeof items[number]]?: boolean;
} & { className?: string }


const MainPageSVG: FunctionComponent<IProps> = ({ className, ...flags }) => {
    const hasProps = items.some(key => key in flags);
    if (!hasProps) return null;
    return (
        <>
            
        </>
    )
}

export default MainPageSVG