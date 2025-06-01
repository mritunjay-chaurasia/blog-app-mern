import { Navigate } from "react-router-dom"
import { access_token } from "../constant";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem(access_token);
    
    return token ? children : <Navigate to="/login" replace={true} />
}

export default PrivateRoute