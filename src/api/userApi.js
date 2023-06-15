import axiosClient from "./axiosClient"

const userApi = {
  getUserById(id) {
    const url = `/users/` + id
    return axiosClient.get(url)
  },
  getAllUserAddress(id) {
    const url = `/users/` + id + `/addresses`
    return axiosClient.get(url)
  },
  addNewAddress(id, params) {
    const url = `/users/` + id + `/addresses`
    return axiosClient.post(url, params)
  },
}

export default userApi
