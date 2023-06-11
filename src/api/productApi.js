import axiosClient from "./axiosClient";

const productApi = {
    getLandingPageProducts(params) {
        const url = '/products/landing-page'
        return axiosClient.get(url, { params })
    },
    getAll(params) {
        let url = '/products/view'
        if (params.id !== undefined) url = '/categories/' + params.id + url;
        return axiosClient.get(url, { params })
    },
    getAllAscending(params) {
        let url = '/products/view/price-asc'
        if (params.id !== undefined) url = '/categories/' + params.id + url;
        return axiosClient.get(url, { params })
    },
    getAllDescending(params) {
        let url = '/products/view/price-desc'
        if (params.id !== undefined) url = '/categories/' + params.id + url;
        return axiosClient.get(url, { params })
    },
    getAllLatest(params) {
        let url = '/products/view/latest'
        if (params.id !== undefined) url = '/categories/' + params.id + url;
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
    getProductReview(productId, params) {
        const url = `/products/review/${productId}`
        return axiosClient.get(url, { params });
    }
};

export default productApi;