import React from "react"
import {useDispatch, useSelector} from "react-redux";
import {setShowShopProductEditModal} from "../../../features/ui/uiSlice";
import EditProductForm from "./form/EditProductForm";

export default function ShopProductEditModal() {
  const isVisible = useSelector(state => state.ui.isShowShopProductEditModal);
  const dispatch = useDispatch();

  if(!isVisible) return;

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 bg-black bg-opacity-40">
      <div className="relative w-auto my-6 mx-auto max-w-3xl min-w-[1000px]">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200">
            <h3 className="text-2xl font-semibold">Edit Product</h3>
            <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => dispatch(setShowShopProductEditModal(false))}>
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
            </button>
          </div>

          {/* Form */}
          <EditProductForm/>
        </div>
      </div>
    </div>
  )
}
