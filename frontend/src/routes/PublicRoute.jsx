import { Navigate } from "react-router-dom"
import { access_token } from "../constant";

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem(access_token);

    return !token ? children : <Navigate to="/dashboard" replace={true} />

}

export default PublicRoute;