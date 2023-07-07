import React, { useState, useContext, useEffect } from "react"
import { Rate, Modal, Radio, Space } from "antd"
import { useDispatch } from "react-redux"
import { addToCart } from "../../../features/cart/cartSlice"
import { useNavigate } from "react-router-dom"
import { NotificationContext } from "../../../context/NotificationProvider"
import userApi from "../../../api/userApi"
import storageService from "../../../api/storage"
import jwtDecode from "jwt-decode"
import { set } from "date-fns"
import { is } from "date-fns/locale"

const reasonList = [
  "Sản phẩm bị cấm buôn bán (động vật hoang dã, 18+,...)",
  "Hàng giả, hàng nhái",
  "Sản phẩm không rõ nguồn gốc, xuất xứ",
  "Hình ảnh sản phẩm không rõ ràng",
  "Sản phẩm có hình ảnh, nội dung phản cảm hoặc có thể gây phản cảm",
  "Sản phẩm có dấu hiệu lừa đảo",
  "Tên sản phẩm (Name) không phù hợp với hình ảnh sản phẩm",
  "Sản phẩm có dấu hiệu tăng đơn ảo",
  "Khác",
];


function ProductOverviewAction({ product }) {
  const openNotificationWithIcon = useContext(NotificationContext)

  const [quantity, setQuantity] = useState(1)
  const [wishlist, setWishlist] = useState()
  const [userId, setUserId] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [reason, setReason] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onUpdateQuantity = (value) => {
    setQuantity(quantity + value)
  }

  const fetchData = async () => {
    let token = storageService.getAccessToken()
    if (token) {
      token = jwtDecode(token)
      await userApi
        .getUserByPhoneNumber(token.sub)
        .then((res) => {
          setUserId(res.data.id)
        })
        .catch((err) => {
          console.log(err)
        })
      if ((userId, product.id)) {
        userApi
          .getWishlist(userId, product.id)
          .then((res) => {
            setWishlist(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [userId, product.id])

  const onWishlist = async () => {
    if (!userId) {
      openNotificationWithIcon(
        "Please login",
        "Please login to add to wishlist!"
      )
      return
    }
    if (!wishlist) {
      await userApi
        .addWishlist(userId, product.id)
        .then((res) => {
          openNotificationWithIcon(
            "Add to Wishlist",
            "Add to Wishlist Successfully!"
          )
        })
        .catch((err) => {
          console.log(err)
        })
      await userApi
        .getWishlist(userId, product.id)
        .then((res) => {
          setWishlist(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      await userApi
        .deleteWishlist(userId, product.id)
        .then((res) => {
          openNotificationWithIcon(
            "Remove from Wishlist",
            "Remove from Wishlist Successfully!"
          )
        })
        .catch((err) => {
          console.log(err)
        })
      setWishlist(null)
    }
  }

  const handReport = () => {
    setModalOpen(true);
  }

  const onChange = (e) => {
    console.log(e.target.value);
    setReason(e.target.value);
  };

  const onSubmit = async () => {
    if (!userId) {
      openNotificationWithIcon(
        "Please login",
        "Please login to add to wishlist!"
      )
      return
    }
    let isExited = false
    await userApi.getReport(userId, product.id).then((res) => {
      if (res.data) {
        openNotificationWithIcon(
          "Report",
          "You have already reported this product!"
        )
        isExited = true
      }
    }).catch((err) => {
      console.log(err)
    })
    if(isExited) {
      return
    }

    const report = {
      userId: userId,
      fullName: null,
      productId: product.id,
      productName: product.productName,
      reason: reason,
      createDate: null,
      status: true,
    }
    await userApi.addReport(report).then((res) => {
      openNotificationWithIcon(
        "Report",
        "Report Successfully!"
      )
    }).catch((err) => {
      openNotificationWithIcon(
        "Fail",
        "Report Fail!"
      )
      console.log(err)
    })

    setModalOpen(false);
  }

  return (
    <div className="lg:p-14 sm: p-5 lg:w-1/2 sm: w-full">
      <h1 className="text-2xl font-bold">
        {product.productName}
        <button onClick={handReport} className="ml-40 font-normal text-sm">Tố cáo</button>
      </h1>
      <div
        style={{
          background: "#fafafa",
        }}
        className="my-4 text-lg"
      >
        <p className="text-lg font-bold text-orange-500 py-2">
          ${product.unitPrice}
        </p>
      </div>
      <div className="flex my-4 items-center">
        <Rate disabled value={product.rating} />
        <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400 pt-2">
          (102)
        </p>
      </div>
      <div className="my-4">
        <p>Availability: {product.quantity} left in stock</p>
      </div>
      <div className="my-4"></div>
      <div className="flex my-4">
        <p className="mr-6">Quantity:</p>
        <button
          className="border w-7 h-7 rounded-md bg-blue-100"
          onClick={() => onUpdateQuantity(-1)}
          disabled={quantity === 1}
        >
          -
        </button>
        <p className="border mx-1 w-10 rounded-md text-center">{quantity}</p>
        <button
          className="border w-7 h-7 rounded-md bg-blue-100 "
          onClick={() => onUpdateQuantity(1)}
          disabled={quantity >= product.quantity}
        >
          +
        </button>
      </div>
      <div className="action my-4">
        <div className="w-full flex items-center my-3 ">
          <button
            onClick={() => {
              dispatch(
                addToCart({
                  id: product.id,
                  quantity: quantity,
                  shopId: product.shopId,
                  price: (product.unitPrice * (100 - product.salePtc)) / 100,
                })
              )
              openNotificationWithIcon(
                "Add to Cart",
                "Add to Cart Successfully!"
              )
            }}
            className="border-2 border-white bg-sky-100 hover:bg-white  hover:border-sky-300 py-4 w-5/6 mr-3 font-bold rounded-md"
          >
            ADD TO CART
          </button>
          <button
            className=" h-14 w-14 flex items-center justify-center border-2 border-blue-100 hover:bg-sky-200 hover:border-white rounded-md"
            style={{
              background: wishlist ? "red" : "white",
            }}
            onClick={onWishlist}
          >
            <img
              src="/assets/images/heart-orange.png"
              className="h-2/5"
              alt=""
            />
          </button>
        </div>
        <button
          onClick={() => {
            dispatch(
              addToCart({
                id: product.id,
                quantity: quantity,
                shopId: product.shopId,
                price: (product.unitPrice * (100 - product.salePtc)) / 100,
              })
            )
            navigate("/cart")
          }}
          className="py-4 bg-sky-400 border-2 text-white font-bold border-white w-5/6 rounded-md hover:bg-white  hover:border-sky-300 hover:text-sky-400"
        >
          BUY NOW
        </button>
      </div>
      <Modal
        style={{
          top: 100,
          width: 1000,
        }}
        open={modalOpen}
        onOk={() => { onSubmit() }}
        onCancel={() => setModalOpen(false)}
        cancelButtonProps={{ className: 'bg-white-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded-full text-center pb-7' }}
        okButtonProps={{ className: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-center pb-7' }}
      >
        <div className='font-bold text-lg pb-3 border-b-2'>Lý do</div>

        <Radio.Group className='mt-6 ' onChange={onChange}>
          <Space direction="vertical">
            {reasonList.map((reason, index) => (
              <Radio key={index} className='w-full pb-3 border-b-2' value={reason}>{reason}</Radio>
            ))
            }
          </Space>
        </Radio.Group>
      </Modal>
    </div>
  )
}

export default ProductOverviewAction
