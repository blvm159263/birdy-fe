import React from "react"

export default function Footer() {
  return (
    <div className="footer py-10">
      <div className="container mx-auto lg:flex md:flex justify-between lg:flex-row md:flex-row">
        <div className="links lg:w-1/3 sm:w-full mb-4 sm: pl-5">
          <h1 className="font-bold text-xl">Quick Links</h1>
          <div className="my-5">
            <a className="text-md" href="">
              Privacy Policy
            </a>
          </div>
          <div className="my-5 ">
            <a href="">Return Policy</a>
          </div>
          <div className="my-5">
            <a href="">Term of Service</a>
          </div>
          <div className="my-5">
            <a href="">Contact</a>
          </div>
        </div>
        <div className="contact lg:w-1/3 sm: w-full sm: mb-4 sm: pl-5">
          <h1 className="font-bold text-xl">Contact Us</h1>
          <div className="flex mt-6">
            <img
              src="assets/images/location-log.png"
              alt=""
              className="w-4 h-5 mt-1 mr-1"
            />
            <p className=" ml-1">
              FPTU, District 9, <br /> Thu Duc City, Ho Chi Minh City
            </p>
          </div>
          <div className="flex mt-6">
            <img
              src="assets/images/phone-logo.png"
              alt=""
              className="w-4 h-4 mt-1 mr-1"
            />
            <p className="ml-1">123-456-7890</p>
          </div>
          <div className="flex mt-6">
            <img
              src="assets/images/letter-logo.png"
              alt=""
              className="w-5 h-4 mt-1 mr-1"
            />
            <p className=" ml-1">Support@gmail.com</p>
          </div>
        </div>
        <div className="payment lg:w-1/3 sm:w-full sm: pl-5">
          <h1 className="text-xl font-bold mb-7 ">We Accept</h1>
          <div className="pay-img flex flex-wrap">
            <img
              src="assets/images/visa.png"
              alt=""
              className=" w-15 h-10 mr-12 mb-7 "
            />
            <img
              src="assets/images/discover.png"
              alt=""
              className="w-15 h-10 mr-12 mb-7"
            />
            <img
              src="assets/images/american-express.png"
              alt=""
              className="w-15 h-10 mr-12 mb-7"
            />
            <img
              src="assets/images/mastercard.png"
              alt=""
              className="w-15 h-10 mr-12 mb-7"
            />

            <img
              src="assets/images/jcb.png"
              alt=""
              className="w-15 h-10 mr-12 mb-7"
            />
            <img
              src="assets/images/payment.png"
              alt=""
              className="w-15 h-10 mr-12 mb-7"
            />
            <img
              src="assets/images/paypal.png"
              alt=""
              className="w-15 h-10 mr-12 mb-7"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
