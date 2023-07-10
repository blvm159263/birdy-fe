import React, { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setGender } from "../../../features/user/userSlice"
import isLoadingPage from "../../loading/isLoadingPage"
import userApi from "../../../api/userApi"
import {
  DatePicker,
  Form,
  Input,
  Select,
  Avatar,
  Button
} from 'antd';
import { NotificationContext } from "../../../context/NotificationProvider"
import { format } from "date-fns"
import moment from "moment"
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
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function UserInfor({ isLoading }) {
  const userInformation = useSelector((state) => state.user.userInformation)
  const openNotificationWithIcon = useContext(NotificationContext)

  const [user, setUser] = useState({
    id: null,
    accountId: "",
    fullName: "",
    email: "",
    dob: "",
    createDate: "",
    gender: null,
    avatarUrl: null,
    phoneNumber: "",
    balance: null,
  })

  useEffect(() => {
    if (userInformation) {
      setUser((prevUser) => ({
        ...prevUser,
        id: userInformation.id || "",
        accountId: userInformation.accountId || "",
        fullName: userInformation.fullName || "",
        email: userInformation.email || "",
        dob: userInformation.dob || "",
        createDate: userInformation.createDate || "",
        gender: userInformation.gender || null,
        avatarUrl: userInformation.avatarUrl || null,
        phoneNumber: userInformation.phoneNumber || "",
      }))
    }
    console.log("userApi", userInformation)
  }, [userInformation])

  const handleChange = (evt) => {
    const { value, name } = evt.target

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
      gender: value,
    }))

    console.log("update", user)
    console.log("update", user.gender)
    // console.log(typeof value, name)
  }

  const updateUser = (user) => {
    userApi
      .updateUserInformation(user)
      .then((response) => {
        console.log(response.data)
        setTimeout(() => {
          openNotificationWithIcon("Update Information completed !!!")
        }, 500)
      })
      .catch((e) => console.log(e))
  }

  useEffect(() => {
    setUser(user)
    console.log("newUser", user)
  }, [user])

  const handleUpdateInfor = (e) => {
    e.preventDefault()
    updateUser(user)
  }

  const onReset = () => {
  }

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    console.log('dob: ' + values.dob.format('YYYY-MM-DD'));
    const userTmp = {
      id: userInformation.id,
      fullName: values.fullName,
      email: values.email,
      dob:  values.dob.format('YYYY-MM-DD'),
      createDate: userInformation.createDate,
      gender: values.gender == "Male" ? 1 : 0,
      avatarUrl: userInformation.avatarUrl,
      accountId: userInformation.accountId,
      phoneNumber: userInformation.phoneNumber,
      balance: null,
    }
  }

  return (
    <div className="w-5/6 bg-white">
      <h1 className="py-6 text-center text-2xl font-bold">Your Information</h1>
      <hr />
      {isLoading ? (
        <isLoadingPage />
      ) : (
        <div className='grid grid-cols-9'>
          <div className="col-span-6">
            <Form
              {...formItemLayout}
              style={{
                maxWidth: 600,
                padding: 40,
              }}
              onFinish={onFinish}
              initialValues={{
                fullName: userInformation?.fullName,
                phoneNumber: userInformation?.phoneNumber,
                email: userInformation?.email,
                dob: moment(userInformation?.dob, 'YYYY-MM-DD'),
                gender: userInformation?.gender===1 ? "Male": "Female",
              }}
            >

              <Form.Item
                name="fullName"
                label="Full Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your fullName!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                value={userInformation.phoneNumber}
                hasFeedback
              >
                <Input readOnly disabled />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your Email!',
                    whitespace: false,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="dob"
                label="Birthday"
                rules={[
                  {
                    type: 'object',
                    required: true,
                    message: 'Please input your Birthday!',
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Select your gender"
                //onChange={onGenderChange}
                //allowClear
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button style={{marginRight: 10}} type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="col-span-3 h-full">
            <Avatar
              style={{
                margin: 'auto',
                display: 'block',
                verticalAlign: 'middle',
                marginTop: '50px',
              }}
              size={{
                xs: 40,
                sm: 64,
                md: 80,
                lg: 100,
                xl: 120,
                xxl: 140,
              }}
              src={userInformation.avatarUrl}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserInfor
