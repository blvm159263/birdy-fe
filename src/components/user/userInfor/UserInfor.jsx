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
  Button,
  Upload
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { NotificationContext } from "../../../context/NotificationProvider"
import moment from "moment"
import storageService from "../../../api/storage"
import { useNavigate } from "react-router-dom"
import jwtDecode from "jwt-decode"

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
  const navigate = useNavigate()
  const [form] = Form.useForm();
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
  const [avatar, setAvatar] = useState()


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
    let token = storageService.getAccessToken()
    if (token) {
      token = jwtDecode(token)
      userApi.getUserByPhoneNumber(token.sub).then((response) => {
        setUser(response.data)
        form.setFieldsValue({
          fullName: response.data.fullName,
          phoneNumber: response.data.phoneNumber,
          email: response.data.email,
          dob: moment(response.data.dob, 'YYYY-MM-DD'),
          gender: response.data.gender === 1 ? "Male" : "Female",
        })
        setAvatar(response.data.avatarUrl)
      }
      ).catch((e) => {
        console.log(e)
      })
    } else {
      navigate("/login")
    }
  }, [])

  const handleUpdateInfor = (e) => {
    e.preventDefault()
    updateUser(user)
  }

  const onReset = () => {
    form.setFieldsValue({
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      dob: moment(user.dob, 'YYYY-MM-DD'),
      gender: user.gender === 1 ? "Male" : "Female",
    })
  }

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    console.log('dob: ' + values.dob.format('YYYY-MM-DD'));
    var isExistedEmail = false;
    await userApi.isEmailExist(user.id, values.email).then((response) => {
      console.log(response.data);
      isExistedEmail = response.data;
    }).catch((e) => {
      console.log(e);
    });
    if (isExistedEmail) {
      openNotificationWithIcon('Email is existed !!!');
      return;
    }
    const userTmp = {
      id: user.id,
      fullName: values.fullName,
      email: values.email,
      dob: values.dob.format('YYYY-MM-DD'),
      createDate: user.createDate,
      gender: values.gender === "Male" ? 1 : 0,
      avatarUrl: user.avatarUrl,
      accountId: user.accountId,
      phoneNumber: user.phoneNumber,
      balance: null,
    }
    await userApi.updateUserInformation(userTmp).then((response) => {
      console.log(response.data);
      openNotificationWithIcon('Completed', 'Update information successfully !!!');
      setUser(userTmp);
    }
    ).catch((e) => {
      console.log(e);
    }
    );
  }

   const handleChangeAvatar = (info) => {
    userApi.uploadAvatar(user.id, {file: info.file.originFileObj}).then((response) => {
      console.log(response.data);
      setUser((prevState) => ({
        ...prevState,
        avatarUrl: response.data,
      }));
      setAvatar(response.data);
    }
    ).catch((e) => {
      console.log(e);
    }
    );
   }

  return (
    <div className="w-5/6 bg-white">
      <h1 className="py-6 text-center text-2xl font-bold">Thông tin</h1>
      <hr />
      {isLoading ? (
        <isLoadingPage />
      ) : (
        <div className='grid grid-cols-9'>
          <div className="col-span-6">
            <Form
              {...formItemLayout}
              form={form}
              style={{
                maxWidth: 600,
                padding: 40,
              }}
              onFinish={onFinish}
            // initialValues={{
            //   fullName: userInformation?.fullName,
            //   phoneNumber: userInformation?.phoneNumber,
            //   email: userInformation?.email,
            //   dob: moment(userInformation?.dob, 'YYYY-MM-DD'),
            //   gender: userInformation?.gender===1 ? "Male": "Female",
            // }}
            >

              <Form.Item
                name="fullName"
                label="Họ và tên"
                rules={[
                  {
                    required: true,
                    message: 'Hãy nhập Họ tên!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                label="Số điện thoại"
              >
                <Input readOnly disabled />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    type: 'email',
                    message: 'Email không hợp lệ!',
                  },
                  {
                    required: true,
                    message: 'Hãy nhập Email!',
                    whitespace: false,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="dob"
                label="Ngày sinh"
                rules={[
                  {
                    type: 'object',
                    required: true,
                    message: 'Hãy nhập ngày sinh!',
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                name="gender"
                label="Giới tính"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Chọn giới tính"
                //onChange={onGenderChange}
                allowClear={false}
                >
                  <Option value="Male">Name</Option>
                  <Option value="Female">Nữ</Option>
                </Select>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button style={{ marginRight: 10 }} type="primary" htmlType="submit">
                  Cập nhật
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Xóa
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="col-span-3 h-full flex flex-col justify-center items-center">
            <Avatar
              style={{
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
              src={avatar? avatar : ""}
            />
            <Upload
              name="file"
              onChange={handleChangeAvatar}
              showUploadList={false}
            >
              <Button
                style={{
                  margin: 'auto',
                  display: 'block',
                  marginTop: '50px',
                  display: 'block',
                }}
                icon={<UploadOutlined />}
              >
                Tải ảnh lên
              </Button>
            </Upload>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserInfor
