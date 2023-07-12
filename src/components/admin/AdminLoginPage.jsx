import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import adminApi from "../../api/adminApi";
import { NotificationContext } from "../../context/NotificationProvider";
import { saveAdminLoginInformation } from "../../features/admin/adminSlice";
import AdminHeader from "./AdminHeader";

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setAuthenticating] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openNotificationWithIcon = useContext(NotificationContext);

  const handleLogin = () => {
    setError(null);

    if (username.trim().length === 0 || password.trim().length === 0) {
      setError('Vui lòng điền tên đăng nhập và mật khẩu')
      return;
    }

    // Authenticate
    setAuthenticating(true);
    adminApi.authenticate(username, password)
      .then(response => {
        dispatch(saveAdminLoginInformation({
          username: username,
          password: password
        }))
        navigate("/admin/dashboard", { replace: true });
        openNotificationWithIcon('Thành công', 'Bạn đã đăng nhập')
      }).catch((error) => {
        setError('Tên đăng nhập hoặc mật khẩu không đúng')
      }).finally(() => {
        setAuthenticating(false);
      })
  }

  return (
    <div className="h-screen bg-gradient-to-r from-sky-500 via-blue-500 to-sky-500">
      <AdminHeader />
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto h-[80vh]">
        {/* Left */}
        <div className="flex flex-col gap-6 justify-center items-center">
          <img
            src="/assets/images/logo-white.png"
            className="h-16"
            alt="logo"
          />
          <h1 className="text-white font-normal tracking-wide text-3xl">
            Welcome to Birdy!
            <br /> A bird trading platform
          </h1>
        </div>

        {/* Right */}
        <div className="rounded shadow bg-white h-[450px] my-auto p-8">
          <h1 className="text-2xl font-bold text-center">Đăng nhập tài khoản admin</h1>
          <div className="mt-8">
            <label className="block mb-1">Tên đăng nhập</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type='text' className="w-full rounded shadow bg-neutral-100 py-2 px-4 border border-neutral-300 outline-0" placeholder='Điền tên đăng nhập' />
          </div>
          <div className="mt-4">
            <label className="block mb-1">Mật khẩu</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' className="w-full rounded shadow bg-neutral-100 py-2 px-4 border border-neutral-300 outline-0" placeholder='Điền mật khẩu' />
          </div>
          <p className={`text-red-500 text-xs mt-4 ${error ? 'opacity-100' : 'opacity-0'} duration-100`}>* {error}</p>
          <button onClick={() => handleLogin()} className={`mt-4 h-12 w-full rounded shadow bg-gradient-to-r from-sky-500 to-sky-700 text-white font-bold hover:brightness-125 active:brightness-110 duration-150 ${isAuthenticating ? 'grayscale pointer-events-none hover:pointer-events-none' : ''}`}>{isAuthenticating ? 'Đang xử lý...' : 'Đăng nhập'}</button>
        </div>
      </div>
    </div>
  )
}