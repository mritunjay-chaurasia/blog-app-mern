import { Navigate } from "react-router-dom"

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('token')

    return !token ? children : <Navigate to="/dashboard" replace={true} />

}

export default PublicRoute;