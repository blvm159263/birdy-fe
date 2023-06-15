import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setGender } from "../../../features/user/userSlice"

function UserInfor() {
  const userInformation = useSelector((state) => state.user.userInformation)
  const dispatch = useDispatch()
  const handleSaveInformation = (e) => [e.preventDefault()]

  return (
    <div className="w-5/6 bg-white">
      <h1 className="py-6 text-center text-2xl font-bold">Your Information</h1>
      <hr />
      <div>
        <form className="py-10 px-16">
          <table className="table-auto border-separate border-spacing-y-4">
            <tbody>
              <tr>
                <td>
                  <label className="text-gray-500 mr-20" htmlFor="">
                    Nickname
                  </label>
                </td>
                <td>
                  <p>{userInformation && userInformation.email}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="text-gray-500 mr-20" htmlFor="username">
                    Username
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    id="username"
                    value={userInformation && userInformation.fullName}
                    className="border rounded-md"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="text-gray-500 mr-20" htmlFor="">
                    Email
                  </label>
                </td>
                <td>
                  <p>{userInformation && userInformation.email}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="text-gray-500 mr-20" htmlFor="">
                    Phone
                  </label>
                </td>
                <td>
                  <p>{userInformation && userInformation.phoneNumber}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="text-gray-500 mr-20" htmlFor="gender">
                    Gender
                  </label>
                </td>
                <td className="flex">
                  <input
                    type="radio"
                    name="gender"
                    value="1"
                    id="male"
                    className="mr-3"
                  />{" "}
                  <label className="mr-4" htmlFor="male">
                    Male
                  </label>
                  <input
                    type="radio"
                    name="gender"
                    className="mr-3"
                    value="2"
                    id="female"
                  />{" "}
                  <label className="mr-4" htmlFor="female">
                    Female
                  </label>
                  <input
                    type="radio"
                    name="gender"
                    id="other"
                    className="mr-3"
                  />
                  <label htmlFor="other">Other</label>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={handleSaveInformation}
            className="px-3 py-1 border-2 border-sky-500 rounded-md bg-sky-500 text-white hover:border-white"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserInfor
