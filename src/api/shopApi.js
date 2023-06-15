import axiosClient from "./axiosClient";

const shopApi = {
    getShopInformationByShopId(id) {
        const url = '/shops/' + id;
        return axiosClient.get(url);
    },
    getShipmentByShopId(id) {
        const url = '/shops/shipment/' + id;
        return axiosClient.get(url);
    }
}

export default shopApi;