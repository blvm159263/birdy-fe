import { React, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button, Menu } from "antd"

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

  getItem('Logout', '6',
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

  const handlePath = function () {
    switch (window.location.pathname.split("/shop")[1]) {
      case "": return 1;
      case "/": return 1;
      case "/dashboard": return 1;
      case "/profile": return 2;
      case "/orders": return 3;
      case "/products": return 4;
      case "/product/new": return 5;
    }
  }

  // console.log(handlePath);
  // useEffect(() => {
  // console.log(window.location.pathname.split("/shop")[1]);
  //   // return () => {
  //   //   window.location.pathname.split("/shop")[1];
  //   // }
  // }, [window.location.pathname.split("/shop")[1]])

  return (
    <div className="flex w-1/5 fixed">
      <div className="flex flex-col h-screen py-10 bg-white shadow w-full">
        <div className="space-y-3">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold">Dashboard</h2>
            <p className="mt-2 mb-3">"Shopname"</p>
            <div className="w-10 h-10">
              <img
                src="../assets/images/shop-avar.png"
                className="w-fit h-fit"
                alt=""
              />
            </div>
          </div>
          <div className="flex-1 h-full py-7">

            <div
              className="w-full h-full bg-white"
            >

              <Menu
                defaultSelectedKeys={[handlePath().toString()]}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="light"
              >
                <Menu.Item className="font-medium text-base text-gray-400" key="1" icon={items[0].icon}>
                  {items[0].label}
                  <Link to="/shop/dashboard" />
                </Menu.Item>
                <Menu.Item className="font-medium text-base text-gray-400" key="2" icon={items[1].icon}>
                  {items[1].label}
                  <Link to="/shop/profile" />
                </Menu.Item>
                <Menu.Item className="font-medium text-base text-gray-400" key="3" icon={items[2].icon}>
                  {items[2].label}
                  <Link to="/shop/orders" />
                </Menu.Item>
                <SubMenu className="font-medium text-base text-gray-400" key="sub1" icon={items[3].icon} title={items[3].label}>
                  <Menu.Item className="font-normal text-black" key="4">
                    <span style={{ marginLeft: "38px" }} >{items[3].children[0].label}</span>
                    <Link to="/shop/products" />
                  </Menu.Item>
                  <Menu.Item className="font-normal text-black" key="5">
                    <span style={{ marginLeft: "38px" }} >{items[3].children[1].label}</span>
                    <Link to="/shop/product/new" />
                  </Menu.Item>
                </SubMenu>
                <Menu.Item className="font-medium text-base text-gray-400" key="6" icon={items[4].icon}>
                  {items[4].label}
                  <Link to="/logout" />
                </Menu.Item>
              </Menu>

            </div>

            {/* <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm">
                <Link
                  to="/shop"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span>Profile</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  to="/shop/orders"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <span>Orders</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  to="/shop/products"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span>Products</span>
                </Link>
              </li>

              <li className="rounded-sm">
                <a
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
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
                  </svg>
                  <span>Logout</span>
                </a>
              </li>
            </ul> */}
          </div>
        </div>
      </div>
    </div>
  )

  // return (
  //   <div
  //     className="w-1/5 h-full bg-white"
  //   >

  //     <Menu
  //       defaultSelectedKeys={['1']}
  //       defaultOpenKeys={['sub1']}
  //       mode="inline"
  //       theme="light"
  //       items={items}
  //     />
  //   </div>
  // );

}

export default Sidebar
