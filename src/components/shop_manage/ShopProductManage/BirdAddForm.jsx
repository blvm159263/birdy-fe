import { useState } from "react"
import { Select, Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import productApi from "../../../api/productApi";


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function BirdAddForm({ isChoosen, setIsChoosen }) {

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [subImages, setSubImages] = useState([]);
  const [imageMain, setImageMain] = useState([]);
  const [gender, setGender] = useState('male'); 

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.preview);
    setPreviewOpen(true);
    //setPreviewTitle(file.name);
  };
  const handleSubImages = ({ fileList: newFileList }) => {
    for (var i = 0; i < newFileList.length; i++) {
      newFileList[i].status = 'done';
    }
    setSubImages(newFileList);
  }

  const handleImageMain = ({ fileList: newFileList }) => {
    for (var i = 0; i < newFileList.length; i++) {
      newFileList[i].status = 'done';
    }
    setImageMain(newFileList);
  }


  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload ({subImages.length}/9)
      </div>
    </div>
  );

  const uploadButtonMain = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload (0/1)
      </div>
    </div>
  );

  const items = ['Male', 'Female'];

  const onSubmit = (values) => {
    var productDto = {
      id: null,
      productName: values[0],
      imageMain: null,
      subImages: null,
      unitPrice: values[10],
      salePtc: null,
      quantity: values[11],
      rating: 0,
      createDate: null,
      species: values[6],
      age: values[7],
      gender: null,
      color: values[9],
      expDate: null,
      madeIn: null,
      weight: null,
      size: null,
      material: null,
      description: values[12],
      brandName: null,
      state: null,
      categoryId: null,
      shopId: null,
      shopName: null,
    }

    const params = {
      productDTO: productDto,
      mainImage: imageMain[0],
      subImages: subImages,
      gender: gender.toLowerCase(),
    }

    productDto.imageMain = params.mainImage === undefined ? null : params.mainImage;
    productDto.subImages = params.subImages;
    productDto.gender = params.gender;
    console.log(productDto);
    // productApi.addNewProduct(params).then(res => {
    //   console.log(res);
    // });
  }
  const handleEntailmentRequest = (e) => {
    e.preventDefault();
  }

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-3/5 my-6 mx-auto max-w-3xl  ">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none overflow-y-auto ">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-3xl font-semibold">Bird</h3>
            <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/*body*/}

          <div className="relative overflow-x-auto overflow-y-scroll" style={{ maxHeight: 600 }} >
            <form className="w-full p-3 text-sm text-left text-gray-500 bg-white-700 dark:text-gray-400"
              onSubmit={(e) => {
                handleEntailmentRequest(e);
                var list = [];
                for (var i = 0; i < e.target.length; i++) {
                  list.push(e.target[i].value);
                }
                onSubmit(list);
              }}>
              <div className="mb-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  // dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="mainImage"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Main Image
                </label>
                {/* <input
                  type="file"
                  id="mainImage"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                /> */}
                <Upload
                  listType="picture-card"
                  fileList={imageMain}
                  onPreview={handlePreview}
                  onChange={handleImageMain}
                >
                  {imageMain.length >= 1 ? null : uploadButtonMain}
                </Upload>
                <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
                  <img
                    alt="example"
                    style={{
                      width: '100%',
                    }}
                    src={previewImage}
                  />
                </Modal>
              </div>
              <label
                htmlFor="subImages"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Sub Images
              </label>
              <Upload
                listType="picture-card"
                fileList={subImages}
                onPreview={handlePreview}
                onChange={handleSubImages}
              >
                {subImages.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
                <img
                  alt="example"
                  style={{
                    width: '100%',
                  }}
                  src={previewImage}
                />
              </Modal>
              <div className="mb-2">
                <label
                  htmlFor="pecies"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Species
                </label>
                <input
                  type="text"
                  id="species"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="age"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Age
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  id="age"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Gender
                </label>
                {/* <input
                  type="text"
                  id="gender"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="M/F"
                  required
                /> */}
                <Select
                  className="block w-40"     
                  onChange={(value) => setGender(value)}  
                  defaultValue={items[0]}
                  options={items.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="color"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Color
                </label>
                <input
                  type="text"
                  id="color"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Price
                </label>
                <input
                  type="number"
                  min={0.01}
                  step={"0.01"}
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="quantity"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  min={1}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <textarea
                  type="text-area"
                  id="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-20 p-2.5"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end p-5 border-t border-solid border-slate-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setIsChoosen(!isChoosen)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BirdAddForm
