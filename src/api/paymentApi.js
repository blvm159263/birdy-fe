import axiosClient from "./axiosClient";

const paymentApi = {
    getQRMomo(params) {
        const url = '/payment/momo';
        return axiosClient.get(url, {params});
    }
};

export default paymentApi;