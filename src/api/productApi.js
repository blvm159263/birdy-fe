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
    get(id) {
        const url = `/admin/products/${id}`
        return axiosClient.get(url);
    },
    add(data) {
        const url = '/admin/products/create'
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = `/admin/products/update/${data.productId}`
        return axiosClient.put(url, data);
    },
    remove(id) {
        const url = `/admin/products/delete/${id}`
        return axiosClient.delete(url);
    },
    getAllByPage(params) {
        const url = '/admin/products/'
        return axiosClient.get(url, { params })
    },
    getTotal() {
        const url = '/admin/products/total'
        return axiosClient.get(url)
    },
    getByPageAndName(params) {
        const url = '/admin/products/name'
        return axiosClient.get(url, { params })
    }
};

export default productApi;