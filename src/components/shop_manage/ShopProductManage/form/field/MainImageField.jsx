import {Modal, Upload} from "antd";
import React, {useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {updateProductFormValues} from "../../../../../features/shops/shopSlice";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
})

export default function MainImageField() {
  const imageMain = useSelector(state => state.shop.productFormValues.imageMain);
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState("")
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null);
  const [fileList, setFileList] = useState([
    {
      url: imageMain,
    }
  ]);
  const dispatch = useDispatch();

  const handlePreview = async (file) => {
    if (!file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.preview)
    setPreviewOpen(true)
  }

  const handleChange = ({ fileList: newFileList }) => {
    setMessage(null)
    for (let i = 0; i < newFileList.length; i++) {
      if (
        newFileList[i].type !== "image/jpeg" &&
        newFileList[i].type !== "image/png" &&
        newFileList[i].type !== "image/jpg"
      ) {
        newFileList[i].status = "error"
        setError("Only JPG/PNG file can be uploaded!")
      } else {
        newFileList[i].status = "done"
        setError(null)
      }
    }
    setFileList(newFileList);
    console.log(newFileList);
    if(newFileList[0]) {
      getBase64(newFileList[0].originFileObj).then((base64result) => {
        dispatch(updateProductFormValues({imageMain: base64result}))
      })
    } else {
      dispatch(updateProductFormValues({imageMain: ''}))
    }
  }

  return (
    <div className="mb-4">
      <label htmlFor="mainImage" className="block mb-2 text-sm font-medium text-gray-900" >
        <p className="text-red-500 inline-block">*</p> Main Image
        <p className="text-red-500">{message || error}</p>
      </label>
      <Upload
        id="mainImage"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length > 0 ? null :
        <div>
          <PlusOutlined />
          <div style={{
              marginTop: 8,
            }} >
            Upload (0/1)
          </div>
        </div>}
      </Upload>
      <Modal open={previewOpen} footer={null} onCancel={() => setPreviewOpen(false)}>
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  )
}