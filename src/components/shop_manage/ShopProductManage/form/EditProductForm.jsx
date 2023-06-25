import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setShowShopProductEditModal} from "../../../../features/ui/uiSlice";
import CategoryField from "./field/CategoryField";
import NameField from "./field/NameField";
import {resetAllState} from "../../../../features/shops/shopSlice";
import SpeciesField from "./field/SpeciesField";
import AgeField from "./field/AgeField";
import GenderField from "./field/GenderField";
import MadeInField from "./field/MadeInField";
import BrandField from "./field/BrandField";
import WeightField from "./field/WeightField";
import ColorField from "./field/ColorField";
import SizeField from "./field/SizeField";
import ExpiredDateField from "./field/ExpiredDateField";
import PriceField from "./field/PriceField";
import QuantityField from "./field/QuantityField";
import DescriptionField from "./field/DescriptionField";
import MaterialField from "./field/MaterialField";

export default function EditProductForm() {
  const dispatch = useDispatch();
  const formValues = useSelector(state => state.shop.productFormValues);

  useEffect(() => {
    console.log(formValues);
  }, [formValues])

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log("Form submitted");
  }

  return (
    <form id='EditProductForm' encType="multipart/form-data"
          className="w-full p-3 text-sm text-left text-gray-500 bg-white-700 dark:text-gray-400"
          onSubmit={(e) => handleFormSubmit(e)}>
      <NameField/>

      {/* TODO: Add image upload */}

      <CategoryField/>

      <div className='grid grid-cols-5 gap-3'>
        {formValues.categoryId === 1 && <SpeciesField/>}
        {formValues.categoryId === 1 && <AgeField/>}
        {formValues.categoryId === 1 && <GenderField/>}
        {(formValues.categoryId === 2 || formValues.categoryId === 3) && <MadeInField/>}
        {(formValues.categoryId === 2 || formValues.categoryId === 3) && <BrandField/>}
        <WeightField/>
        {formValues.categoryId === 2 && <MaterialField/>}
        <ColorField/>
        {formValues.categoryId === 2 && <SizeField/>}
        {(formValues.categoryId === 2 || formValues.categoryId === 3) && <ExpiredDateField/>}
      </div>

      <div className='grid grid-cols-2 gap-3'>
        <PriceField/>
        <QuantityField/>
      </div>
      <DescriptionField/>


      {/* Buttons */}
      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
        <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  dispatch(setShowShopProductEditModal(false));
                  dispatch(resetAllState());
                }}>Close</button>
        <button className="text-green-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit">Submit</button>
      </div>
    </form>
  )
}