import React from "react"
import { useState } from "react"
import validator from "validator"
import authApi from "../../../api/authApi"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { LoginContext } from "../../../context/LoginProvider"
import storageService from "../../../api/storage"
import { NotificationContext } from "../../../context/NotificationProvider"
import jwtDecode from "jwt-decode"
import shopApi from "../../../api/shopApi"

function ShopSignIn({ setIsSignIn, setIsForgotPassword }) {

  const openNotificationWithIcon = useContext(NotificationContext)
  const { setIsLogin, setRole, setShopId } = useContext(LoginContext)

  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const token = storageService.getAccessToken()
    let tokenDecode
    if (token) {
      tokenDecode = jwtDecode(token)
      const currentTime = Math.floor(Date.now() / 1000)
      if (currentTime < tokenDecode.exp) {
        console.log(tokenDecode)
        console.log("token hợp lệ")
        setIsLogin(true)
        setRole(tokenDecode.role)
        navigate("/")
      }
    }
  }, [])

  const validationPhoneNumber = () => {
    const isValid = validator.isMobilePhone(phoneNumber, "vi-VN");
    setIsValidPhoneNumber(isValid);
    return isValid;
  }

  const formatPhoneNumber = (number) => {
    if (phoneNumber.startsWith("+84")) {
      number = "0" + number.substr(3)
    }
    return number
  }

  const onSignIn = () => {
    if (validationPhoneNumber()) {
      authApi
        .login({
          phoneNumber: formatPhoneNumber(phoneNumber),
          password: password,
        })
        .then((res) => {
          if (res.status === 200) {
            // alert("login thành công")
            let token = jwtDecode(res.data.token)
            if (token.role !== "SHOP") {
              openNotificationWithIcon("error", "Bạn không phải chủ shop")
              return
            }
            storageService.setAccessToken(res.data.token)
            setRole(token.role)
            setIsLogin(true)
            shopApi.getShopInformationByPhoneNumber(token.sub)
              .then((res) => {
                console.log(res.data);
                setShopId(res.data.id)
              }).catch((err) => {
                console.log(err)
              })
            navigate("/")
          } else if (res.status === 403) {
          }
        })
        .catch((err) => {
          openNotificationWithIcon("error", "Đăng nhập thất bại")
          console.log(err)
        })
    }
  }

  const handleEntailmentRequest = (e) => {
    e.preventDefault()
  }

  return (
    <div className="lg:w-1/2 sm: w-full p-5 sm:mx-auto">
      <form className="lg:w-2/3 sm:w-full bg-white p-10 rounded-md">
        <h1 className="text-3xl mb-4 ">Sign In for Shop Owner</h1>
        <div className="mb-4">
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Email/Phone number"
            className="w-full border-gray-300 border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {isValidPhoneNumber ? (
            ""
          ) : (
            <div className="text-rose-600">Invalid Phone Number !</div>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="w-full border-gray-300 border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-orange-400	w-full my-2 text-white px-4 py-2 rounded hover:bg-white hover:text-orange-400 hover:border-orange-400 hover:outline outline-1 focus:outline-none focus:bg-blue-600"
          onClick={(e) => {
            handleEntailmentRequest(e)
            onSignIn()
          }}
        >
          Sign In
        </button>
        <div className="flex justify-between items-center mb-4">
          <a href="#" onClick={() => {
            setIsForgotPassword(true)
            setIsSignIn(false)
          }}
            className="text-blue-500 text-sm hover:underline">
            Forgot Password?
          </a>
        </div>
        <p className="text-center text-gray-400 mb-4">OR</p>
        <button
          type="button"
          className="bg-red-500 w-full text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
        >
          Login with Google
        </button>
        <div>
          <p className="text-center mt-4">
            You don’t have an account?{" "}
            <a
              className="cursor-pointer text-orange-400 hover:text-orange-700"
              onClick={() => setIsSignIn(false)}
            >
              Sign Up
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default ShopSignIn
