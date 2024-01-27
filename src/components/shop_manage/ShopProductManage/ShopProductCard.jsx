import React, {useContext, useState} from "react"
import {useDispatch} from "react-redux";
import {Popconfirm, Switch} from "antd";
import {NotificationContext} from "../../../context/NotificationProvider";
import productApi from "../../../api/productApi";
// import { setShowShopProductManageForm } from "../../../features/ui/uiSlice";
// import { setEditId } from "../../../features/shops/shopSlice";
import {fetchProductFormValues, fetchProductSubImages, setEditId} from "../../../features/shops/shopSlice";
import {setDeleteOptionModalOpen, setShowShopProductEditModal} from "../../../features/ui/uiSlice";

function ShopProductCard({ product, onDeleteSuccess }) {
  const dispatch = useDispatch();
  const [isToggleLoading, setToggleLoading] = useState(false);

  const openNotificationWithIcon = useContext(NotificationContext);

  const confirm = (e) => {
    // Check if product have orders
    productApi.checkIfProductHaveOrderById(product.id).then((response) => {
      if(response.status === 200) {
        dispatch(setEditId(product.id));
        dispatch(setDeleteOptionModalOpen(true));
      }
    }).catch((error) => {
      // No orders, delete immediately
      cancelOrderAndDeleteProduct();
      console.log("Product don't have order");
    })
  };

  function cancelOrderAndDeleteProduct() {
    productApi.deleteProduct(product.id).then((res) => {
      // console.log(res);
      if (res.status === 200) {
        openNotificationWithIcon('Success', 'Delete product successfully!');
        dispatch(setDeleteOptionModalOpen(false));
        onDeleteSuccess();
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  function toggleDisabled() {
    setToggleLoading(true);
    if(product.isDisabled) {
      productApi.showProductById(product.id).then((res) => {
        // console.log(res);
        if (res.status === 200) {
          openNotificationWithIcon('Success', 'Show product successfully!');
          onDeleteSuccess();
        }
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setToggleLoading(false);
      })
    } else {
      productApi.hideProductById(product.id).then((res) => {
        // console.log(res);
        if (res.status === 200) {
          openNotificationWithIcon('Success', 'Hide product successfully!');
          onDeleteSuccess();
        }
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setToggleLoading(false);
      })
    }
  }

  return (
    <div className={`relative bg-white rounded-lg h-full shadow-md flex flex-col items-center`}>
      <div className="h-52 w-full overflow-hidden">
        <img
          src={product.imageMain}
          alt="Card"
          className={`h-full w-full object-cover object-center rounded-lg rounded-b-none ${product.isDisabled && "brightness-50 opacity-80"}`}
        />
      </div>

      {/* Warn and Ban status */}
      <div className='absolute top-2 right-2'>
        {product.isBanned && <div className='rounded font-bold border border-red-500 text-red-500 bg-red-100 px-2'>Đã bị cấm</div>}
        {!product.isBanned && product.isWarned && <div className='rounded font-bold border border-orange-500 text-orange-500 bg-orange-100 px-2'>Bị cảnh cáo</div>}
        {!product.isBanned && product.isDisabled && <div className='rounded font-bold border border-gray-500 text-gray-500 bg-gray-300 px-2'>Đã ẩn</div>}
      </div>

      <div className="px-2 py-3 flex flex-col items-center">
        <p className="text-gray-600 mb-4 truncate w-44 text-center">{product.productName}</p>
        <h1 className="text-sm text-left font-semibold mb-2">Số lượng: <strong>{product.quantity}</strong></h1>

        {/*{!product.isBanned && product.state === 0 && <p className="mb-3 w-fit border text-sm font-medium text-white text-center rounded-md px-2 py-1 bg-yellow-300">Đang chờ...</p>}*/}
        {/*{!product.isBanned && product.state === 1 && <p className="mb-3 w-fit border text-sm font-medium text-white text-center rounded-md px-2 py-1 bg-green-400">Đã chấp thuận</p>}*/}
        {product.isBanned && <p className="mb-3 w-fit border text-sm font-medium text-white text-center rounded-md px-2 py-1 bg-red-400">Đã bị cấm</p>}

        {/* Hide */}
        <div className={`w-full text-center my-2 mb-4`}>
          Công khai <Switch className='ml-2' checked={!product.isDisabled && !product.isBanned} onChange={toggleDisabled} loading={isToggleLoading} disabled={product.isBanned}/>
        </div>

        {/* Edit and Delete */}
        {!product.isBanned &&
        <div className="grid grid-cols-2">
          <button
            onClick={() => {
              dispatch(setEditId(product.id));
              dispatch(fetchProductFormValues(product.id));
              dispatch(fetchProductSubImages(product.id));
              dispatch(setShowShopProductEditModal(true));
            }}
            className="text-green-500 px-1 py-2 border-grey-100 font-bold hover:brightness-125 active:brightness-110 duration-150"
          >
            Chỉnh sửa
          </button>
          <Popconfirm
            title="Xoá sản phẩm này?"
            description="Hành động này không thể hoàn tác."
            // onCancel={cancel}
            onConfirm={confirm}
            okText="Xoá"
            cancelText="Huỷ bỏ"
          >
            <button
              className="text-red-500 px-1 py-2 border-l border-gray-200 ml-2 font-bold hover:brightness-125 active:brightness-110 duration-150"
            >
              Xoá
            </button>
          </Popconfirm>
        </div>}
      </div>
    </div>
  )
}

export default ShopProductCard
