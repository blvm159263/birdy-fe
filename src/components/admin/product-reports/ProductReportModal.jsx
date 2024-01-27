import {CheckCircleOutlined, WarningOutlined} from "@ant-design/icons";
import {Modal, Popconfirm, Spin} from "antd";
import {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import adminApi from "../../../api/adminApi";
import {closeProductReportModal} from "../../../features/admin/adminSlice";
import ProductDetails from "../../detail-page/ProductDetails";
import ProductOverview from "../../detail-page/ProductOverview/ProductOverview";
import Review from "../../detail-page/Review";
import {NotificationContext} from "../../../context/NotificationProvider";

export default function ProductReportModal({triggerReload}) {
  const openNotificationWithIcon = useContext(NotificationContext);
  const isModalOpen = useSelector(
    (state) => state.admin.isProductReportModalOpen
  );
  const report = useSelector((state) => state.admin.selectedProductReport);
  const [reportDetail, setReportDetail] = useState(null);
  const { product } = report ? report : {};
  const dispatch = useDispatch();

  const onCancel = () => {
    dispatch(closeProductReportModal());
    setReportDetail(null);
  };

  const onWarning = () => {
    adminApi.warningProductById(report.product.id)
    .then((response) => {
      openNotificationWithIcon('Thành công', 'Đã gửi cảnh báo')
      triggerReload(state => !state)
      onCancel();
    }).catch((error) => {
      openNotificationWithIcon('Lỗi', 'Có gì đó không đúng')
      console.log(error);
    })
  }

  const onBan = () => {
    adminApi.banProductById(report.product.id)
    .then((response) => {
      openNotificationWithIcon('Thành công', 'Đã cấm sản phẩm')
      triggerReload(state => !state)
      onCancel();
    }).catch((error) => {
      openNotificationWithIcon('Lỗi', 'Có gì đó không đúng')
      console.log(error);
    })
  }

  useEffect(() => {

    if (report) {
      adminApi.getReportsByProductId(report.product.id)
      .then((response) => {
        setReportDetail(response.data);
        console.log(response.data)
      }).catch((error) => {
        console.log(error);
      }
    )}
    else {
    }
  }, [report])

  return (
    <Modal
      title="Report details"
      open={isModalOpen}
      onCancel={onCancel}
      footer={null}
      width='90vw'
    >
      {report ? (
        <div className="grid grid-cols-12">
          {/* Infos */}
          <div className="col-span-8">
            <ProductOverview product={product} noControl />
            <div className="grid grid-cols-12 gap-2 mt-2">
              <ProductDetails product={product} />
              <Review product={product} />
            </div>
          </div>

          {/* Reports */}
          {reportDetail ? (
            <div className="col-span-4 flex flex-col p-4 gap-2">
              <h2 className={`font-bold text-xl ${report.reportCount > 3 ? 'text-red-500' : 'text-orange-400'}`}>Sản phẩm này có <span className="font-bold text-2xl">{report.reportCount}</span> lượt báo xấu   <WarningOutlined /></h2>
              {reportDetail.report.map((report) => (
                <div className="flex gap-4 items-center mt-4 pl-4">
                  <p className={`font-bold text-lg ${report.reasonCount > 3 ? 'text-red-500' : 'text-orange-400'}`}>{report.reasonCount}</p>
                  <p>{report.reason}</p>
                </div>
              ))}
              {product.isWarned ?
                <button disabled className={`mt-6 h-12 w-full rounded shadow bg-gradient-to-r from-orange-300 to-orange-300 text-white font-bold`}>
                  Đã gửi cảnh báo
                </button> :
                <Popconfirm
                  title="Gửi"
                  description="Bạn có chắc chắn muốn gửi cảnh cáo cho sản phẩm này?"
                  onConfirm={onWarning}
                  icon={<CheckCircleOutlined />}
                  okText="Gửi cảnh báo"
                  cancelText="Trở lại"
                >
                  <button className={`mt-6 h-12 w-full rounded shadow bg-gradient-to-r from-orange-500 to-orange-700 text-white font-bold hover:brightness-125 active:brightness-110 duration-150`}>
                    Gửi cảnh cáo
                  </button>
                </Popconfirm>
              }
              <Popconfirm
                title="Cấm sản phẩm"
                description="Bạn có chắc chắn muốn cấm sản phẩm này?"
                onConfirm={onBan}
                icon={<CheckCircleOutlined />}
                okText="Xác nhận"
                cancelText="Trở lại"
              >
                <button className={`h-12 w-full rounded shadow bg-gradient-to-r from-red-500 to-red-800 text-white font-bold hover:brightness-125 active:brightness-110 duration-150`}>
                  Cấm sản phẩm
                </button>
              </Popconfirm>
            </div>
          ) : (
            <div className='col-span-4 flex justify-center items-center h-[80vh]'>
              <Spin />
            </div>
          )}
        </div>
      ) : (
        "No report"
      )}
    </Modal>
  );
}
