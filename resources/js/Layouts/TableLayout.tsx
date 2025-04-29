import { Header } from "@/Components/Header"
import { Outlet } from "react-router-dom"

export const TableLayout = () => {
    return (
        <div className='flex grow flex-col shrink min-h-0'>
            <Outlet />
        </div>
    )
}