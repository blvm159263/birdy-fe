import axiosClient from "./axiosClient";

const adminApi = {
    getAllProducts(params) {
        const url = '/admin/products'
        return axiosClient.get(url, { params }  )
    },
    declineProductById(id) {
        const url = `/admin/product/${id}/decline`;
        return axiosClient.get(url);
    },
    approveProductById(id) {
        const url = `/admin/product/${id}/approve`;
        return axiosClient.get(url);
    },
};

export default adminApi;