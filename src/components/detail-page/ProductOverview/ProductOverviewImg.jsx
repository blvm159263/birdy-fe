import { Image } from "antd";
import React, { useEffect, useState } from "react";
import productImagesApi from "../../../api/productImagesApi.js";

function ProductOverviewImg({ product }) {
  const [productImages, setProductImages] = useState(null);

  useEffect(() => {
    productImagesApi
      .getProductImagesByProductId(product.id)
      .then((response) => {
        setProductImages(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="col-span-12 lg:col-span-6">
      <Image
        width="100%"
        height="50vh"
        className="object-cover"
        src={product.imageMain}
        alt={product.productName}
      />
      <div className="flex gap-2">
        {productImages && productImages.map((image) => (
          <Image
            key={image.imgUrl}
            width="100%"
            height="10vh"
            className="object-cover max-w-[120px]"
            src={image.imgUrl}
            alt={product.productName}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductOverviewImg;
