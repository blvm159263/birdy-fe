
import { useState, useContext } from 'react';
import { Modal, Space, Select, Checkbox } from 'antd';
import { State, City } from 'country-state-city';
import userApi from '../../api/userApi';
import TextArea from 'antd/es/input/TextArea';
import addressApi from '../../api/addressApi';
import { useEffect } from 'react';
import { NotificationContext } from '../../context/NotificationProvider';

const provinceData = State.getStatesOfCountry('VN');


function NewAddressModal({ user, setModalOpen, addressList, setAddressList, newAddressModalOpen, setNewAddressModalOpen }) {

    const openNotificationWithIcon  = useContext(NotificationContext);

    const [province, setProvince] = useState();
    const [city, setCity] = useState();
    const [cities, setCities] = useState([]);
    const [isCheckDefault, setIsCheckDefault] = useState(false);
    const [address, setAddress] = useState('');


    const handleProvinceChange = (value) => {
        if (value) {
            setProvince(value);
            setCities(City.getCitiesOfState('VN', provinceData.find((province) => province.name === value).isoCode));
        }else{

        }

    };
    useEffect(() => {
        setCities([]);
        setCity();
        setProvince();
        setIsCheckDefault(false);
        setAddress('');
    }, [newAddressModalOpen])

    const onCityChange = (value) => {
        setCity(value);
    };

    const onSubmit = () => {
        if(!province || !city || !address){
            openNotificationWithIcon("Error", "Please fill in all the fields!")
            return;
        }
        var params = {
            address: address + ', ' + city + ', ' + province,
            isDefault: isCheckDefault,
            userId: user.id,
            fullName: user.fullName,
        }
        addNewAddress(params);
    }

    const addNewAddress = async (params) => {
        let newId;
        await userApi.addAddress(params).then(res => {
            if (res.status === 201) {
                newId = res.data;
            }else{
                console.log('fail');
            }
        });
        if(newId){
            await addressApi.getAddressById(newId).then(res => {
                if(res.status === 200){
                    setAddressList([...addressList, res.data]);
                    setModalOpen(true);
                    setNewAddressModalOpen(false)
                    openNotificationWithIcon("Success", "Address added successfully!")
                }else{
                    console.log('fail');
                }
            })
        }
    }

    const isChecked = (e) => {
        setIsCheckDefault(e.target.checked);
    }


    return (
        <Modal
            style={{
                top: 100,
                width: 1000,
            }}
            open={newAddressModalOpen}
            onOk={() => { onSubmit() }}
            onCancel={() => { setModalOpen(true); setNewAddressModalOpen(false) }}
            cancelButtonProps={{ className: 'bg-white-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded-full text-center pb-7' }}
            okButtonProps={{ className: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-center pb-7' }}
        >
            <div className='font-bold text-lg pb-3 border-b-2'>Thêm địa chỉ mới</div>
            <Space className='mt-6' wrap>
                <Select
                
                    style={{
                        width: 225,
                    }}
                    onChange={handleProvinceChange}
                    options={provinceData.map((province) => ({
                        label: province.name,
                        value: province.name,
                    }))}
                    placeholder="Tỉnh, Thành phố"
                />
                <Select
                    style={{
                        width: 225,
                    }}

                    onChange={onCityChange}
                    options={cities.map((city) => ({
                        label: city.name,
                        value: city.name,
                    }))}
                    placeholder="Huyện, Xã"
                />
                <TextArea style={{
                    width: 460
                }} placeholder='Địa chỉ cụ thể' onChange={(e) => setAddress(e.target.value)} />
                <Checkbox onChange={isChecked}>Đặt làm địa chỉ mặc định</Checkbox>
            </Space>
        </Modal>
    )
}

export default NewAddressModal;