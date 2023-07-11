export default function AdminLoginPage() {
  return (
    <div className=" py-8 bg-gradient-to-r from-sky-500 via-blue-500 to-sky-500 border-gray-200 ">
      <div className="container grid grid-cols-2 mx-auto">
        <div className="flex flex-col justify-center items-center">
          <div className="h-12 mb-5">
            <img
              src="/assets/images/logo-white.png"
              className="h-full"
              alt="Flowbite Logo"
            />
          </div>
          <h1 className="text-violet-600	 font-normal tracking-wide	 text-3xl text-center ">
            Welcome to Birdy!
            <br /> A bird trading platform
          </h1>
        </div>
        <div>
          form
        </div>

      </div>
    </div>
  )
}