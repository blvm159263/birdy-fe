import axiosClient from "./axiosClient";

const adminApi = {
    getAllProducts(params) {
        const url = '/admin/products'
        return axiosClient.get(url, { params }  )
    },
    approveProductById(id) {
        const url = `/admin/product/${id}/update`;
        return axiosClient.get(url);
    },
};

export default adminApi;