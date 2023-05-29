import React from "react"
import { useState } from "react"
function MainLogin() {
  const [isSignIn, setIsSignIn] = useState(true)
  const handleChangeSignState = () => {
    setIsSignIn(!isSignIn)
  }
  return (
    <div className=" py-8 bg-gradient-to-r from-sky-500 via-blue-500 to-sky-500 border-gray-200 ">
      <div className="flex flex-wrap  mx-auto">
        <div className="lg:w-1/2 sm:w-full flex flex-col justify-center items-center ">
          <div className="h-12 mb-5">
            <img
              src="/assets/images/logo-white.png"
              className="h-full"
              alt="Flowbite Logo"
            />
          </div>
          <h1 className="text-violet-600	 font-normal tracking-wide	 text-3xl text-center">
            Welcome to Birdy!
            <br /> A bird trading platform
          </h1>
        </div>
        <div className="lg:w-1/2 sm:w-full p-5 sm:mx-auto">
          <form className="lg:w-1/2 sm:w-full bg-white p-10 rounded-md">
            <h1 className="text-3xl mb-4">
              {isSignIn ? "Sign in" : "Sign up"}
            </h1>
            <div className="mb-4">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Email/Phone number"
                className="w-full border-gray-300 border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="w-full border-gray-300 border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <button
              type="submit"
              className="bg-orange-400	w-full my-2 text-white px-4 py-2 rounded hover:bg-white hover:text-orange-400 hover:border-orange-400 hover:outline outline-1 focus:outline-none focus:bg-blue-600"
            >
              {isSignIn ? "Sign in" : "Sign up"}
            </button>
            <div className="flex justify-between items-center mb-4">
              <a href="#" className="text-blue-500 text-sm hover:underline">
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
                  onClick={handleChangeSignState}
                >
                  {isSignIn ? "Sign in" : "Sign up"}
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MainLogin
