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
  getUserByPhoneNumber(data) {
    const url = "/users/phone/" + data
    return axiosClient.get(url)
  },
  getDefaultAddress(data) {
    const url = `/users/${data}/address-default`
    return axiosClient.get(url)
  },
  getAllAddress(data) {
    const url = `/users/${data}/addresses`
    return axiosClient.get(url)
  },
  addAddress(data) {
    const url = `/users/${data.userId}/addresses`
    return axiosClient.post(url, data)
  },
  updateAddress(id, params) {
    const url = `/addresses/addresses/` + id
    return axiosClient.put(url, params)
  },
}

export default userApi
