import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { closeProductReportModal } from "../../../features/admin/adminSlice";
import DetailItemPage from "../../../pages/DetailItemPage";
import ProductOverview from "../../detail-page/ProductOverview/ProductOverview";

export default function ProductReportModal() {
  const isModalOpen = useSelector(
    (state) => state.admin.isProductReportModalOpen
  );
  const report = useSelector((state) => state.admin.selectedProductReport);
  const {product} = report ? report : {};
  const dispatch = useDispatch();

  const onCancel = () => {
    dispatch(closeProductReportModal());
  };

  return (
    <Modal
      title="Product details"
      open={isModalOpen}
      onCancel={onCancel}
      footer={null}
    >
      {report ? (
        <ProductOverview product={product} />
      ) : (
        "No report"
      )}
    </Modal>
  );
}
