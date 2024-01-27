import {
    Button,
    DatePicker,
    Form,
    Input,
    Select,
} from 'antd';
import { useState, useContext } from 'react';
import { NotificationContext } from '../../../context/NotificationProvider';

import authApi from '../../../api/authApi';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../config/firebaseConfig';


const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const ShopInformation = ({ phoneNumberRegister, passwordRegister, setIsVerified, setIsSignIn }) => {

    const openNotificationWithIcon = useContext(NotificationContext);

    const [form] = Form.useForm();
    const onFinish = (values) => {

        authApi.registerShop({
            email: values.email,
            shopName: values.shopName,
            address: values.address,
            phoneNumber: phoneNumberRegister,
            password: passwordRegister,
        })
            .then(res => {
                if (res.status === 201) {
                    setDoc(doc(db, "userChats", phoneNumberRegister), {});
                    openNotificationWithIcon("Register success!", "Your account registered successfully! Please login to continue!")
                    setIsVerified(false);
                    setIsSignIn(true);
                } else if (res.status === 400) {
                    openNotificationWithIcon("Register Fail!", "Your account registered Fail! Please try again!")
                } else if (res.status === 500) {
                    openNotificationWithIcon("Error", "Server error! Please try again!")
                }
            });
    };

    return (
        <div className="lg:w-1/2 sm:w-full p-5 sm:mx-auto">

            <Form
                {...formItemLayout}
                form={form}
                name="register"
                className="lg:w-full sm:w-full bg-white p-10 rounded-md"
                onFinish={onFinish}
                initialValues={{
                    residence: ['zhejiang', 'hangzhou', 'xihu'],
                    prefix: '86',
                }}
                style={{
                    maxWidth: 500,
                }}
                scrollToFirstError
            >
                <h1 className="text-3xl mb-4">
                    Information
                </h1>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="shopName"
                    label="Shop Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your shop name!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Address"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your address!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>



                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary"
                        style={{
                            backgroundColor: "#00BFFF",
                        }}
                        htmlType="submit"
                    >
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default ShopInformation;