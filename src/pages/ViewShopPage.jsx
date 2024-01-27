import {Outlet} from "react-router-dom";
import ShopHeader from "../components/store/ShopHeader";

export default function ViewShopPage() {
  return (
    <div id='ViewShopPage' className='bg-neutral-100 px-2 md:px-0 py-4'>
      <section className='container mx-auto'>
        {/* Shop header */}
        <ShopHeader />

        {/* Outlet for route sub page */}
        <Outlet />
      </section>
    </div>
  )
}