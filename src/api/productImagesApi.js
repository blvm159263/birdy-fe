import axiosClient from "./axiosClient";

const productImagesApi = {
  getProductImagesByProductId(id) {
    const url = `/product-images/${id}`;
    return axiosClient.get(url);
  },
}

export default productImagesApi;