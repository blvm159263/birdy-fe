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
    getProductReview(productId, params) {
        const url = `/products/review/${productId}`
        return axiosClient.get(url, { params });
    },
    deleteProduct(productId) {
        const url = `/products/delete/${productId}`
        return axiosClient.delete(url);
    },
    getAllFeaturedProduct(params) {
        const url = `/products/view/all`;
        return axiosClient.get(url, { params });
    },
    cancelAllOrdersAndUpdateProductById(id, params) {
        const data = new FormData();
        data.append('productDTO', params.productDTO);
        data.append('mainImage', params.mainImage);
        if (params.subImages) {
            params.subImages.forEach((image) => {
                data.append('subImages', image);
            });
        }
        data.append('objects', params.objects);

        const url = `/products/update/${id}`;
        return axiosClient.put(url, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    hideOldProductByIdAndCreateNewProduct(id, params) {
        const data = new FormData();
        data.append('productDTO', params.productDTO);
        data.append('mainImage', params.mainImage);
        if (params.subImages) {
            params.subImages.forEach((image) => {
                data.append('subImages', image);
            });
        }
        data.append('objects', params.objects);

        const url = `/products/update-new/${id}`;
        return axiosClient.put(url, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    checkIfProductHaveOrderById(id) {
        const url = `/products/check-product/${id}`;
        return axiosClient.get(url);
    },
    hideProductById(id) {
        const url = `/products/hide/${id}`;
        return axiosClient.patch(url);
    },
    showProductById(id) {
        const url = `/products/show/${id}`;
        return axiosClient.patch(url);
    }
};

export default productApi;