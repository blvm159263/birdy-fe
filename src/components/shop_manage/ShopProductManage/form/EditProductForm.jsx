import React, {useContext, useEffect, useState} from "react";
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
import productApi from "../../../../api/productApi";
import MainImageField from "./field/MainImageField";
import SubImagesField from "./field/SubImagesField";
import {NotificationContext} from "../../../../context/NotificationProvider";

export default function EditProductForm({onEditSuccess}) {
  const openNotificationWithIcon = useContext(NotificationContext);
  const dispatch = useDispatch();
  const formValues = useSelector(state => state.shop.productFormValues);
  const [mainImage, setMainImage] = useState(formValues.imageMain);
  const [subImages, setSubImages] = useState([])

  useEffect(() => {
    console.log("---------------------")
    console.log("Current form values:");
    console.log(formValues);
    console.log("Current mainImage:");
    console.log(mainImage);
    console.log("Current subImages:");
    console.log(subImages);
  }, [formValues, mainImage, subImages])

  function handleFormSubmit(e) {
    e.preventDefault();

    const productDTO = {
      id: formValues.id,
      productName: formValues.productName,
      imageMain: null,
      unitPrice: formValues.unitPrice,
      salePtc: formValues.salePtc,
      quantity: formValues.quantity,
      rating: formValues.rating,
      createDate: formValues.createDate,
      species: formValues.species,
      age: formValues.age,
      gender: formValues.gender,
      color: formValues.color,
      expDate: formValues.expDate,
      madeIn: formValues.madeIn,
      weight: formValues.weight,
      size: formValues.size,
      material: formValues.material,
      description: formValues.description,
      brandName: formValues.brandName,
      state: formValues.state,
      categoryId: formValues.categoryId,
      categoryName: formValues.categoryName,
      shopId: formValues.shopId,
      shopName: formValues.shopName,
    }

    const params = {
      productDTO: JSON.stringify(productDTO),
      mainImage: mainImage,
      subImages: subImages,
      objects: JSON.stringify([]),
    }

    console.log("Submitted form! With below data:");
    console.log(params);

    productApi.updateProductById(productDTO.id, params).then((response) => {
      console.log(response);
      if (response.status === 200) {
        openNotificationWithIcon('Success', 'Edit product successfully!');
        dispatch(setShowShopProductEditModal(false));
        onEditSuccess();
      }
    }).catch((error) => {
      openNotificationWithIcon('Error', 'Error while edit product!');
      console.log(error);
    })
  }

  return (
    <form id='EditProductForm'
          className="w-full p-3 text-sm text-left text-gray-500 bg-white-700 dark:text-gray-400"
          onSubmit={(e) => handleFormSubmit(e)}>
      <NameField/>
      <MainImageField setMainImage={setMainImage}/>
      <SubImagesField setSubImages={setSubImages}/>
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