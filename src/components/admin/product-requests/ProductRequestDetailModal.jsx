import { Modal } from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { closeProductRequestDetailModal } from "../../../features/admin/adminSlice";
import ReactQuill from "react-quill";


export default function ProductRequestDetailModal() {
  const isModalOpen = useSelector(
    (state) => state.admin.isProductRequestDetailModalOpen
  );
  const product = useSelector((state) => state.admin.selectedProductRequest)
  const dispatch = useDispatch();

  const onCancel = () => {
    dispatch(closeProductRequestDetailModal());
  };

  return (
    <Modal
      title="Product details"
      open={isModalOpen}
      onCancel={onCancel}
      footer={null}
    >
      {product ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <img className="rounded h-80 w-full object-cover" src={product.imageMain} alt={product.productName} />
            </div>
            <div className="col-span-2 md:col-span-1">
              <p>Product name: <span className="font-semibold">{product.productName}</span></p>
              <p>Unit price: <span className="font-semibold text-orange-500">{product.unitPrice}$</span></p>
              <p>Sale percentage: <span className="font-semibold text-orange-500">{product.salePtc}%</span></p>
              <p>Quantity: <span className="font-semibold">{product.quantity}</span></p>
              <p>Request on: <span className="font-semibold">{dayjs(product.createDate).format('DD/MM/YYYY').toString()}</span></p>
              <p>Category: <span className="font-semibold">{product.categoryName}</span></p>
            </div>
          </div>
          <div>
            <ReactQuill
              className="text-gray-900 text-sm"
              theme="bubble"
              value={product.description}
              readOnly
            />
          </div>
        </>
      ) : (
        "No product"
      )}
    </Modal>
  );
}
