import {AppstoreAddOutlined, HomeOutlined, LogoutOutlined, ShopOutlined, UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import AdminSubPageType from "../../constants/AdminSubPageType";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {resetAllState} from "../../features/search/searchSlice";
import storageService from "../../api/storage";
import {LoginContext} from "../../context/LoginProvider";
import {NotificationContext} from "../../context/NotificationProvider";

export default function AdminSidebar() {
  const {setIsLogin, setRole} = useContext(LoginContext);
  const currentPage = useSelector(state => state.ui.currentAdminSubPage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openNotificationWithIcon = useContext(NotificationContext);

  const onLogout = () => {
    storageService.removeAccessToken();
    setIsLogin(false);
    setRole(null);
    navigate("/");
    openNotificationWithIcon('success', 'You have logged out!');
  }

  useEffect(() => {
    dispatch(resetAllState());
    console.log("reset all search state")
  }, [currentPage])

  return (
    <aside className="flex flex-col top-0 left-0 col-span-3 bg-white h-full border-r">
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li>
            <Link to={`/admin/${AdminSubPageType.DASHBOARD.path}`} className={`${currentPage === AdminSubPageType.DASHBOARD ? 'font-bold bg-sky-200 hover:bg-sky-100' : ''} relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-sky-500 p-6`}>
              <HomeOutlined />
              <span className="ml-2 text-sm tracking-wide truncate">Dashboard</span>
            </Link>
          </li>

          {/* Manage stores */}
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500">Manage shops</div>
            </div>
          </li>
          <li>
            <Link to={`/admin/${AdminSubPageType.ALL_SHOPS.path}`} className={`${currentPage === AdminSubPageType.ALL_SHOPS ? 'font-bold bg-sky-200 hover:bg-sky-100' : ''} relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-sky-500 p-6`}>
              <ShopOutlined />
              <span className="ml-2 text-sm tracking-wide truncate">All shops</span>
            </Link>
          </li>
          <li>
            <Link to={`/admin/${AdminSubPageType.NEW_SHOP_REQUESTS.path}`} className={`${currentPage === AdminSubPageType.NEW_SHOP_REQUESTS ? 'font-bold bg-sky-200 hover:bg-sky-100' : ''} relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-sky-500 p-6`}>
              <AppstoreAddOutlined />
              <span className="ml-2 text-sm tracking-wide truncate">New shops requests</span>
            </Link>
          </li>
          <li>
            <Link to={`/admin/${AdminSubPageType.NEW_PRODUCT_REQUESTS.path}`} className={`${currentPage === AdminSubPageType.NEW_PRODUCT_REQUESTS ? 'font-bold bg-sky-200 hover:bg-sky-100' : ''} relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-sky-500 p-6`}>
              <AppstoreAddOutlined />
              <span className="ml-2 text-sm tracking-wide truncate">New product requests</span>
            </Link>
          </li>

          {/* Manage users */}
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500">Manage users</div>
            </div>
          </li>
          <li>
            <Link to={`/admin/${AdminSubPageType.ALL_USERS.path}`} className={`${currentPage === AdminSubPageType.ALL_USERS ? 'font-bold bg-sky-200 hover:bg-sky-100' : ''} relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-sky-500 p-6`}>
              <UserOutlined />
              <span className="ml-2 text-sm tracking-wide truncate">All users</span>
            </Link>
          </li>
          <li>
            <button onClick={() => onLogout()} className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-sky-500 p-6`}>
              <LogoutOutlined />
              <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  )
}