import React, { useEffect, useState } from "react"
import ImageCarousel from "../components/ImageCarousel"
import ProductCardList from "../components/product/ProductCardList"
import productApi from "../api/productApi";

const imageUrls = [
  "https://i.pinimg.com/736x/b1/92/87/b192870538036f95ffc468da4874164e.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/efbe3278294215.5cbb998d594ed.jpg",
  "https://m.media-amazon.com/images/S/aplus-media-library-service-media/b0f02d10-ee7e-4727-8d69-241cf26d5995.__CR0,0,970,600_PT0_SX970_V1___.jpg",
]

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productApi.getLandingPageProducts()
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, [])

  return (
    <div id="homePage" className="">
      <section className="container mx-auto flex flex-col pb-12">
        <div className="flex justify-center py-6">
          <img
            className="h-6"
            src="/assets/images/logo-orange.png"
            alt="logo"
          />
          <h1 className="font-bold text-2xl mx-4">
            <span className="text-sky-500">Browse</span> Now
          </h1>
        </div>
        <ImageCarousel imageUrls={imageUrls} />
      </section>

      <section className="bg-neutral-100">
        <div className="container mx-auto flex flex-col">
          <div className="flex justify-center py-6">
            <img
              className="h-6"
              src="/assets/images/logo-orange.png"
              alt="logo"
            />
            <h1 className="font-bold text-2xl mx-4">
              <span className="text-orange-500">Feature</span> Product
            </h1>
          </div>
          <ProductCardList products={products}/>
          <button className="self-center rounded-sm bg-orange-500 text-white px-4 py-1 block mx-auto my-10">
            SEE MORE
          </button>
        </div>
      </section>

      <section className="bg-gradient-to-tr from-sky-400 to-blue-500">
        <div className="container mx-auto flex flex-col py-4 pb-12">
          <div className="flex flex-col justify-center items-center py-6">
            <h1 className="text-white font-bold text-2xl mx-4">
              <span className="text-orange-500">Keep</span> in{" "}
              <span className="text-orange-500">Touch</span>
            </h1>
            <p className="my-8 text-white">
              Subscribe to our weekly newsletter and receive exclusive offers on
              products you love!
            </p>
            <div className="flex rounded-sm overflow-hidden w-full max-w-lg">
              <input
                className="p-2 px-6 w-full"
                type="text"
                placeholder="Email Address"
              />
              <button className="bg-orange-500 p-2 px-6 font-bold text-xs">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
