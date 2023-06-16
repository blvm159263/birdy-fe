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
        const url = '/shops/' + id + '/products/true';
        return axiosClient.get(url, param);
    },

    getShopOrders(id){
        const url = '/shops/' + id + '/orders';
        return axiosClient.get(url); 
    }
}

export default shopApi;