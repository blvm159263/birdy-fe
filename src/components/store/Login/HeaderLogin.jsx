import React from "react"
import { Link } from "react-router-dom"
function HeaderLogin() {
  return (
    <div className=" my-10">
      <Link to="/" className="block ml-10">
        <div className="self-center">
          <h1 className="text-2xl  font-semibold text-sky-400">Birdy</h1>
        </div>
      </Link>
    </div>
  )
}

export default HeaderLogin
