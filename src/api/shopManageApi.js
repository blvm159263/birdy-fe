import axiosClient from "./axiosClient"

const shopManageApi = {
  getShopProductsByShopIdForShopManage(id, params) {
    const url = "/shops/" + id + "/products/management"
    return axiosClient.get(url, { params })
  },
  getLatestShopProductsByShopIdForShopManage(id, params) {
    const url = `/shops/${id}/products/latest/management`
    return axiosClient.get(url, {params})
  },
  getShopProductsByShopIdAndCategoryIdForShopManage(id, categoryId, params) {
    const url = `/shops/${id}/products/category/${categoryId}/management`
    return axiosClient.get(url, { params })
  },
}

export default shopManageApi
