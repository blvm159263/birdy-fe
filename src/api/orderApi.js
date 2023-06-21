import axiosClient from "./axiosClient";

const orderApi = {
    getShipmentPrice(params) {
        const url = '/orders/shipment-price';
        return axiosClient.get(url, { params });
    },
    createOrder(data) {
        const url = '/orders';
        return axiosClient.post(url, data);
    },
    getAllOrderByUserId(id) {
        const url = `/order/users/` + id
        return axiosClient.get(url)
    },
    getAllOrderDetailsByOrderId(id) {
        const url = `orders/order-detail/` + id
        return axiosClient.get(url)
    },
    editOrderState(id, state) {
        const url = `/orders/edit/${id}?state=${state}`
        return axiosClient.patch(url)
    }
};

export default orderApi;
