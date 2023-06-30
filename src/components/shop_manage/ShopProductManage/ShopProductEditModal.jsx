import React from "react"
import {useDispatch, useSelector} from "react-redux";
import {setShowShopProductEditModal} from "../../../features/ui/uiSlice";
import EditProductForm from "./form/EditProductForm";

export default function ShopProductEditModal({onEditSuccess}) {
  const isVisible = useSelector(state => state.ui.isShowShopProductEditModal);
  const dispatch = useDispatch();

  if(!isVisible) return;

  return (
    <div className="absolute inset-0 m-6 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full">
        {/*header*/}
        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200">
          <h3 className="text-2xl font-semibold">Edit Product</h3>
          <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => dispatch(setShowShopProductEditModal(false))}>
            <span className="bg-transparent text-neutral-400 opacity-100 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
          </button>
        </div>

        {/* Form */}
        <EditProductForm onEditSuccess={onEditSuccess}/>
      </div>
    </div>
  )
}
