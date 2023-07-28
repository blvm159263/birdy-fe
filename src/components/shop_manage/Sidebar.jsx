import {React, useContext, useEffect, useState} from "react"
import {Link, useNavigate, useLocation} from "react-router-dom"
import {Menu} from "antd"
import storageService from "../../api/storage"
import {LoginContext} from "../../context/LoginProvider"
import shopApi from "../../api/shopApi"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setUpdated } from "../../features/shops/shopSlice"

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const { SubMenu } = Menu;
const items = [

  getItem('Dashboard', '1',
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 mr-2"
      fill="none"
      viewBox="0 0 30 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h8m-8 6h16"
      />
    </svg>,),

  getItem('Shop Profile', '2',
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 mr-2"
      fill="none"
      viewBox="0 0 30 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>,),

  getItem('Shop Orders', '3',
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 mr-2"
      fill="none"
      viewBox="0 0 30 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    </svg>),

  getItem('Shop Products', 'sub1',
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 mr-2"
      fill="none"
      viewBox="0 0 30 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>, [
    getItem('View List Products', '4'),
    getItem('Create New Product', '5'),
  ]),

  getItem('Shop Delivery', '6',
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 mr-2"
      fill="none"
      viewBox="0 0 30 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>),

  getItem('Logout', '7',
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 mr-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
      />
    </svg>),
];
console.log(items);


// const getPath = function () {
//   window.location.pathname.split("/")[2];
// }

function Sidebar() {

  const { setIsLogin, setRole, shopId } = useContext(LoginContext)
  const [shop, setShop] = useState()
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const updated = useSelector(state => state.shop.updated)

  const navigate = useNavigate()
  const onLogout = () => {
    storageService.removeAccessToken();
    setIsLogin(false);
    setRole(null);
    navigate("/");
  }

  const fetchShop = async () => {
    if (shopId) {
      await shopApi.getShopInformationByShopId(shopId)
        .then((res) => {
          console.log(res);
          setShop(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  useEffect(() => {
    updated && dispatch(setUpdated(false));
    fetchShop();
    // handlePath();
  }, [shopId, updated])


  const handlePath = function () {
    switch (pathname) {
      case "/": return ['1'];
      case "/dashboard": return ['1'];
      case "/profile": return ['2'];
      case "/orders": return ['3'];
      case "/products": return ['4'];
      case "/product/new": return ['5'];
      case "/delivery":
        return ['6'];
    }
  }

  return (
    <div className="flex col-span-3 border-r shadow">
      <div className="flex flex-col min-h-screen py-10 bg-white shadow w-full">
        <div className="space-y-3">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold">Shop Manage</h2>
            <p className="mt-2 mb-3">{shop?.shopName}</p>
            <div className="w-10 h-10">
              <img
                src={shop?.avatarUrl}
                className="w-fit h-fit rounded-full"
                alt=""
              />
            </div>
          </div>
          <div className="flex-1 h-full py-7">

            <div
              className="w-full h-full bg-white"
            >

              <Menu
                defaultSelectedKeys={handlePath()}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                theme="light"
              >
                <Menu.Item className="font-medium text-base text-gray-400" key="1" icon={items[0].icon}>
                  {items[0].label}
                  <Link to="/dashboard" />
                </Menu.Item>
                <Menu.Item className="font-medium text-base text-gray-400" key="2" icon={items[1].icon}>
                  {items[1].label}
                  <Link to="/profile" />
                </Menu.Item>
                <Menu.Item className="font-medium text-base text-gray-400" key="3" icon={items[2].icon}>
                  {items[2].label}
                  <Link to="/orders" />
                </Menu.Item>
                <SubMenu className="font-medium text-base text-gray-400" key="sub1" icon={items[3].icon} title={items[3].label}>
                  <Menu.Item className="font-normal text-black" key="4">
                    <span style={{ marginLeft: "38px" }} >{items[3].children[0].label}</span>
                    <Link to="/products" />
                  </Menu.Item>
                  <Menu.Item className="font-normal text-black" key="5">
                    <span style={{ marginLeft: "38px" }} >{items[3].children[1].label}</span>
                    <Link to="/product/new" />
                  </Menu.Item>
                </SubMenu>
                <Menu.Item className="font-medium text-base text-gray-400" key="6" icon={items[4].icon}>
                  {items[4].label}
                  <Link to="/delivery" />
                </Menu.Item>
                <Menu.Item onClick={onLogout} className="font-medium text-base text-gray-400" key="7" icon={items[5].icon}>
                  {items[5].label}
                </Menu.Item>
              </Menu>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
