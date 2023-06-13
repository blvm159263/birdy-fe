import React, { useState } from "react"
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function ShopProfile() {

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [shopAvar, setShopAvar] = useState([]);
  const [error, setError] = useState(null);


  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => {
    setError(null);
    for (var i = 0; i < newFileList.length; i++) {
      if (newFileList[i].type !== 'image/jpeg' && newFileList[i].type !== 'image/png') {
        newFileList[i].status = 'error';
        setError('Only JPG/PNG file can be uploaded!');
      }
      else { newFileList[i].status = 'done'; setError(null); }
    }
    setShopAvar(newFileList);
  }
  const uploadButton = (
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


  const onSubmit = (data) => {

  }

  const handleEntailmentRequest = (e) => {
    e.preventDefault();
  }

  return (

    <div className="bg-gray-300 p-10 w-4/5 absolute top-0 right-0 h-screen">
      <h1 className="text-center mb-10 text-2xl font-bold">Shop Profile</h1>

      <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="pt-7 pb-16 px-16 bg-white">

          <form className="w-full p-3 text-sm text-left text-gray-500 bg-white-700 dark:text-gray-400"
            onSubmit={(e) => {

              handleEntailmentRequest(e)
              var list = [];
              for (var i = 0; i < e.target.length; i++) {
                list.push(e.target[i].value)
              }
              onSubmit(list);
            }}
          >

            <div className="flex flex-row w-full place-content-between">
              <div className="basis-3/5 align-middle">

                <div className="mt-7 mb-14 flex items-center">
                  <div className="w-1/5">
                    <label
                      className="pr-2 block text-sm text-right font-medium text-gray-400"
                    >
                      User
                    </label>
                  </div>
                  <div className="w-full flex items-center pl-6">
                    <div className="w-7 h-7">
                      <img
                        src="../assets/images/shop-avar.png"
                        className="w-fit h-fit"
                        alt=""
                      />
                    </div>
                    <span className="pl-2 text-sm text-black">user name</span>
                    {/* <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="shop name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block w-full p-2.5"
                    /> */}
                  </div>
                </div>

                <div className="mb-14 flex items-center">
                  <div className="w-1/5">
                    <label
                      htmlFor="name"
                      className="pr-2 block text-sm text-right font-medium text-gray-400"
                    >
                      Shop name
                    </label>
                  </div>
                  <div className="w-full pl-6">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="shop name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block w-full p-2.5"
                    />
                  </div>
                </div>

                <div className="mb-14 flex items-center">
                  <div className="w-1/5">
                    <label
                      className="pr-2 block text-right text-sm font-medium text-gray-400"
                    >
                      Create Date
                    </label>
                  </div>
                  <div className="w-full pl-6">
                    <span className="text-sm text-black">22/6/2020</span>
                    {/* <input
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="shop phone"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block w-full p-2.5"
                    /> */}
                  </div>
                </div>

                <div className="mb-14 flex items-center">
                  <div className="w-1/5">
                    <label
                      className="pr-2 block text-sm text-right font-medium text-gray-400"
                    >
                      Shop phone
                    </label>
                  </div>
                  <div className="w-full pl-6">
                    <span className="text-sm text-black">091********95</span>
                    {/* <input
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="shop phone"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block w-full p-2.5"
                    /> */}
                  </div>
                </div>

                <div className="mb-7 flex items-center">
                  <div className="w-1/5">
                    <label
                      className="pr-2 block text-sm text-right font-medium text-gray-400"
                    >
                      Shop address
                    </label>
                  </div>
                  <div className="w-full pl-6">
                    <span className="text-sm text-black">73/40, April 30th street, Trung Dung Ward,<br /> Bien Hoa city, Dong Nai province </span>
                    {/* <input
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="shop phone"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block w-full p-2.5"
                    /> */}
                  </div>
                </div>

              </div>

              <div className="basis-[35%] flex items-center justify-center">
                <div className="h-96 w-full border-l border-gray-300 flex items-center justify-center">
                  <div className="ml-12">
                    <div >
                      <Upload
                        listType="picture-circle"
                        fileList={shopAvar}
                        onPreview={handlePreview}
                        onChange={handleChange}
                      >
                        {shopAvar.length >= 1 ? null : uploadButton}
                      </Upload>
                      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img
                          alt="example"
                          style={{
                            width: '100%',
                          }}
                          src={previewImage}
                        />
                      </Modal>
                    </div>
                    <div className="text-sm text-gray-400 ml-2">Upload type:<br />.JPEG, .PNG</div>
                  </div>
                </div>
              </div>
            </div>
          </form>


        </div>
      </div>

    </div>
  )
}

export default ShopProfile
