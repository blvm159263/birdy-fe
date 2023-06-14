import axiosClient from "./axiosClient";

const userApi = {
    getUserByPhoneNumber(data) {
        const url = '/users/phone/' + data;
        return axiosClient.get(url);
    },
    getDefaultAddress(data) {
        const url = `/users/${data}/address-default`;
        return axiosClient.get(url);
    }
};

export default userApi;