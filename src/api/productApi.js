import axiosClient from "./axiosClient";

const productApi = {
    getLandingPageProducts(params) {
        const url = '/products/landing-page'
        return axiosClient.get(url, { params })
    },
    getAll(params) {
        let url = '/products/view'
        if (params.id !== undefined) url = '/categories/' + params.id + url;
        return axiosClient.get(url, { params })
    },
    getAllAscending(params) {
        let url = '/products/view/price-asc'
        if (params.id !== undefined) url = '/categories/' + params.id + url;
        return axiosClient.get(url, { params })
    },
    getAllDescending(params) {
        let url = '/products/view/price-desc'
        if (params.id !== undefined) url = '/categories/' + params.id + url;
        return axiosClient.get(url, { params })
    },
    getAllLatest(params) {
        let url = '/products/view/latest'
        if (params.id !== undefined) url = '/categories/' + params.id + url;
        return axiosClient.get(url, { params })
    },
    getProductById(id) {
        const url = `/products/${id}`
        return axiosClient.get(url);
    },
    addNewProduct(params) {
        const data = new FormData();
        data.append('productDTO', params.productDTO);
        data.append('mainImage', params.mainImage);
        params.subImages.forEach((image) => {
            data.append('subImages', image);
        });        
        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        };
        const url = '/products/create'
        return axiosClient.post(url, data, config);
    },
    // test(params) {
    //     const data = new FormData();
    //     data.append('mainImage', params);
    //     const config = {
    //         headers: {
    //             'Content-type': 'multipart/form-data',
    //         },
    //     };
    //     const url = '/products/test'
    //     return axiosClient.post(url, data, config);
    // }
    test(params) {
        const data = new FormData();
        data.append('productDTO', params.productDTO);
        data.append('mainImage', params.mainImage);
        params.subImages.forEach((image) => {
            data.append('subImages', image);
        });        
        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        };
        const url = '/products/test'
        return axiosClient.post(url, data, config);
    }

};

export default productApi;