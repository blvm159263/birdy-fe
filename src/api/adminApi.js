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
    },
    getAllProductReports() {
        const url = `/admin/reports`;
        return axiosClient.get(url);
    },
    getReportsByProductId(id) {
        const url = `/admin/report/${id}`;
        return axiosClient.get(url);
    },
    warningProductById(id) {
        const url = `/admin/product/${id}/warning`;
        return axiosClient.patch(url);
    },
    authenticate(username, password) {
        const data = new FormData();
        data.append('username', username);
        data.append('password', password);
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };
        const url = '/admin/sign-in'
        return axiosClient.post(url, data, config);
    },
    banProductById(id) {
      const url = `/admin/product/${id}/banned`;
      return axiosClient.patch(url);
    },
    getAdminDefaultIncome() {
        const url = `/admin/income/default`;
        return axiosClient.get(url);
    },
    getAdminIncomeByRange(startDate, endDate) {
        const url = `/admin/income`;
        const params = {
            start: startDate,
            end: endDate
        }
        return axiosClient.get(url, {params});
    }
};

export default adminApi;