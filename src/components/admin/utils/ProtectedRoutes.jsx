import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import adminApi from "../../../api/adminApi";

const ProtectedRoutes = () => {
    const adminLoginInfomation = useSelector(state => state.admin.adminLoginInfomation)
    const { username, password } = adminLoginInfomation;
    const [isLoading, setLoading] = useState(false);
    const [isAuthenticate, setAuthenticate] = useState(null);

    useEffect(() => {
        setLoading(true);
        if (username === null || password === null) {
            setAuthenticate(false);
        }

        // Authenticate
        adminApi.authenticate(username, password)
            .then(response => {
                setAuthenticate(true);
            }).catch((error) => {
                setAuthenticate(false);
            }).finally(() => {
                setLoading(false);
            })
        
    }, [username, password, isAuthenticate])

    if (isLoading || isAuthenticate === null) return (
        <div className='flex justify-center items-center h-[70vh]'>
            <Spin size='large' />
        </div>
    )

    return isAuthenticate ? <Outlet/> : <Navigate to='/admin/login' replace/>
}

export default ProtectedRoutes