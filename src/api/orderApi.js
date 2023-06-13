import axiosClient from "./axiosClient"

const orderApi = {
  getOrderByUserId(id) {
    const url = `/order/users/` + id
    return axiosClient.get(url)
  },
}

export default orderApi
