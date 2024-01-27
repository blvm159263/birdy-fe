import axiosClient from "./axiosClient";

const accountApi = {
    checkPhoneExist(params) {
        const url = '/accounts/check-phone-number'
        return axiosClient.get(url, { params }  )
    },
    register(data) {
        const url = '/accounts/register'
        return axiosClient.post(url, data);
    },
    get(id) {
        const url = `/admin/products/${id}`
        return axiosClient.get(url);
    },
    add(data) {
        const url = '/admin/products/create'
        return axiosClient.post(url, data);
    },
    updatePassword(params) {
        const url = '/accounts/password'
        return axiosClient.put(url, params);
    }
};

export default accountApi;