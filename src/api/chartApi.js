import axiosClient from "./axiosClient";

const chartApi = {
    getChartProduct(id, year) {
        const url = `/shops/${id}/chart-product/${year}`;
        return axiosClient.get(url);
    },
    getAllYearsProduct(id) {
        const url = `/shops/${id}/chart-product/all-years`;
        return axiosClient.get(url);
    },
    getChartOrder(id, year) {
        const url = `/shops/${id}/chart-order/${year}`;
        return axiosClient.get(url);
    },
    getAllYearsOrder(id) {
        const url = `/shops/${id}/chart-order/all-years`;
        return axiosClient.get(url);
    }

}

export default chartApi;