import React, { useState } from "react"
import SignIn from "../SignIn"
import SignUp from "../SignUp"
import ShopSignIn from "./ShopSignIn"
import ShopSignUp from "./ShopSignUp"
import ShopInformation from "./ShopInformation"

function ShopLogin() {
  const [isSignIn, setIsSignIn] = useState(true)
  const [phoneNumberRegister, setPhoneNumberRegister] = useState("")
  const [passwordRegister, setPasswordRegister] = useState("")
  const [isVerified, setIsVerified] = useState(false)

  const handleChangeSignState = () => {
    setIsSignIn(!isSignIn)
  }

  return (
    <div className=" py-8 bg-gradient-to-r from-sky-500 via-blue-500 to-sky-500 border-gray-200 ">
      <div className="flex flex-wrap sm: justify-center mx-auto">
        <div className="lg:w-1/2 sm: w-full flex flex-col justify-center items-center ">
          <div className="h-12 mb-5">
            <img
              src="/assets/images/logo-white.png"
              className="h-full"
              alt="Flowbite Logo"
            />
          </div>
          <h1 className="text-violet-600	 font-normal tracking-wide	 text-3xl text-center ">
            We are the best platform to <br /> sell bird related products !
          </h1>
        </div>
        {!isVerified ? (
          <>
            {!isSignIn ? (
              <ShopSignUp
                setIsSignIn={setIsSignIn}
                setPhoneNumberRegister={setPhoneNumberRegister}
                setIsVerified={setIsVerified}
                setPasswordRegister={setPasswordRegister}
                phoneNumberRegister={phoneNumberRegister}
                passwordRegister={passwordRegister}
              />
            ) : (
              <ShopSignIn setIsSignIn={setIsSignIn} />
            )}
          </>
        ) : (
          <ShopInformation
            phoneNumberRegister={phoneNumberRegister}
            passwordRegister={passwordRegister}
            setIsVerified={setIsVerified}
            setIsSignIn={setIsSignIn}
          />
        )}

      </div>
    </div>
  )
}

export default ShopLogin
