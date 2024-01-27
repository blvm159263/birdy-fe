import {Button, Modal} from "antd";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setUpdateOptionModalOpen} from "../../../features/ui/uiSlice";

export default function EditOptionModal({onCancelOrderAndUpdate, onHideAndCreateNew}) {
  const isUpdateOptionModalOpen = useSelector(state => state.ui.isUpdateOptionModalOpen);
  const dispatch = useDispatch();

  function onCancel() {
    dispatch(setUpdateOptionModalOpen(false));
  }

  if(!isUpdateOptionModalOpen) return null;

  return (
    <Modal
      open={isUpdateOptionModalOpen}
      title="Sản phẩm này có đơn hàng đang chờ"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Huỷ bỏ
        </Button>,
        <Button key="submit1" type="primary" onClick={onCancelOrderAndUpdate}>
          Huỷ đơn hàng và cập nhật
        </Button>,
        <Button
          key="submit2"
          type="primary"
          onClick={onHideAndCreateNew}
        >
          Ẩn và tạo sản phẩm mới
        </Button>,
      ]}
    >
      <p>Sản phẩm này hiện đang có đơn hàng đang chờ nên chưa thể cập nhật thông tin sản phẩm, hãy lựa chọn một trong hai phương án dưới đây:</p>
      <div>
        <p><strong>Huỷ đơn hàng và cập nhật:</strong> Huỷ tất cả mọi đơn hàng hiện tại của sản phẩm này sau đó cập nhật sản phẩm</p>
        <p><strong>Ẩn và tạo sản phẩm mới:</strong> Ẩn sản phẩm này và tạo một sản phẩm mới với các thông tin đã nhập</p>
        <i className='text-red-500'>Lưu ý: chỉnh sửa sản phẩm sẽ làm thay đổi đánh giá của sản phẩm</i>
      </div>
    </Modal>
  )
}