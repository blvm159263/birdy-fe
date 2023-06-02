import React from "react"
import { useState } from "react"
import validator from 'validator'
import authApi from "../../api/authApi";

function SignIn({ setIsSignIn }) {
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const validationPhoneNumber = () => {
    setIsValidPhoneNumber(validator.isMobilePhone(phoneNumber, 'vi-VN'));
  }

  const formatPhoneNumber = (number) => {

    if (phoneNumber.startsWith("+84")) {
      number = "0" + number.substr(3);
    }
    return number;
  }

  const onSignIn = () => {
    validationPhoneNumber();
    if (isValidPhoneNumber) {
      authApi.login(formatPhoneNumber(phoneNumber), password)
        .then(res => {
          if (res.status === 200) {

          } else if (res.status === 403) {

          }
        })
    }
  }

  const handleEntailmentRequest = (e) => {
    e.preventDefault();
}

  return (
    <div className="lg:w-1/2 sm:w-full p-5 sm:mx-auto">
      <form className="lg:w-1/2 sm:w-full bg-white p-10 rounded-md">
        <h1 className="text-3xl mb-4">
          Sign In
        </h1>
        <div className="mb-4">
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Email/Phone number"
            className="w-full border-gray-300 border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {isValidPhoneNumber ? "" : <div className="text-rose-600">Invalid Phone Number !</div>}
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
          onClick={(e)=>{
            handleEntailmentRequest(e);
            onSignIn();
          }}
        >
          Sign In
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

export default SignIn;