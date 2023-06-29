import axiosClient from "./axiosClient"

const shopManageApi = {
  getShopProductsByShopIdForShopManage(id, params) {
    const url = "/shops/" + id + "/products/management"
    return axiosClient.get(url, { params })
  },
}

export default shopManageApi
