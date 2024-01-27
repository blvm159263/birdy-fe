import {Image, Modal} from "antd";
import React, { useEffect, useState } from "react";
import productImagesApi from "../../../api/productImagesApi.js";

function ProductOverviewImg({ product }) {
  const [productImages, setProductImages] = useState(null);
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(product.imageMain);

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
        src={selectedImageUrl}
        alt={product.productName}
      />
      <div className="flex gap-2">
        {productImages && productImages.map((image) => (
          <Image
            key={image.imgUrl}
            width="100%"
            height="10vh"
            className="object-cover max-w-[120px] hover:brightness-110 hover:scale-110 duration-100 active:scale-105 active:brightness-100"
            src={image.imgUrl}
            preview={false}
            onClick={() => setSelectedImageUrl(image.imgUrl)}
            alt={product.productName}
          />
        ))}
      </div>

      {/* Preview modal */}
      <Modal open={isPreviewOpen} footer={null} onCancel={() => setPreviewOpen(false)}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={selectedImageUrl}
        />
      </Modal>
    </div>
  );
}

export default ProductOverviewImg;
