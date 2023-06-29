import axiosClient from "./axiosClient"

const wishlistApi = {
  getUserById(id) {
    const url = `/users/` + id
    return axiosClient.get(url)
  },
  
}

export default wishlistApi
