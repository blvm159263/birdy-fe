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

  getWishlistByUserId(userId) {
    const url = `/wishlists/user/${userId}`
    return axiosClient.get(url)
  },

  getWishlist(userId, productId) {
    const url = `/users/${userId}/wishlist/${productId}`
    return axiosClient.get(url)
  },
  addWishlist(userId, productId) {
    const url = `/users/${userId}/wishlist/${productId}`
    return axiosClient.post(url)
  },
  deleteWishlist(userId, productId) {
    const url = `/users/${userId}/wishlist/${productId}`
    return axiosClient.delete(url)
  },
  updateAddress(params) {
    const url = `/addresses/`
    return axiosClient.put(url, params)
  },
  updateUserInformation(params) {
    const url = `/users`
    console.log(params)
    return axiosClient.put(url, params)
  },
}

export default userApi
