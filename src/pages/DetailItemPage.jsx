import React, { useEffect, useState } from "react";
import ProductOverview from "../components/detail-page/ProductOverview/ProductOverview";
import ShopInfo from "../components/detail-page/ShopInfo";
import ProductDetails from "../components/detail-page/ProductDetails";
import Review from "../components/detail-page/Review";
import RelatedProduct from "../components/detail-page/RelatedProduct";
import productApi from "../api/productApi";
import shopApi from "../api/shopApi";
import { useParams } from "react-router";
import StoreCard from "../components/store/StoreCard";
import { Spin } from "antd";

function DetailItemPage() {
  const [shop, setShop] = useState(null);
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    productApi
      .getProductById(id)
      .then((response) => {
        setProduct(response.data);
        console.log(response.data);

        shopApi.getShopDetailByShopId(response.data.shopId).then((response) => {
          console.log(response);
          setShop(response.data[0]);
        })
      })
      .catch((error) => console.log(error));

    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="bg-gray-200 py-4">
      {product ? (
        <div className="container mx-auto">
          <ProductOverview product={product} />
          <StoreCard shop={shop}/>
          <div className="grid grid-cols-12 gap-2 mt-2">
            <ProductDetails product={product} />
            <Review product={product} />
          </div>
          <RelatedProduct product={product} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-[60vh]">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
}

export default DetailItemPage;
