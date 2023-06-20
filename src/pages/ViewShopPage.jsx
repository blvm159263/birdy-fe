import StoreCard from "../components/store/StoreCard"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import shopApi from "../api/shopApi"
import { Link } from "react-router-dom"
import ShopNewProductSection from "../components/store/ShopNewProductSection"
import ShopCategoryProductSection from "../components/store/ShopCategoryProductSection"

export default function ViewShopPage() {
  const { id } = useParams()
  const [shop, setShop] = useState()

  useEffect(() => {
    shopApi
      .getShopDetailByShopId(id)
      .then((response) => {
        setShop(response.data[0])
        console.log("Id: " + id)
        console.log(response.data[0])
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div id="ViewShopPage" className="bg-neutral-100 px-2 md:px-0 py-4">
      <section className="container mx-auto">
        {/* Shop header */}
        {shop && <StoreCard shop={shop} />}
        <ul className={"bg-white rounded-sm flex justify-between px-24 py-2"}>
          <li className={"font-bold"}>
            <Link to={`/view-store/${id}`}>Home</Link>
            <span className={"block h-1 bg-sky-500 rounded-full"}></span>
          </li>
          <li>
            <Link to={`/view-shop/${id}`}>All products</Link>
          </li>
          <li>
            <Link to={`/view-shop/${id}`}>Latest</Link>
          </li>
          <li>
            <Link to={`/view-shop/${id}`}>Birds</Link>
          </li>
          <li>
            <Link to={`/view-shop/${id}`}>Accessories</Link>
          </li>
          <li>
            <Link to={`/view-shop/${id}`}>Foods</Link>
          </li>
        </ul>

        {/* Latest products section */}
        <ShopNewProductSection id={id} />

        {/* Category products sections */}
        <ShopCategoryProductSection id={id} categoryId={1} />
        <ShopCategoryProductSection id={id} categoryId={2} />
        <ShopCategoryProductSection id={id} categoryId={3} />
      </section>
    </div>
  )
}
