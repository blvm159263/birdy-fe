import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateProductFormValues} from "../../../../../features/shops/shopSlice";
import ReactQuill from "react-quill";

export default function DescriptionField() {
  const description = useSelector(state => state.shop.productFormValues.description || "");
  const dispatch = useDispatch();

  const modules = {
    toolbar: [
      [{ size: [] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, "link"],
      [{ header: 1 }, { header: 2 }],
      [{ align: ["right", "center", "justify"] }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  }

  const formats = [
    "size",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "link",
    "header",
    "align",
    "indent",
    "list",
    "bullet",
  ]

  return (
    <div className="mb-7">
      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900" >
        Description (optional)
      </label>

      <ReactQuill
        className="text-gray-900 text-sm"
        theme="snow"
        modules={modules}
        formats={formats}
        value={description}
        onChange={content => dispatch(updateProductFormValues({description: content}))}
        placeholder="Write something about your product..."
      />
      <p className="float-right">{description.length}/3000</p>
    </div>
  )
}