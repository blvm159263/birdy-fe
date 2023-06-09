import axiosClient from "./axiosClient";

const productApi = {
    getLandingPageProducts(params) {
        const url = '/products/landing-page'
        return axiosClient.get(url, { params })
    },
    getAll(params) {
        const url = '/products/view'
        return axiosClient.get(url, { params })
    },
    getAllAscending(params) {
        const url = '/products/view/price-asc'
        return axiosClient.get(url, { params })
    },
    getAllDescending(params) {
        const url = '/products/view/price-desc'
        return axiosClient.get(url, { params })
    },
    getAllLatest(params) {
        const url = '/products/view/latest'
        return axiosClient.get(url, { params })
    },
    getProductById(id) {
        const url = `/products/${id}`
        return axiosClient.get(url);
    },
    addNewProduct(params) {
        const url = '/products/create'
        return axiosClient.post(url, params);
    },
};

export default productApi;