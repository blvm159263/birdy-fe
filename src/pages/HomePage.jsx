import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import productApi from "../api/productApi"
import ImageCarousel from "../components/ImageCarousel"
import ProductCardList from "../components/product/ProductCardList"
import { useDispatch } from "react-redux"
import { resetAllState } from "../features/search/searchSlice"
import { Spin } from "antd"

const imageUrls = [
  "https://i.ytimg.com/vi/z9yAcZF9hFY/maxresdefault.jpg",
  "https://www.popoptiq.com/wp-content/uploads/2013/10/freebirds-newtrailer.jpg",
  "https://m.media-amazon.com/images/S/aplus-media-library-service-media/b0f02d10-ee7e-4727-8d69-241cf26d5995.__CR0,0,970,600_PT0_SX970_V1___.jpg",
]

export default function HomePage() {
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setProducts([]);
    setLoading(true);

    productApi
      .getLandingPageProducts()
      .then((response) => {
        setProducts(response.data)
        console.log(response.data)
        setLoading(false)
      })
      .catch((error) => console.log(error))
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
            <span className="text-sky-500">Khám Phá</span> Ngay
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
              <span className="text-orange-500">Sản Phẩm</span> Nổi Bật
            </h1>
          </div>

          {/* Loading icon */}
          {isLoading &&
            <div className='flex justify-center items-center h-[200px]'>
              <Spin size='large'/>
            </div>
          }

          {!isLoading && <ProductCardList products={products} />}
          <Link
            onClick={() => dispatch(resetAllState())}
            to="/all-featured"
            className="self-center rounded-sm bg-orange-500 text-white px-4 py-1 block mx-auto my-10"
          >
            XEM THÊM
          </Link>
        </div>
      </section>

      <section className="bg-gradient-to-tr from-sky-400 to-blue-500">
        <div className="container mx-auto flex flex-col py-4 pb-12">
          <div className="flex flex-col justify-center items-center py-6">
            <h1 className="text-white font-bold text-2xl mx-4">
              <span className="text-orange-500">Kết nối</span> với{" "}
              <span className="text-orange-500">chúng tôi</span>
            </h1>
            <p className="my-8 text-white">
              Hãy để lại liên lạc của bạn để nhận được những thông tin mới nhất!
            </p>
            <div className="flex rounded-sm overflow-hidden w-full max-w-lg">
              <input
                className="p-2 px-6 w-full"
                type="text"
                placeholder="Địa chỉ email của bạn"
              />
              <button className="bg-orange-500 p-2 px-6 font-bold text-xs">
                Gửi
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
