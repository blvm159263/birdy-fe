import axiosClient from "./axiosClient";

const shopApi = {
    getShopInformationByShopId(id) {
        const url = '/shops/' + id;
        return axiosClient.get(url);
    },

    getShopDetailByShopId(id) {
        const url = '/shops/detail/' + id;
        return axiosClient.get(url);
    },

    getShopProductsByShopIdForShop(id, param) {
        const url = '/shops/' + id + '/products/management';
        return axiosClient.get(url, param);
    },
    searchShopByName(params) {
        const url = '/shops/search';
        return axiosClient.get(url, {params});
    },
    getLatestShopProductsByShopId(id, params) {
        const url = `/shops/${id}/products/latest`;
        return axiosClient.get(url, {params});
    },
    getShopProductsByShopIdAndCategoryId(id, categoryId, params) {
        const url = `/shops/${id}/products/category/${categoryId}`;
        return axiosClient.get(url, {params});
    },
    getShipmentByShopId(id) {
        const url = '/shops/shipment/' + id;
        return axiosClient.get(url);
    },
    getShopOrders(id, params){
        const url = '/shops/' + id + '/orders';
        return axiosClient.get(url, {params}); 
    }
}

export default shopApi;