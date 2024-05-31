import { Navigate, Outlet } from "react-router-dom"

interface Props {
    isAllowed: boolean
    children?: React.ReactNode
}
// 
export const ProtectedRoute = ({ isAllowed, children }:
    Props
) => {
    // Redirect to login
    if (!isAllowed) return <Navigate to='/login' />

    // Children o individual
    return children ? <>{children}</> : <Outlet />
}