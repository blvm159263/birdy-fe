import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SearchBar from "../features/search/SearchBar"
import SearchType from "../constants/SearchType"
import React, { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import jwtDecode from "jwt-decode"
import storageService from "../api/storage"
import { LoginContext } from "../context/LoginProvider"
import { useDispatch, useSelector } from "react-redux"
import { resetAllState } from "../features/search/searchSlice"
import userApi from "../api/userApi"
import { getUser, getWishlist } from "../features/user/userSlice"

export default function NavBar() {
  const { isLogin, setIsLogin, setRole } = useContext(LoginContext)
  const navigate = useNavigate()
  const userInformation = useSelector((state) => state.user.userInformation)
  const wishList = useSelector((state) => state.user.wishlist)

  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const cartCount = useSelector((state) => state.cart.items.length)
  const dispatch = useDispatch()

  const onLogout = () => {
    storageService.removeAccessToken()
    setIsLogin(false)
    setRole("")
    navigate("/")
    window.location.reload()
  }

  const fetchUser = async () => {
    let token = storageService.getAccessToken()
    if (token) {
      token = jwtDecode(token)
      await userApi
      .getUserByPhoneNumber(token.sub)
      .then((response) => {
        dispatch(getUser(response.data))
        // setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    
  }

  const fetchWishlist = () => {
    if (userInformation) {
      userApi
        .getWishlistByUserId(userInformation.id)
        .then((response) => dispatch(getWishlist(response.data)))
        .catch((e) => console.log(e))
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])
  // useEffect(() => {
  //   fetchWishlist()
  // }, [wishList])
  // console.log(wishList)

  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu)

  return (
    <nav className="bg-gradient-to-r from-sky-500 via-blue-500 to-sky-500 border-gray-200">
      <div className="container flex flex-wrap items-center justify-between mx-auto p-3 md:px-8 md:py-6 lg:py-4 relative">
        <Link
          to="/"
          className="flex items-center"
          onClick={() => dispatch(resetAllState())}
        >
          <img
            src="/assets/images/btp.png"
            className="h-8 md:h-12 mr-3"
            alt="Birdy Logo"
          />
          <span className="self-center text-xl md:text-3xl lg:text-4xl font-semibold whitespace-nowrap text-white">
            Birdy
          </span>
        </Link>
        <div className="flex flex-col md:pr-16 lg:pr-24">
          <SearchBar />
          <ul className="hidden md:flex text-white justify-between pt-2">
            <li>
              <Link
                to={`/search/${SearchType.ALL_PRODUCT.text}`}
                onClick={() => dispatch(resetAllState())}
              >
                Tất cả
              </Link>
            </li>
            <li>
              <Link
                to={`/search/${SearchType.BIRD.text}`}
                onClick={() => dispatch(resetAllState())}
              >
                Chim
              </Link>
            </li>
            <li>
              <Link
                to={`/search/${SearchType.ACCESSORY.text}`}
                onClick={() => dispatch(resetAllState())}
              >
                Thức ăn
              </Link>
            </li>
            <li>
              <Link
                to={`/search/${SearchType.FOOD.text}`}
                onClick={() => dispatch(resetAllState())}
              >
                Phụ kiện
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          {isLogin && (
            <Link
              className="block p-2.5 mr-1 text-white relative"
              to="/wishlist"
            >
              <FontAwesomeIcon
                icon={faHeart}
                size="1x"
                style={{ color: "#e41b1b" }}
              />
              <span className="cart-count absolute bottom-1.5 -right-1.5 text-center text-xs h-4 w-4 rounded-full bg-orange-500">
                {wishList ? wishList.length : "0"}
              </span>
            </Link>
          )}
          <Link
            to="/cart"
            className="block p-2.5 mr-1 text-white relative"
            aria-current="page"
          >
            <FontAwesomeIcon icon={faCartShopping} size="1x" />
            <span className="cart-count absolute bottom-1.5 -right-1.5 text-center text-xs h-4 w-4 rounded-full bg-orange-500">
              {cartCount}
            </span>
          </Link>
          <button
            onClick={toggleMobileMenu}
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center p-2 text-sm text-white rounded-lg md:hidden focus:outline-none"
            aria-controls="navbar-search"
            aria-expanded="false"
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div
          className={`${
            showMobileMenu ? "" : "hidden"
          } md:hidden mobile-menu items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-search"
        >
          <SearchBar forMobile />
          <ul className="flex flex-col p-2 mt-4 gap-4 font-semibold text-white uppercase">
            <li>
              <Link
                to={`/search/${SearchType.ALL_PRODUCT.text}`}
                onClick={() => {
                  dispatch(resetAllState())
                  toggleMobileMenu()
                }}
              >
                Tất cả
              </Link>
            </li>
            <li>
              <Link
                to={`/search/${SearchType.BIRD.text}`}
                onClick={() => {
                  dispatch(resetAllState())
                  toggleMobileMenu()
                }}
              >
                Chim
              </Link>
            </li>
            <li>
              <Link
                to={`/search/${SearchType.ACCESSORY.text}`}
                onClick={() => {
                  dispatch(resetAllState())
                  toggleMobileMenu()
                }}
              >
                Phụ kiện
              </Link>
            </li>
            <li>
              <Link
                to={`/search/${SearchType.FOOD.text}`}
                onClick={() => {
                  dispatch(resetAllState())
                  toggleMobileMenu()
                }}
              >
                Thức ăn
              </Link>
            </li>
            <hr />
            <li>
              <Link to="/login">Đăng nhập</Link>
            </li>
            <li>
              <Link to="/shop-login">Bán sản phẩm</Link>
            </li>
          </ul>
        </div>
        <div className="absolute top-0 right-0 hidden md:flex text-white text-sm xl:text-base">
          {isLogin ? (
            <>
              <Link to="/user" className="px-2 pt-1">
                Hồ sơ
              </Link>
              <span className="px-2 pt-[0.2rem]">|</span>
              <span
                onClick={onLogout}
                className="px-2 pt-[0.2rem] cursor-pointer"
              >
                Đăng xuất
              </span>
            </>
          ) : (
            <>
              <Link to="/shop-login" className="px-2 pt-1 mr-2">
                Bán sản phẩm
              </Link>
              <Link to="/login" className="px-2 pt-1">
                Đăng nhập
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
