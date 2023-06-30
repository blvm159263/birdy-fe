import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setGender } from "../../../features/user/userSlice"
import isLoadingPage from "../../loading/isLoadingPage"
import userApi from "../../../api/userApi"

function UserInfor({ isLoading }) {
  const userInformation = useSelector((state) => state.user.userInformation)
  const dispatch = useDispatch()
  const [selectedGender, setSelectedGender] = useState(null)
  const handleSaveInformation = (e) => [e.preventDefault()]
  // console.log(userInformation)

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
      setSelectedGender(parseInt(userInformation.gender, 10))
      setUser((prevUser) => ({
        ...prevUser,
        id: userInformation.id || "",
        accountId: userInformation.accountId || "",
        fullName: userInformation.fullName || "",
        email: userInformation.email || "",
        dob: userInformation.dob || "",
        createDate: userInformation.createDate || "",
        gender: parseInt(userInformation.gender, 10) || null,
        avatarUrl: userInformation.avatarUrl || null,
        phoneNumber: userInformation.phoneNumber || "",
      }))
    }
    console.log(userInformation)
  }, [userInformation])

  const handleChange = (evt) => {
    const { value, name } = evt.target

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }))

    console.log("update", user)
    // console.log(typeof value, name)
  }

  const handleResetForm = () => {
    setUser({
      id: "",
      accountId: "",
      fullName: "",
      email: "",
      dob: "",
      createDate: "",
      gender: null,
      avatarUrl: null,
      phoneNumber: "",
    })
  }

  const updateUser = (user) => {
    userApi
      .updateUserInformation(user)
      .then((response) => console.log(response.data))
      .catch((e) => console.log(e))
  }

  useEffect(() => {
    setUser(user)
    // console.log(user)
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
                  {/* <td className="flex">
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
                  </td> */}
                  {/* <td className="flex">
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value={1}
                      className="mr-3"
                      checked={selectedGender === "1"}
                      onChange={handleChange}
                    />
                    <label className="mr-4" htmlFor="male">
                      Male
                    </label>
                    <input
                      type="radio"
                      name="gender"
                      value={2}
                      className="mr-3"
                      id="female"
                      checked={selectedGender === "2"}
                      onChange={handleChange}
                    />
                    <label className="mr-4" htmlFor="female">
                      Female
                    </label>
                    <input
                      type="radio"
                      name="gender"
                      value={3}
                      id="other"
                      className="mr-3"
                      checked={selectedGender === "3"}
                      onChange={handleChange}
                    />
                    <label htmlFor="other">Other</label>
                  </td> */}
                  <select
                    name="gender"
                    value={selectedGender}
                    onChange={handleChange}
                    className="border rounded-md"
                  >
                    <option value={0} disabled>
                      Select Gender
                    </option>
                    <option value={1}>Male</option>
                    <option value={2}>Female</option>
                    <option value={3}>Other</option>
                  </select>
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
