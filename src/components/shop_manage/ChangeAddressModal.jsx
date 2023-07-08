import { Input, Modal, Select } from "antd";
import { City, State } from "country-state-city";
import { useEffect } from "react";
import { useState } from "react";

export default function ChangeAddressModal({setAddress}) {
  const [isOpen, setOpen] = useState(false);
  const provinces = State.getStatesOfCountry("VN");
  const [cities, setCities] = useState(null);
  const [addressDetail, setAddressDetail] = useState(null);
  const [city, setCity] = useState(null);
  const [province, setProvince] = useState(null);

  const onProvinceChange = (value) => {
    if (value) {
      setProvince(value);
      setCities(
        City.getCitiesOfState(
          "VN",
          provinces.find((province) => province.name === value).isoCode
        )
      );
    }
  };

  const onCancel = () => {
    setOpen(false);
    setCity(null);
    setProvince(null);
    setAddressDetail(null);
  };

  const onConfirm = () => {
    const fullAddress = addressDetail + ', ' + city + ', ' + province;
    setAddress(fullAddress);
    setOpen(false);
  };

  useEffect(() => {});

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sky-500 underline text-sm hover:text-sky-300 active:text-sky-500 duration-150"
      >
        Change address
      </button>
      <Modal
        title="Enter new address"
        open={isOpen}
        okText="Confirm"
        onOk={onConfirm}
        onCancel={onCancel}
        okButtonProps={{
            disabled: !province || !city || !addressDetail || !(addressDetail.length > 5)
        }}
      >
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Select
            onChange={onProvinceChange}
            options={provinces.map((province) => ({
              label: province.name,
              value: province.name,
            }))}
            value={province}
            placeholder="Tỉnh, Thành phố"
          />
          {province ? (
            <Select
              onChange={(value) => setCity(value)}
              options={cities.map((city) => ({
                label: city.name,
                value: city.name,
              }))}
              value={city}
              placeholder="Huyện, Xã"
            />
          ) : (
            ""
          )}
        </div>
        {city ? <Input placeholder="Số nhà, đường" value={addressDetail} onChange={(e) => setAddressDetail(e.target.value)} /> : ""}
      </Modal>
    </>
  );
}
