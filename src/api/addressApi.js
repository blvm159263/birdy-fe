import axiosClient from "./axiosClient";

const addressApi = {
    getAddressById(data) {
        const url = '/addresses/' + data;
        return axiosClient.get(url);
    },

};

export default addressApi;