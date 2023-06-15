import { Select } from "antd";
import { useEffect, useState } from "react";
import shopApi from "../../api/shopApi";
import orderApi from "../../api/orderApi";

function ShopShipmentWrapper({ user, shipmentIds, setShipmentIds, shopId, address, totalShipment, setTotalShipment }) {

    const [shipmentList, setShipmentList] = useState([]);
    const [shipmentPrice, setShipmentPrice] = useState(0);
    const [prevShipmentId, setPrevShipmentId] = useState(0);

    useEffect(() => {
        shopApi.getShipmentByShopId(shopId).then(res => {
            if (res.status === 200) {
                setShipmentList(res.data);
            } else if (res.status === 404) {
                setShipmentList([]);
            }

        }).catch(err => { console.log(err); });
    }, [])
    
    const onSelectedShipment = (value) => {
        if(prevShipmentId !== 0){
            var index = shipmentIds.indexOf(prevShipmentId);
            if(index !== -1){
                //replace prevShipmentId with value
                shipmentIds[index] = value;
                setShipmentIds(shipmentIds);      
            }
        }else{
            setShipmentIds([...shipmentIds, value]);
        }
        setPrevShipmentId(value);
        
        orderApi.getShipmentPrice({
            shopId: shopId,
            addressId: address.id,
            shipmentId: value
        }).then(res => {
            if(res.status === 200){
                setShipmentPrice(res.data);
                setTotalShipment(totalShipment + res.data)
            }
        }).catch(err => { console.log(err); });
    };

    return (
        <div className='bg-white rounded-sm mt-4 flex justify-between gap-4 items-center text-center p-2 drop-shadow-sm'>
            <div className="col-span-7 font-bold">
                Shipment Type:
                <Select
                    className="ml-4"
                    onChange={(value) => {onSelectedShipment(value)}}
                    options={shipmentList.map((shipment) => ({
                        label: shipment.shipmentTypeName,
                        value: shipment.id,
                    }))}
                    placeholder="Shipment Type"
                />
            </div>
            <div className="col-span-2">
                <span className='font-bold mr-16'>${shipmentPrice.toFixed(2)}</span>
            </div>
        </div>
    )
}

export default ShopShipmentWrapper;