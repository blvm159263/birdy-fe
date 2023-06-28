import axiosClient from "./axiosClient";

const authApi = {
    registerUser(data) {
        const url = '/auth/user/register'
        return axiosClient.post(url, data);
    },
    registerShop(data) {
        const url = '/auth/shop/register'
        return axiosClient.post(url, data);
    },
    login(data) {
        const url = '/auth/authenticate'
        return axiosClient.post(url, data);
    }
};

export default authApi;