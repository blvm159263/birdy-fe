import React, { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setGender } from "../../../features/user/userSlice"
import isLoadingPage from "../../loading/isLoadingPage"
import userApi from "../../../api/userApi"
import { Radio } from "antd"
import { NotificationContext } from "../../../context/NotificationProvider"

function UserInfor({ isLoading }) {
  const userInformation = useSelector((state) => state.user.userInformation)
  const openNotificationWithIcon = useContext(NotificationContext)

  const [user, setUser] = useState({
    id: null,
    accountId: "",
    fullName: "",
    email: "",
    dob: "",
    createDate: "",
    gender: null,
    avatarUrl: null,
    phoneNumber: "",
  })

  useEffect(() => {
    if (userInformation) {
      setUser((prevUser) => ({
        ...prevUser,
        id: userInformation.id || "",
        accountId: userInformation.accountId || "",
        fullName: userInformation.fullName || "",
        email: userInformation.email || "",
        dob: userInformation.dob || "",
        createDate: userInformation.createDate || "",
        gender: userInformation.gender || null,
        avatarUrl: userInformation.avatarUrl || null,
        phoneNumber: userInformation.phoneNumber || "",
      }))
    }
    console.log("userApi", userInformation)
  }, [userInformation])

  const handleChange = (evt) => {
    const { value, name } = evt.target

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
      gender: value,
    }))

    console.log("update", user)
    console.log("update", user.gender)
    // console.log(typeof value, name)
  }

  const updateUser = (user) => {
    userApi
      .updateUserInformation(user)
      .then((response) => {
        console.log(response.data)
        setTimeout(() => {
          openNotificationWithIcon("Update Information completed !!!")
        }, 500)
      })
      .catch((e) => console.log(e))
  }

  useEffect(() => {
    setUser(user)
    console.log("newUser", user)
  }, [user])

  const handleUpdateInfor = (e) => {
    e.preventDefault()
    updateUser(user)
  }

  return (
    <div className="w-5/6 bg-white">
      <h1 className="py-6 text-center text-2xl font-bold">Your Information</h1>
      <hr />
      {isLoading ? (
        <isLoadingPage />
      ) : (
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
                    <p>{user.email}</p>
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
                      id="fullName"
                      value={user.fullName}
                      onChange={handleChange}
                      name="fullName"
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

                  <>
                    <Radio.Group
                      value={user.gender}
                      buttonStyle="solid"
                      onChange={handleChange}
                    >
                      <Radio.Button value={1}>Male</Radio.Button>
                      <Radio.Button value={2}>Female</Radio.Button>
                      <Radio.Button value={3}>Other</Radio.Button>
                    </Radio.Group>
                  </>
                </tr>
              </tbody>
            </table>
            <button
              onClick={handleUpdateInfor}
              className="px-3 py-1 border-2 border-sky-500 rounded-md bg-sky-500 text-white hover:border-white"
            >
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default UserInfor
