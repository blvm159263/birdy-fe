import React, {useContext, useEffect, useRef, useState} from "react"
import {PlusOutlined} from '@ant-design/icons';
import {Avatar, Modal, Upload} from 'antd';
import ImgCrop from 'antd-img-crop'
import format from "date-fns/format";
import shopApi from "../../api/shopApi";
import {NotificationContext} from "../../context/NotificationProvider";
import {LoginContext} from "../../context/LoginProvider";
import ChangeAddressModal from "./ChangeAddressModal";
import {useDispatch} from "react-redux";
import {setUpdated} from "../../features/shops/shopSlice";


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function ShopProfile() {

  const { shopId } = useContext(LoginContext)

  const [updateStatus, setUpdateStatus] = useState(false);
  const openNotificationWithIcon = useContext(NotificationContext);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [shopAvar, setShopAvar] = useState([]);
  const [error, setError] = useState(null);
  const [shop, setShop] = useState([]);
  const [phone, setPhone] = useState('');
  const [createDate, setCreateDate] = useState('');
  const [url, setUrl] = useState('');
  const ref = useRef(null);
  const [address, setAddress] = useState();
  const dispatch = useDispatch();


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


  useEffect(() => {
    updateStatus && setUpdateStatus(false);
    shopApi.getShopDetailByShopId(shopId).then((res) => {
      console.log(res.data[0].avatarUrl);
      setShop(res.data[0]);

      const NullAva = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png';
      // const avar = res.data[0].avatarUrl;
      setUrl(res.data[0].avatarUrl !== '' ? res.data[0].avatarUrl : NullAva || NullAva);
      console.log(url);
      setShopAvar([{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: res.data[0].avatarUrl !== '' ? res.data[0].avatarUrl : NullAva || NullAva,
      }]);

      const hidePhone = hidePhoneNumber(res.data[1].phoneNumber)
      setPhone(hidePhone)

      const dateformat = getDate(res.data[0].createDate);
      setCreateDate(dateformat);

      setAddress(res.data[0].address);
    }).catch((err) => {
      console.log(err);
    })
  }, [updateStatus, shopId, shop.address]);

  const onSubmit = (data) => {
    // console.log(data);
    const params = {
      shopName: data[0],
      address: address,
      shopImage: shopAvar[0]?.originFileObj || null,
    }
    console.log(params);
    shopApi.editProfile(shopId, params).then((res) => {
      console.log(res);
      if (res.status === 200) {
        // alert('Update success!');
        setUpdateStatus(true);
        dispatch(setUpdated(true));
        openNotificationWithIcon('Success!', 'Update Shop Profile successfully!');
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  const handleEntailmentRequest = (e) => {
    e.preventDefault();
  }

  function hidePhoneNumber(phoneNumber) {
    const visibleDigits = 2; // Number of digits to keep visible at the beginning and end
    const hiddenDigits = phoneNumber.length - (visibleDigits * 2); // Number of digits to hide with asterisks

    // Create the masked phone number string
    const maskedPhoneNumber =
      phoneNumber.substr(0, visibleDigits) +
      "*".repeat(hiddenDigits) +
      phoneNumber.substr(-visibleDigits);

    return maskedPhoneNumber;
  }


  // const isoString = "2023-05-10T12:30:00.000Z";
  const getDate = (dateString) => {
    const isoString = dateString;

    const formattedDate = format(new Date(isoString), 'dd/MM/yyyy');

    return formattedDate;
  }

  const HandleReset = () => {
    ref.current?.value !== shop.shopName && (ref.current.value = shop.shopName);
    shopAvar[0]?.url !== shop.avatarUrl && (
      setShopAvar([{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: url,
      }])
    );
  }

  return (

    <div className="bg-gray-200 p-4 col-span-9 min-h-screen">
      <h1 className="text-center mb-5 text-2xl font-bold">Shop Profile</h1>

      <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="pt-7 pb-14 px-16 bg-white">

          <form className="w-full p-3 text-sm text-left text-gray-500 bg-white-700 dark:text-gray-400"
            onSubmit={(e) => {

              if (shopAvar.length === 0) {
                handleEntailmentRequest(e);
                setError('Please upload your shop avatar!');
              }
              else {

                handleEntailmentRequest(e)
                var list = [];
                for (var i = 0; i < e.target.length; i++) {
                  list.push(e.target[i].value)
                }
                onSubmit(list);
              }
            }}
          >

            <div className="flex flex-row w-full place-content-between">
              <div className="basis-3/5 align-middle">

                <div className="mt-7 mb-14 flex items-center">
                  <div className="w-1/5">
                    <label
                      className="pr-2 block text-sm text-right font-medium text-gray-400"
                    >
                      Account
                    </label>
                  </div>
                  <div className="w-full flex items-center pl-6">
                    <Avatar className="border" src={<img src={url} alt="avatar" />} size={32} />
                    {/* </div> */}
                    <span className="pl-2 text-sm text-black">{shop.shopName}</span>
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
                      ref={ref}
                      required
                      maxLength={50}
                      type="text"
                      id="name"
                      name="name"
                      placeholder="shop name"
                      defaultValue={shop.shopName}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block w-full p-2.5"
                    />
                  </div>
                </div>

                <div className="mb-14 flex items-center">
                  <div className="w-1/5">
                    <label
                      className="pr-2 block text-right text-sm font-medium text-gray-400"
                    >
                      Balance
                    </label>
                  </div>
                  <div className="w-full pl-6">
                    <span className="text-sm text-black">$ {shop?.balance?.toFixed(2) || '0.00'}</span>
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
                    <span className="text-sm text-black">{createDate}</span>
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
                    <span className="text-sm text-black">{phone}</span>
                  </div>
                </div>

                <div className="mb-14 flex items-center">
                  <div className="w-1/5">
                    <label
                      className="pr-2 block text-sm text-right font-medium text-gray-400"
                    >
                      Shop address
                    </label>
                  </div>
                  <div className="w-full pl-6">
                    <span className="text-sm text-black mr-2">{address}</span>
                    <ChangeAddressModal setAddress={setAddress}/>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-1/5"></div>
                  <div className="w-full pl-6">
                    <button
                      // onClick={HandleSave}
                      type="submit"
                      className="border border-blue-500 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-md">Save</button>
                    <button
                      onClick={HandleReset}
                      type="reset"
                      className="ml-6 border border-sky-400 bg-transparent text-sky-400 hover:bg-sky-400 hover:text-white font-semibold py-2 px-5 rounded-md">Reset</button>
                  </div>
                </div>

              </div>

              <div className="basis-[35%] flex items-center justify-center">
                <div className="h-96 w-full border-l border-gray-300 flex items-center justify-center">
                  <div className="ml-12 flex flex-col items-center">
                    <label
                      className="pr-2 block text-sm text-center font-medium mb-3"
                    >
                      <p className="text-red-500">{error}</p>
                    </label>
                    <div >
                      <ImgCrop showGrid rotationSlider showReset cropShape="round">
                        <Upload
                          listType="picture-circle"
                          fileList={shopAvar}
                          onPreview={handlePreview}
                          onChange={handleChange}
                        >
                          {shopAvar.length >= 1 ? null : uploadButton}
                        </Upload>
                      </ImgCrop>
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
