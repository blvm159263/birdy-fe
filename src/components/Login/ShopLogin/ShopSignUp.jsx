import React from "react"

function ShopSignUp({ isSignIn, setIsSignIn }) {
  return (
    <div className="w-1/2 px-20 py-5">
      <form className="bg-white p-5 flex flex-col items-center rounded-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <input
          className="w-4/5 p-2 mb-4 border border-gray-200 rounded-md"
          type="text"
          placeholder="Your phone number"
        />
        <input
          className="w-4/5 p-2 mb-4 border border-gray-200 rounded-md"
          type="text"
          placeholder="Your password"
        />
        <button className="w-4/5 bg-orange-400 border mb-2 py-2 rounded-md text-white hover:bg-white hover:text-orange-400 hover:border-orange-400">
          Sign Up
        </button>

        <div className="flex w-full mt-2 items-center mb-2">
          <div className="w-2/5 h-1 bg-gray-100"></div>
          <p className="w-1/5 d-block text-center">OR</p>
          <div className="w-2/5 h-1 bg-gray-100"></div>
        </div>
        <button className="w-4/5 bg-white border mt-2 mb-2 py-2 rounded-md text-black-400 hover:bg-white hover:text-orange-400 hover:border-orange-400">
          Google
        </button>
        <div className="flex justify-between mt-2">
          <p className="mr-2">You already have an account? </p>
          <button
            onClick={() => setIsSignIn(true)}
            className="text-orange-400 hover:text-orange-500"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  )
}

export default ShopSignUp
