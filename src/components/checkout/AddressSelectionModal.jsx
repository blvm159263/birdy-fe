
import { useState, useEffect } from 'react';
import { Modal, Radio, Space, Button } from 'antd';
import userApi from '../../api/userApi';
import NewAddressModal from './NewAddressModal';

function AddressSelectionModal({ user, setAddress, setModalOpen, modalOpen }) {

    // console.log(Country.getCountryByCode('VN'));
    // console.log(State.getStatesOfCountry('VN'));

    const [value, setValue] = useState(1);
    const [addressList, setAddressList] = useState([]);
    const [newAddressModalOpen, setNewAddressModalOpen] = useState(false);

    useEffect(() => {
        if (user) {
            userApi.getAllAddress(user.id).then(res => {
                if (res.status === 200) {
                    setAddressList(res.data);
                }
            }).catch(err => {
                console.log(err);
            })
        }

    }, [user])


    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const onSubmit = () => {
        setModalOpen(false);
        setAddress(value);
    }

    const onNew = () => {
        setModalOpen(false);
        setNewAddressModalOpen(true);
    }


    return (
        <>
            <Modal
                style={{
                    top: 100,
                    width: 1000,
                }}
                open={modalOpen}
                onOk={() => { onSubmit() }}
                onCancel={() => setModalOpen(false)}
                cancelButtonProps={{ className: 'bg-white-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded-full text-center pb-7' }}
                okButtonProps={{ className: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-center pb-7' }}
            >
                <div className='font-bold text-lg pb-3 border-b-2'>Địa chỉ của tôi</div>

                <Radio.Group className='mt-6 ' onChange={onChange} value={value}>
                    <Space direction="vertical">
                        {addressList.map(address => (
                            <Radio key={address.id} className='w-full pb-3 border-b-2' value={address}>{address.address}</Radio>
                        ))
                        }
                        <Button onClick={onNew} className='mt-4 outline-dashed outline-1' >Thêm mới</Button>
                    </Space>
                </Radio.Group>
            </Modal>
            <NewAddressModal user={user} setAddress={setAddress} setModalOpen={setModalOpen}
                addressList={addressList} setAddressList={setAddressList} newAddressModalOpen={newAddressModalOpen} setNewAddressModalOpen={setNewAddressModalOpen} />
        </>
    )
}

export default AddressSelectionModal;