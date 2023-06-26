import {Modal, Upload} from "antd";
import React, {useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export default function SubImagesField() {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState("")
  const [error, setError] = useState(null)
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();

  const handlePreview = async (file) => {
    if (!file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.preview)
    setPreviewOpen(true)
  }

  const handleChange = ({ fileList: newFileList }) => {
    setError(null)
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
  }

  return (
    <div className="mb-7">
      <label htmlFor="subImages" className="block mb-2 text-sm font-medium text-gray-900" >
        Sub Images (optional)
        <p className="text-red-500">{error}</p>
      </label>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null :
          <div>
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload ({fileList.length}/9)
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