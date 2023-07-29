import axiosClient from "./axiosClient";

const shopApi = {
    getShopInformationByShopId(id) {
        const url = '/shops/' + id;
        return axiosClient.get(url);
    },
    getShopInformationByPhoneNumber(phoneNumber) {
        const url = '/shops/phone-number/' + phoneNumber;
        return axiosClient.get(url);
    },
    getShopDetailByShopId(id) {
        const url = '/shops/detail/' + id;
        return axiosClient.get(url);
    },

    getShopProductsByShopIdForShop(id, param) {
        const url = '/shops/' + id + '/products/management';
        return axiosClient.get(url, param);
    },
    searchShopByName(params) {
        const url = '/shops/search';
        return axiosClient.get(url, { params });
    },
    getLatestShopProductsByShopId(id, params) {
        const url = `/shops/${id}/products/latest`;
        return axiosClient.get(url, { params });
    },
    getShopProductsByShopIdAndCategoryId(id, categoryId, params) {
        const url = `/shops/${id}/products/category/${categoryId}`;
        return axiosClient.get(url, { params });
    },
    getShipmentByShopId(id) {
        const url = '/shops/shipment/' + id;
        return axiosClient.get(url);
    },
    getShopOrders(id, params) {
        const url = '/shops/' + id + '/orders';
        return axiosClient.get(url, { params });
    },
    editProfile(id, params) {
        const data = new FormData();
        data.append('shopName', params.shopName);
        data.append('address', params.address);
        data.append('shopImage', params.shopImage);
        const url = '/shops/' + id + "/update";
        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        };
        return axiosClient.patch(url, data, config);
        return axiosClient.get(url);
    },
    searchShopByNameAndStatus(status, params) {
        const url = `/shops/${status}/view`;
        return axiosClient.get(url, { params });
    },
    getAllShopProducts(id, params) {
        const url = `/shops/${id}/products`;
        return axiosClient.get(url, { params });
    },
    getDefaultIncomeByShopId(id) {
        const url = `/shops/${id}/income/default`;
        return axiosClient.get(url);
    },
    getIncomeByShopIdAndDateRange(id, startDate, endDate) {
        const url = `/shops/${id}/income?startDate=${startDate}&endDate=${endDate}`;
        // const params = {
        //     startDate: startDate,
        //     endDate: endDate
        // }
        console.log('url', url);
        return axiosClient.get(url);
    },
    updateShipmentByShopIdAndShipmentType(shopId, shipmentTypeId, price) {
        const url = `/shops/${shopId}/shipment/update?shipmentTypeId=${shipmentTypeId}&price=${price}`;
        return axiosClient.patch(url);
    }
}

export default shopApi;