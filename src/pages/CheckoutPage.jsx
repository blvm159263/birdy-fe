import React, { useState, useContext, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { deleteAllSelected } from "../features/cart/cartSlice"
import ShopWrapper from "../components/cart/ShopWrapper"
import { Button } from "antd"
import { LoginContext } from "../context/LoginProvider"
import { useNavigate } from "react-router-dom"
import userApi from "../api/userApi"
import jwtDecode from "jwt-decode"
import storageService from "../api/storage"
import AddressSelectionModal from "../components/checkout/AddressSelectionModal"
import ShopShipmentWrapper from "../components/cart/ShopShipmentWrapper"
import paymentApi from "../api/paymentApi"
import orderApi from "../api/orderApi"
import { NotificationContext } from "../context/NotificationProvider"

export default function CheckoutPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isLogin } = useContext(LoginContext)
  const openNotificationWithIcon = useContext(NotificationContext)

  const items = useSelector((state) =>
    state.cart.items.filter((item) => item.selected === true)
  )
  console.log(items)
  const shopIds = items
    .map((item) => item.shopId)
    .filter((shopId, index, shopIds) => shopIds.indexOf(shopId) === index)
  const totalSelectedProduct = items
    .filter((item) => item.selected === true)
    .reduce((total, { quantity }) => total + quantity, 0)
  const totalSelectedPrice = items
    .filter((item) => item.selected === true)
    .reduce((total, { quantity, price }) => total + quantity * price, 0)
  const [address, setAddress] = useState()
  const [user, setUser] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [totalShipment, setTotalShipment] = useState(0)
  const [shipmentIds, setShipmentIds] = useState([])

  useEffect(() => {
    if (!isLogin) {
      navigate("/login")
      return
    }
    window.scrollTo(0, 0)
    var token = jwtDecode(storageService.getAccessToken())
    getUser(token)
  }, [])

  const getUser = async (token) => {
    let userId
    await userApi.getUserByPhoneNumber(token.sub).then((res) => {
      setUser(res.data)
      userId = res.data.id
    })
    await userApi
      .getDefaultAddress(userId)
      .then((res) => {
        setAddress(res.data)
      })
      .catch((err) => {
        setAddress(null)
      })
  }

  const onCheckout = async () => {
    var amount = ((totalSelectedPrice + totalShipment) * 23000).toFixed(0)
    amount = Math.round(amount / 1000) * 1000

    var orderList = []
    shipmentIds.forEach((shipmentId, index) => {
      var order = {
        id: null,
        code: "",
        createDate: null,
        state: "PENDING",
        comment: "",
        shipmentId: shipmentId,
        shipmentType: "",
        paymentMethodId: 3,
        paymentTypeName: "",
        orderParenId: null,
        paymentStatus: "PENDING",
        addressId: address.id,
        address: "",
      }
      orderList.push(order)
    })
    var orderDetailList = []
    items.forEach((item, index) => {
      var orderDetail = {
        id: null,
        quantity: item.quantity,
        price: item.price,
        rating: 0,
        comment: "",
        productId: item.id,
        productName: "",
        orderId: null,
      }
      orderDetailList.push(orderDetail)
    })
    var params = { orderList: orderList, orderDetailList: orderDetailList }
    var code
    await orderApi
      .createOrder(params)
      .then((res) => {
        if (res.status === 200) {
          code = res.data
          openNotificationWithIcon(
            "Place order successfully!",
            "Redirecting to payment page..."
          )
        }
      })
      .catch((err) => {
        openNotificationWithIcon(
          "Place order failed!",
          "Please try again later..."
        )
      })
    if (code) {
      await paymentApi
        .getQRMomo({ amount: amount, orderId: code })
        .then((res) => {
          window.location.href = res.data.payUrl
          dispatch(deleteAllSelected())
        })
    }
    // await paymentApi.getQRMomo({amount : amount}).then(res => {
    //     window.location.href = res.data.payUrl;
    // })
  }

  return (
    <div id="checkout" className="bg-neutral-100 py-6 pb-12">
      <section className="container mx-auto">
        <div className="grid grid-cols-7 text-center bg-white rounded-sm p-2">
          <div className="col-span-3 text-left font-bold">Shipping address</div>
        </div>
        <div className="grid grid-cols-7 text-center bg-white rounded-sm p-2">
          <div className="col-span-2 text-left ">{user?.fullName}</div>
          <div className="col-span-4">
            {address ? address.address : "Don't have default address"}
          </div>
          <div className="col-span-1 underline text-cyan-500">
            <Button type="link" onClick={() => setModalOpen(true)}>
              Change
            </Button>
            <AddressSelectionModal
              user={user}
              address={address}
              setAddress={setAddress}
              setModalOpen={setModalOpen}
              modalOpen={modalOpen}
            />
          </div>
        </div>

        <div className="grid grid-cols-7 text-center bg-white rounded-sm p-2 mt-3">
          <div className="col-span-3 text-left font-bold">Product</div>
          <div className="col-span-1">Type</div>
          <div className="col-span-1">Price</div>
          <div className="col-span-1">Quantity</div>
          <div className="col-span-1 font-bold">Total</div>
        </div>
        {shopIds.map((shopId) => {
          const itemsInShop = items.filter((item) => item.shopId === shopId)
          return (
            <div key={shopId}>
              <ShopWrapper
                key={shopId}
                shopId={shopId}
                itemsInShop={itemsInShop}
                hideControl={true}
              />
              <ShopShipmentWrapper
                key={shopId + 1000}
                user={user}
                address={address}
                totalShipment={totalShipment}
                setTotalShipment={setTotalShipment}
                shopId={shopId}
                itemsInShop={itemsInShop}
                shipmentIds={shipmentIds}
                setShipmentIds={setShipmentIds}
              />
            </div>
          )
        })}

        <div className="bg-white rounded-sm mt-4 flex justify-between gap-4 items-center text-center p-2 drop-shadow-sm">
          <div className="col-span-3">
            Total (<span className="font-bold">{totalSelectedProduct}</span>{" "}
            products):
          </div>
          <div className="col-span-6">
            <span className="font-bold">
              ${totalSelectedPrice.toFixed(2)} + ${totalShipment.toFixed(2)} = $
              {(totalSelectedPrice + totalShipment).toFixed(2)}
            </span>
          </div>
          <div className="col-span-2">
            {totalSelectedProduct === 0 ||
            shipmentIds.length !== shopIds.length ||
            address === null ? (
              <span
                to="/cart/checkout"
                className="py-1 px-4 w-full rounded-sm text-white bg-gradient-to-r from-neutral-500 via-neutral-600 to-neutral-400"
              >
                Checkout
              </span>
            ) : (
              <button
                to="/cart/checkout"
                onClick={onCheckout}
                className="py-1 px-4 w-full rounded-sm text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-400"
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
