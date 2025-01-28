import { Outlet } from "react-router"

export const TableLayout = () => {
    return (
        <div className='flex grow shrink min-h-0'>
            <Outlet />
        </div>
    )
}