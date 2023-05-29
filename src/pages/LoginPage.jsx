import React from "react"
import Footer from "../components/Footer"
import MainLogin from "../components/store/Login/MainLogin"
import HeaderLogin from "../components/store/Login/HeaderLogin"

function LoginPage() {
  return (
    <div>
      <HeaderLogin />
      <MainLogin />
      <Footer />
    </div>
  )
}

export default LoginPage
