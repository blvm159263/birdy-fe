import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import adminApi from "../../../api/adminApi";

const ProtectedRoutes = ({children}) => {
    const adminLoginInfomation = useSelector(state => state.admin.adminLoginInfomation)
    const {username, password} = adminLoginInfomation;
    let location = useLocation();

    if(username === null || password === null) {
        return <Navigate to="/admin/login" state={{from: location}} replace />
    }

    // Authenticate
    adminApi.authenticate(username, password)
    .then(response => {
        return children
    }).catch((error) => {
        console.log(error);
        return <Navigate to="/admin/login" state={{from: location}} replace />
    })
}

export default ProtectedRoutes