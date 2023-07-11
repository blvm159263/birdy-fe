import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import adminApi from "../../../api/adminApi";

const ProtectedRoute = ({children}) => {
    const adminLoginInfomation = useSelector(state => state.admin.adminLoginInfomation)
    const {username, password} = adminLoginInfomation;
    let location = useLocation();

    // Authenticate
    adminApi.authenticate(username, password)
    .then(response => {
        return children
    }).catch((error) => {
        return <Navigate to="/admin/login" state={{from: location}} replace />
    })
}