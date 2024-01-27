import {
    Button,
    DatePicker,
    Form,
    Input,
    Select,
} from 'antd';
import { useState, useContext } from 'react';
import { NotificationContext } from '../../context/NotificationProvider';

import authApi from '../../api/authApi';
import { db } from '../../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const { Option } = Select;

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

const SignUpInformation = ({ phoneNumberRegister, passwordRegister, setIsVerified, setIsSignIn }) => {

    const openNotificationWithIcon = useContext(NotificationContext);

    const [form] = Form.useForm();
    const onFinish = (values) => {

        const dob = document.getElementById("register_date-picker").value;
        authApi.registerUser({
            email: values.email,
            fullName: values.fullName,
            dob: dob,
            gender: values.gender,
            phoneNumber: phoneNumberRegister,
            password: passwordRegister,
        })
            .then(res => {
                if(res.status === 201){
                    openNotificationWithIcon("Register success!", "Your account registered successfully! Please login to continue!")
                    setIsVerified(false);
                    setIsSignIn(true);
                    setDoc(doc(db, "userChats", phoneNumberRegister), {});
                }else if(res.status === 400){
                    openNotificationWithIcon("Register Fail!", "Your account registered Fail! Please try again!")
                }else if(res.status === 500){
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
                    name="fullName"
                    label="Full Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your full name!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="date-picker" label="Date of birth"
                    rules={[
                        {
                            required: true,
                            message: 'Please select date of birth!',
                        },
                    ]}

                >
                    <DatePicker format={'YYYY-MM-DD'} />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[
                        {
                            required: true,
                            message: 'Please select gender!',
                        },
                    ]}
                >
                    <Select placeholder="select your gender">
                        <Option value="1">Male</Option>
                        <Option value="0">Female</Option>
                    </Select>
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
export default SignUpInformation;