import axiosClient from "./axiosClient";

const paymentApi = {
    getQRMomo(params) {
        const url = '/payment/momo';
        return axiosClient.get(url, {params});
    },
    getQRMomoIndividual(params) {
        const url = '/payment/momo/individual';
        return axiosClient.get(url, {params});
    },
    getQRMomoRecharge(params) {
        const url = '/payment/momo/recharge';
        return axiosClient.get(url, {params});
    }
};

export default paymentApi;