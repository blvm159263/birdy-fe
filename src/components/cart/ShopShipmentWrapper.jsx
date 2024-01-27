import { Select } from "antd";
import { useEffect, useState, useContext } from "react";
import shopApi from "../../api/shopApi";
import orderApi from "../../api/orderApi";
import { el } from "date-fns/locale";
import { NotificationContext } from '../../context/NotificationProvider';
import { set } from "date-fns";
import { async } from "q";

function ShopShipmentWrapper({ user, shipmentIds, setShipmentIds, shopId, address, totalShipment, setTotalShipment }) {
    const openNotificationWithIcon = useContext(NotificationContext);

    const [shipmentList, setShipmentList] = useState([]);
    const [shipmentPrice, setShipmentPrice] = useState(0);
    const [prevShipmentId, setPrevShipmentId] = useState(null);

    useEffect(() => {
        shopApi.getShipmentByShopId(shopId).then(res => {
            if (res.status === 200) {
                setShipmentList(res.data);
            } else if (res.status === 404) {
                setShipmentList([]);
            }

        }).catch(err => { console.log(err); });
    }, [])

    const onSelectedShipment = async (value) => {
        if (!address) {
            openNotificationWithIcon('Warning', 'Please select address first')
            return;
        }
        let price = 0;

        await orderApi.getShipmentPrice({
            shopId: shopId,
            addressId: address.id,
            shipmentId: value
        }).then(res => {
            if (res.status === 200) {
                price = res.data;
                console.log(price);
                setShipmentPrice(price);
            }
        }).catch(err => { console.log(err); });
        console.log(price);

        const shipment = {
            shipmentId: value,
            shipmentPrice: price,
        }

        if (prevShipmentId !== null) {
            var index = shipmentIds.findIndex(item => item.shipmentId === prevShipmentId.shipmentId)
            console.log(index);
            if (index !== -1) {
                //replace prevShipmentId with value
                shipmentIds[index] = shipment;
                setShipmentIds(shipmentIds);
                let total = 0;
                shipmentIds.forEach(item => {
                    total += item.shipmentPrice;
                });
                setTotalShipment(total);
            }
        } else {
            setShipmentIds([...shipmentIds, shipment]);
        }
        setPrevShipmentId(shipment);
    }


        return (
            <div className="bg-white rounded-sm mt-4 flex justify-between gap-4 items-center text-center p-2 drop-shadow-sm">
                <div className="col-span-7 font-bold">
                    Phương thức giao hàng
                    <Select
                        className="ml-4"
                        onChange={(value) => {
                            onSelectedShipment(value)
                        }}
                        options={shipmentList.map((shipment) => ({
                            label: shipment.shipmentTypeName,
                            value: shipment.id,
                        }))}
                        placeholder="Chọn phương thức"
                    />
                </div>
                <div className="col-span-2">
                    <span className="font-bold mr-16">${shipmentPrice.toFixed(3)}</span>
                </div>
            </div>
        )
    }

export default ShopShipmentWrapper
