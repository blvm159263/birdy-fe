

import {
    Button,
    DatePicker,
    Form,
    Input,
    Select,
} from 'antd';
import { useState } from 'react';

import accountApi from '../../api/accountApi';

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

    const [form] = Form.useForm();
    const onFinish = (values) => {

        const dob = document.getElementById("register_date-picker").value;
        const param = {
            email: values.email,
            fullName: values.fullName,
            dob: dob,
            gender: values.gender,
            phoneNumber: phoneNumberRegister,
            password: passwordRegister,
        }
        console.log(param)
        accountApi.register(param)
            .then(res => {
                if(res.status === 201){
                    alert("Create successfully!");
                    setIsVerified(false);
                    setIsSignIn(true);
                }else if(res.status === 400){
                    alert("Create fail!");
                }else if(res.status === 500){
                    alert("Backend lỗi rùi! Thử lại sau");
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