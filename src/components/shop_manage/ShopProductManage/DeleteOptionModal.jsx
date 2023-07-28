import {Button, Modal} from "antd";
import React, {useContext} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setDeleteOptionModalOpen} from "../../../features/ui/uiSlice";
import productApi from "../../../api/productApi";
import {NotificationContext} from "../../../context/NotificationProvider";

export default function DeleteOptionModal({onDeleteSuccess}) {
  const isDeleteOptionModalOpen = useSelector(state => state.ui.isDeleteOptionModalOpen);
  const dispatch = useDispatch();
  const id = useSelector(state => state.shop.editId);
  const openNotificationWithIcon = useContext(NotificationContext);

  function onCancel() {
    dispatch(setDeleteOptionModalOpen(false));
  }

  function cancelOrderAndDeleteProduct() {
    productApi.deleteProduct(id).then((res) => {
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

  function hideProduct() {
    productApi.hideProductById(id).then((res) => {
      // console.log(res);
      if (res.status === 200) {
        openNotificationWithIcon('Success', 'Hide product successfully!');
        dispatch(setDeleteOptionModalOpen(false));
        onDeleteSuccess();
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  if(!isDeleteOptionModalOpen) return null;

  return (
    <Modal
      open={isDeleteOptionModalOpen}
      title="Sản phẩm này có đơn hàng đang chờ"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Huỷ bỏ
        </Button>,
        <Button key="submit1" type="primary" onClick={cancelOrderAndDeleteProduct}>
          Huỷ đơn hàng và xoá
        </Button>,
        <Button
          key="submit2"
          type="primary"
          onClick={hideProduct}
        >
          Ẩn sản phẩm
        </Button>,
      ]}
    >
      <p>Sản phẩm này hiện đang có đơn hàng đang chờ nên chưa thể xoá sản phẩm, hãy lựa chọn một trong hai phương án dưới đây:</p>
      <div>
        <p><strong>Huỷ đơn hàng và xoá:</strong> Huỷ tất cả mọi đơn hàng hiện tại của sản phẩm này sau đó xoá sản phẩm</p>
        <p><strong>Ẩn sản phẩm:</strong> Ẩn sản phẩm này</p>
      </div>
    </Modal>
  )
}