import {HeartFilled} from "@ant-design/icons";
import {Modal, Radio, Rate, Space} from "antd";
import jwtDecode from "jwt-decode";
import React, {useContext, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import storageService from "../../../api/storage";
import userApi from "../../../api/userApi";
import {NotificationContext} from "../../../context/NotificationProvider";
import {addToCart} from "../../../features/cart/cartSlice";

const reasonList = [
  "Sản phẩm bị cấm buôn bán (động vật hoang dã, 18+,...)",
  "Hàng giả, hàng nhái",
  "Sản phẩm không rõ nguồn gốc, xuất xứ",
  "Hình ảnh sản phẩm không rõ ràng",
  "Sản phẩm có hình ảnh, nội dung phản cảm hoặc có thể gây phản cảm",
  "Sản phẩm có dấu hiệu lừa đảo",
  "Tên sản phẩm (Name) không phù hợp với hình ảnh sản phẩm",
  "Sản phẩm có dấu hiệu tăng đơn ảo",
  "Sản phẩm không thuộc danh mục được phép bán trên Birdy",
  "Sản phẩm giao hàng rất chậm",
  "Sản phẩm không có sẵn",
  "Shop không trả lời tin nhắn của khách hàng",
  "Shop không giao hàng",
  "Khác",
];

function ProductOverviewAction({ product, noControl }) {
  const openNotificationWithIcon = useContext(NotificationContext);

  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState();
  const [userId, setUserId] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onUpdateQuantity = (value) => {
    setQuantity(quantity + value);
  };

  const fetchData = async () => {
    let token = storageService.getAccessToken();
    if (token) {
      token = jwtDecode(token);
      await userApi
        .getUserByPhoneNumber(token.sub)
        .then((res) => {
          setUserId(res.data.id);
        })
        .catch((err) => {
          console.log(err);
        });
      if ((userId, product.id)) {
        userApi
          .getWishlist(userId, product.id)
          .then((res) => {
            setWishlist(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, product.id]);

  const onWishlist = async () => {
    if (!userId) {
      openNotificationWithIcon(
        "Please login",
        "Please login to add to wishlist!"
      );
      return;
    }
    if (!wishlist) {
      await userApi
        .addWishlist(userId, product.id)
        .then((res) => {
          openNotificationWithIcon(
            "Add to Wishlist",
            "Add to Wishlist Successfully!"
          );
        })
        .catch((err) => {
          console.log(err);
        });
      await userApi
        .getWishlist(userId, product.id)
        .then((res) => {
          setWishlist(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await userApi
        .deleteWishlist(userId, product.id)
        .then((res) => {
          openNotificationWithIcon(
            "Remove from Wishlist",
            "Remove from Wishlist Successfully!"
          );
        })
        .catch((err) => {
          console.log(err);
        });
      setWishlist(null);
    }
  };

  const handReport = () => {
    setModalOpen(true);
  };

  const onChange = (e) => {
    console.log(e.target.value);
    setReason(e.target.value);
  };

  const onSubmit = async () => {
    if (!userId) {
      openNotificationWithIcon(
        "Please login",
        "Please login to add to wishlist!"
      );
      return;
    }
    let isExited = false;
    await userApi
      .getReport(userId, product.id)
      .then((res) => {
        if (res.data) {
          openNotificationWithIcon(
            "Report",
            "You have already reported this product!"
          );
          isExited = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    if (isExited) {
      return;
    }

    const report = {
      userId: userId,
      fullName: null,
      productId: product.id,
      productName: product.productName,
      reason: reason,
      createDate: null,
      status: true,
    };
    await userApi
      .addReport(report)
      .then((res) => {
        openNotificationWithIcon("Report", "Report Successfully!");
      })
      .catch((err) => {
        openNotificationWithIcon("Fail", "Report Fail!");
        console.log(err);
      });

    setModalOpen(false);
  };

  return (
    <div className="col-span-12 lg:col-span-6">
      <div className="flex justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">{product.productName}</h1>
        {!noControl && <button
          onClick={handReport}
          className="font-semibold text-red-500 text-sm hover:text-white hover:bg-red-400 rounded px-2 md:px-4 duration-150 active:bg-red-600"
        >
          Tố cáo
        </button>}
      </div>
      <p className="text-2xl md:text-4xl font-bold text-orange-400 py-4 md:py-8">
        ${product.unitPrice}
      </p>
      <div className="flex items-baseline">
        <Rate disabled value={product.rating} />
        <p className="ml-2 text-sm font-medium text-gray-400">({product.totalRating})</p>
      </div>
      <div className="my-4 mt-6">
        <p>
          <span className="font-semibold">{product.quantity}</span> sản phẩm có sẵn
        </p>
      </div>
      <div className={`flex my-4 items-center ${noControl && 'hidden'}`}>
        <p className="mr-6">
          <span className="font-bold">Số lượng</span>:
        </p>
        <div className="flex border rounded shadow overflow-hidden">
          <button
            className="py-3 px-5 hover:bg-sky-200 active:bg-sky-300 duration-150 font-bold disabled:bg-white disabled:text-neutral-300"
            onClick={() => onUpdateQuantity(-1)}
            disabled={quantity === 1}
          >
            -
          </button>
          <p className="py-3 px-5 font-bold">{quantity}</p>
          <button
            className="py-3 px-5 hover:bg-sky-200 active:bg-sky-300 duration-150 disabled:bg-white disabled:text-neutral-300 font-bold"
            onClick={() => onUpdateQuantity(1)}
            disabled={quantity >= product.quantity}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex my-3 gap-2">
        <button
          onClick={() => {
            dispatch(
              addToCart({
                id: product.id,
                quantity: quantity,
                shopId: product.shopId,
                price: (product.unitPrice * (100 - product.salePtc)) / 100,
              })
            );
            openNotificationWithIcon(
              "Add to Cart",
              "Add to Cart Successfully!"
            );
          }}
          className={`grow shadow font-bold text-neutral-700 bg-sky-200 hover:bg-sky-300 active:bg-sky-200 rounded duration-150 ${noControl && 'hidden'}`}
        >
          Thêm vào giỏ hàng
        </button>
        <button
          className={`w-12 h-12 shadow flex items-center justify-center bg-red-400 hover:brightness-125 active:brightness-110 rounded-md duration-150 ${noControl && 'hidden'}`}
          onClick={onWishlist}
        >
          <HeartFilled className="text-2xl text-white" />
        </button>
      </div>
      <div className="action my-2">
        <button
          onClick={() => {
            dispatch(
              addToCart({
                id: product.id,
                quantity: quantity,
                shopId: product.shopId,
                price: (product.unitPrice * (100 - product.salePtc)) / 100,
              })
            );
            navigate("/cart");
          }}
          className={`h-12 w-full rounded shadow bg-gradient-to-r from-blue-500 to-sky-500 text-white font-bold hover:brightness-125 active:brightness-110 duration-150 ${noControl && 'hidden'}`}
        >
          Mua ngay
        </button>
      </div>
      <Modal
        style={{
          top: 100,
          width: 1000,
        }}
        open={modalOpen}
        onOk={() => {
          onSubmit();
        }}
        onCancel={() => setModalOpen(false)}
        cancelButtonProps={{
          className:
            "bg-white-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded-full text-center pb-7",
        }}
        okButtonProps={{
          className:
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-center pb-7",
        }}
      >
        <div className="font-bold text-lg pb-3 border-b-2">Lý do</div>

        <Radio.Group className="mt-6 " onChange={onChange}>
          <Space direction="vertical">
            {reasonList.map((reason, index) => (
              <Radio
                key={index}
                className="w-full pb-3 border-b-2"
                value={reason}
              >
                {reason}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Modal>
    </div>
  );
}

export default ProductOverviewAction;
