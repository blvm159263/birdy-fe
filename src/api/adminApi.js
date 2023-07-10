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
    getAllYears() {
        const url = `/admin/chart/all-years`;
        return axiosClient.get(url);
    },
    getChartDataByYear(year) {
        const url = `/admin/chart/data/${year}`;
        return axiosClient.get(url);
    }
};

export default adminApi;