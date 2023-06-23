import React, { useState, useEffect, useRef } from "react"
import ShopOrderModal from "./ShopOrderModal"
import shopApi from "../../api/shopApi"
import orderApi from "../../api/orderApi";
import { Table, Tag, Badge, Steps, message, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { set } from "date-fns";
import { current } from "@reduxjs/toolkit";
import { de, el } from "date-fns/locale";

function ShopOrderManage() {
  const [updateStatus, setUpdateStatus] = useState(false);
  const [stepStatus, setStepStatus] = useState('process');
  const [title1, setTitle1] = useState('Deliver | Cancel');
  const [des1, setDes1] = useState('Deliver or cancel order.');
  const [title2, setTitle2] = useState('Done | Canceled');
  const [des2, setDes2] = useState('Order\'s final status.');
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false)
  const [shopOrders, setShopOrders] = useState([])
  const [orderId, setOrderId] = useState(0)
  const [orderDetails, setOrderDetails] = useState([])
  const [page, setPage] = useState(1)
  const searchRef = useRef(null)
  // const [totalOrders, setTotalOrders] = useState(0)
  const [search, setSearch] = useState("")
  const shopId = 1

  const fetchOrder = async () => {
    try {
      await shopApi.getShopOrders(shopId, { search: search })
        .then((response) => {
          setShopOrders(response.data);
          // setTotalOrders(response.data[1])
        })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (updateStatus) {
      setUpdateStatus(false)
    }
    fetchOrder()
  }, [search, updateStatus])

  // const getPage = (current) => {
  //   setPage(current);
  //   console.log(current);
  // }

  const handleViewModal = (id, state) => {
    setCurrent(0);
    setStepStatus('process');
    setTitle1('Deliver | Cancel');
    setDes1('Deliver or cancel order.');
    setTitle2('Done | Canceled');
    setDes2('Order\'s final status.');
    switch (state) {
      case 'PENDING':
        break;
      case 'DELIVERING':
        setCurrent(1);
        setTitle1('Delivering');
        setDes1('Order is delivering.');
        break;
      case 'DONE':
        setCurrent(2);
        setTitle1('Delivering');
        setDes1('Order is delivering.');
        setTitle2('Done');
        setDes2('Order is delivered.');
        setStepStatus('finish');
        break;
      case 'CANCELED':
        setCurrent(2);
        setTitle2('Canceled');
        setDes2('Order is canceled.');
        setStepStatus('error');
        break;
    }
    console.log(current);
    console.log(state);

    setOrderId(id)
    setShowModal(!showModal)
    // console.log(value)
    orderApi.getAllOrderDetailsByOrderId(id)
      .then((response) => {
        console.log(response.data)
        setOrderDetails(response.data)
      }).catch((error) => {
        console.log(error)
      })
  }



  // test
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      width: 150,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Customer Name',
      dataIndex: 'name',
    },
    {
      title: 'Total',
      dataIndex: 'total',
    },
    {
      title: 'Payment',
      dataIndex: 'payment',
      width: 150
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 200,
      filters: [
        {
          text: 'Pending',
          value: 'PENDING',
        },
        {
          text: 'Paid',
          value: 'PAID',
        },
      ],
      onFilter: (value, record) => record.status.props.children.indexOf(value) === 0,
    },
    {
      title: 'Shipping',
      dataIndex: 'shipping',
      width: 200,
      filters: [
        {
          text: 'Pending',
          value: 'PENDING',
        },
        {
          text: 'Delivering',
          value: 'DELIVERING',
        },
        {
          text: 'Done',
          value: 'DONE',
        },
        {
          text: 'Canceled',
          value: 'CANCELED',
        }
      ],
      onFilter: (value, record) => record.shipping.props.text.indexOf(value) === 0,
    },
    {
      title: 'Details',
      dataIndex: 'details',
      align: 'center'
    },
  ];

  const data = shopOrders.map((order, index) => {
    return {
      key: index + 1,
      id: order.id,
      name: order.customer,
      total: '$' + order.total,
      payment: order.paymentMethod.toUpperCase(),
      status: <Tag color={getColorTag(order.paymentStatus)}>{order.paymentStatus}</Tag>,
      shipping: <Badge status={getColorBadge(order.state)} text={order.state} />,
      details: <button className="font-medium text-blue-600 hover:underline text-center" onClick={() => handleViewModal(order.id, order.state)}>View</button>
    }
  });

  const onChange = (pagination, filters, sorter, extra) => {
    setPage(pagination.current);
    console.log('params', pagination, filters, sorter, extra);
  };

  const getColorTag = (status) => {
    switch (status) {
      case 'PENDING':
        return 'gold'
      case 'PAID':
        return 'green'
    }
  }

  const getColorBadge = (shipping) => {
    switch (shipping) {
      case 'PENDING':
        return 'warning'
      case 'DELIVERING':
        return 'processing'
      case 'DONE':
        return 'success'
      case 'CANCELED':
        return 'error'
    }
  }

  const handleKeyDown = (e) => {
    const newSearch = e.target.value.trim();
    if (e.key === 'Enter' && search !== newSearch) {
      setSearch(newSearch);
      setPage(1);
      searchRef.current.blur();
    }
  }

  const HandleClick = () => {
    const newSearch = searchRef.current.value.trim();
    if (search !== newSearch) {
      setSearch(newSearch);
      setPage(1);
    } else {
      searchRef.current.focus();
    }
  }

  const items = [
    {
      title: 'Pending',
      description: 'Order is on progress.',
    },
    {
      title: title1,
      description: des1,
    },
    {
      title: title2,
      description: des2,
    },
  ];


  const deliver = () => {
    setCurrent(current + 1);
    setTitle1('Delivering');
    setDes1('Order is delivering.');
  };

  const cancel = () => {
    setCurrent(current + 2);
    setTitle1('Canceling');
    setDes1('Order is canceling.');
    setTitle2('Canceled');
    setDes2('Order is canceled.');
    setStepStatus('error');
  };

  const next = (status) => {
    switch (status) {
      case 'DELIVERING':
        deliver();
        break;
      case 'CANCELED':
        cancel();
        break;
    }
    orderApi.editOrderState(orderId, status)
      .then((response) => {
        if (response.status === 200) {
          setUpdateStatus(true)
          message.success('Order shipping status is updated successfully!')
        }
      }
      ).catch((error) => {
        console.log(error)
        message.error('Order shipping status is updated failed!')
      })
  }

  return (
    <div className="bg-gray-300 p-10 w-4/5 absolute top-0 h-screen right-0">
      <h1 className="text-2xl text-center font-bold mb-10">Order Manage</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
        <div className="p-4 bg-white">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="flex flex-row">
              <>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  ref={searchRef}
                  type="text"
                  id="table-search"
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-lg"
                  placeholder="Search customer name"
                  onKeyDown={handleKeyDown}
                // onBlur={(e) => {
                //   console.log(e.target.value);
                //   setSearch(e.target.value);
                //   setPage(1);
                // }}
                />
              </>
              <button
                onClick={HandleClick}
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded-md">Search
              </button>
            </div>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10, current: page }}
          onChange={onChange}
        />
      </div>

      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none px-6">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold border-b-2">Order Detail</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-70 float-right text-3xl leading-none font-medium outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    &times;
                  </button>
                </div>
                {/*body*/}

                <div className="flex">

                  <div className="flex-1 w-56 mt-3 pr-2 border-r">
                    <Steps
                      direction="vertical"
                      size="small"
                      current={current}
                      items={items}
                      status={stepStatus}
                    />
                    <>
                      {current === 0 && (
                        <div className="mt-2">
                          <Button
                            className="mr-2"
                            type="primary" onClick={() => next('DELIVERING')}>
                            Deliver
                          </Button>

                          <Button type="primary" danger onClick={() => next('CANCELED')}>
                            Cancel
                          </Button>
                        </div>
                      )}
                    </>
                  </div>

                  <div className="flex flex-col w-auto justify-between">
                    <div className="overflow-hidden">
                      <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-white uppercase bg-neutral-500 opacity-90">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Quantity
                            </th>
                            <th scope="col" className="px-6 py-3 ">
                              Price
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderDetails ? orderDetails.map(detail => (
                            <tr key={detail.id} className="bg-white">
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                              >
                                {detail.productName}
                              </th>
                              <td className="px-6 py-4 text-left">{detail.productCategory}</td>
                              <td className="px-6 py-4 text-center">{detail.quantity}</td>
                              <td className="px-6 py-4">${(detail.price * detail.quantity)
                                .toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}</td>
                            </tr>
                          )) : ""}
                        </tbody>
                      </table>
                    </div>
                    <div className="p-3 text-xl font-bold">
                      Total: &nbsp; <p className="font-medium inline-block text-gray-500">{orderDetails ?
                        (`$${orderDetails.reduce((total, detail) =>
                          total + (detail.price * detail.quantity), 0)
                          .toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}`) : "$0"}</p>
                    </div>

                  </div>

                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}

    </div>
  )
}

export default ShopOrderManage
