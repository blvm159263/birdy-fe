import axiosClient from "./axiosClient"

const orderApi = {
  getShipmentPrice(params) {
    const url = "/orders/shipment-price"
    return axiosClient.get(url, { params })
  },
  createOrder(data) {
    const url = "/orders"
    return axiosClient.post(url, data)
  },
  getAllOrderByUserId(id) {
    const url = `/orders/user/` + id
    return axiosClient.get(url)
  },
}

export default orderApi
