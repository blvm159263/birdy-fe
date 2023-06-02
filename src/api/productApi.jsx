import axiosClient from "./axiosClient";

const productApi = {
    getLadingPage() {
        const url = '/products/lading-page'
        return axiosClient.get(url)
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