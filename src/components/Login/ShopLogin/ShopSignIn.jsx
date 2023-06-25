import React from "react"

function ShopSignIn({ isSignIn, setIsSignIn }) {
  return (
    <div className="w-1/2 px-20 py-5">
      <form className="bg-white p-5 flex flex-col items-center rounded-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        <input
          className="w-4/5 p-2 mb-4 border border-gray-200 rounded-md"
          placeholder="Your phone number"
          type="text"
        />
        <input
          className="w-4/5 p-2 mb-4 border border-gray-200 rounded-md"
          placeholder="Your password"
          type="text"
        />
        <button className="w-4/5 bg-orange-400 border mb-2 py-2 rounded-md text-white hover:bg-white hover:text-orange-400 hover:border-orange-400">
          Sign In
        </button>
        <a className="text-blue-400 hover:text-blue-500 cursor-pointer mb-2">
          Forget password?
        </a>
        <div className="flex w-full items-center mb-2">
          <div className="w-2/5 h-1 bg-gray-100"></div>
          <p className="w-1/5 d-block mt-2 text-center">OR</p>
          <div className="w-2/5 h-1 bg-gray-100"></div>
        </div>
        <button className="w-4/5 bg-white border mt-2 mb-2 py-2 rounded-md text-black-400 hover:bg-white hover:text-orange-400 hover:border-orange-400">
          Google
        </button>
        <div className="flex justify-between mt-2">
          <p className="mr-2">You don't have an account? </p>
          <button
            onClick={() => setIsSignIn(false)}
            className="text-orange-400 hover:text-orange-500"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  )
}

export default ShopSignIn
