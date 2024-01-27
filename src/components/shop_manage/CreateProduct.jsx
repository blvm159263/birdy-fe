import React, {useContext, useEffect, useRef, useState} from "react"
import {DatePicker, Modal, Select, Upload} from "antd"
import {PlusOutlined} from "@ant-design/icons"
import productApi from "../../api/productApi"
import {NotificationContext} from "../../context/NotificationProvider"
import {LoginContext} from "../../context/LoginProvider"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import shopApi from "../../api/shopApi";
import {useNavigate} from "react-router-dom";

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })

function CreateProduct() {
    const openNotificationWithIcon = useContext(NotificationContext)
    const { shopId } = useContext(LoginContext)

    const [error, setError] = useState(null)
    const [errorSub, setErrorSub] = useState(null)
    const [message, setMessage] = useState(null)
    const [category, setCategory] = useState("Bird")
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState("")
    const [subImages, setSubImages] = useState([])
    const [imageMain, setImageMain] = useState([])
    const [gender, setGender] = useState(null)
    const [nameLength, setNameLength] = useState(0)
    const [des, setDes] = useState("")
    const [desLength, setDesLength] = useState(0)
    const navigate = useNavigate();
    const [isCreated, setCreated] = useState(false);
    // const textAreaRef = useRef(null);

    useEffect(() => {
        console.log(isCreated);
    }, [isCreated]);

    const modules = {
        toolbar: [
            [{ size: [] }],
            [{ font: [] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, "link"],
            [{ header: 1 }, { header: 2 }],
            [{ align: ["right", "center", "justify"] }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
        ],
    }

    function resetAllStates() {
        setError(null)
        setErrorSub(null)
        setMessage(null)
        setCategory("bird");
        setPreviewOpen(false);
        setPreviewImage("")
        setSubImages([])
        setImageMain([])
        setGender(null)
        setNameLength(0)
        setDes("")
        setDesLength(0)
    }

    const formats = [
        "size",
        "font",
        "bold",
        "italic",
        "underline",
        "strike",
        "color",
        "link",
        "header",
        "align",
        "indent",
        "list",
        "bullet",
    ]

    const quillRef = useRef(null)
    // const [code, setCode] = useState('');
    const handleProcedureContentChange = (content) => {
        // console.log(content);
        if (quillRef.current) {
            const quill = quillRef.current.getEditor()
            const length = quill.getLength() - 1
            // const length = text.replace(/\n/g, '').replace(/ /g, '').length;
            // console.log('Length:', length);
            setDesLength(length)
            if (length > 3000) {
                quill.deleteText(3000, length)
            } else if (length === 0) {
                setDes(null)
            } else {
                setDes(content)
            }
        }
    }

    const onChangeName = (e) => {
        setNameLength(e.target.value.length)
    }


    const handleCancel = () => setPreviewOpen(false)
    const handlePreview = async (file) => {
        if (!file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setPreviewImage(file.preview)
        setPreviewOpen(true)
        //setPreviewTitle(file.name);
    }
    const handleSubImages = ({ fileList: newFileList }) => {
        setError(null)
        for (var i = 0; i < newFileList.length; i++) {
            if (
                newFileList[i].type !== "image/jpeg" &&
                newFileList[i].type !== "image/png" &&
                newFileList[i].type !== "image/jpg"
            ) {
                newFileList[i].status = "error"
                setErrorSub("Only JPG/PNG file can be uploaded!")
            } else {
                newFileList[i].status = "done"
                setErrorSub(null)
            }
        }
        setSubImages(newFileList)
    }

    const handleImageMain = ({ fileList: newFileList }) => {
        setMessage(null)
        for (var i = 0; i < newFileList.length; i++) {
            if (
                newFileList[i].type !== "image/jpeg" &&
                newFileList[i].type !== "image/png" &&
                newFileList[i].type !== "image/jpg"
            ) {
                newFileList[i].status = "error"
                setError("Only JPG/PNG file can be uploaded!")
            } else {
                newFileList[i].status = "done"
                setError(null)
            }
        }
        setImageMain(newFileList)
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload ({subImages.length}/9)
            </div>
        </div>
    )

    const uploadButtonMain = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload (0/1)
            </div>
        </div>
    )

    const genders = ["M/F", "Male", "Female"]
    const categories = ["Bird", "Accessories", "Food"]

    const getValue = (list) => {
        const parsedList = list.reduce((acc, item) => {
            const [key, value] = item.split("=")
            if (!acc[key]) {
                acc[key] = []
            }
            acc[key].push(value)
            return acc
        }, {})

        const combinedStrings = Object.entries(parsedList).map(([key, values]) => ({
            key,
            value: values.join("x"),
        }))

        return combinedStrings
    }

    const getCategoryId = function () {
        for (let cate of categories) {
            if (category === cate) {
                return categories.indexOf(cate) + 1
            }
        }
    }

    const getGenderId = function () {
        for (let gen of genders) {
            if (gender === gen) {
                return genders.indexOf(gen) === 0 ? null : genders.indexOf(gen)
            }
        }
    }

    const parseDateString = (dateString) => {
        const [day, month, year] = dateString.split("/")
        const parsedDate = new Date(`${year}-${month}-${day}`)
        return parsedDate.toISOString()
    }

    const onSubmit = async (list) => {
        const values = getValue(list)

        const haveShipmentInfo = await shopApi.getShipmentByShopId(shopId).then((response) => {
            return response.data?.length >= 3
        }).catch((error) => {
            return false;
        })

        if(!haveShipmentInfo) {
            openNotificationWithIcon('Từ từ đã', 'Hãy cập nhật thông tin giao hàng trước khi thêm sản phẩm mới');
            navigate("/delivery");
            return;
        }

        for (let item of values) {
            if (item.value === "" || item.value === "xx") {
                item.value = null
            }
        }
        const date = values.find((item) => item.key === "expDate")?.value || null

        var productDto = {
            id: null,
            productName: values.find((item) => item.key === "name")?.value || null,
            imageMain: null,
            unitPrice: values.find((item) => item.key === "price")?.value,
            salePtc: 0,
            quantity: values.find((item) => item.key === "quantity")?.value || 0,
            rating: 0,
            createDate: new Date().toISOString(),
            species: values.find((item) => item.key === "species")?.value || null,
            age: values.find((item) => item.key === "age")?.value || null,
            gender: getGenderId(),
            color: values.find((item) => item.key === "color")?.value || null,
            // expDate: values.find((item) => item.key === 'expDate')?.value || null,
            expDate: date ? parseDateString(date) : null,
            madeIn: values.find((item) => item.key === "made-in")?.value || null,
            weight: values.find((item) => item.key === "weight")?.value || null,
            size: values.find((item) => item.key === "size")?.value || null,
            material: values.find((item) => item.key === "material")?.value || null,
            // description: values.find((item) => item.key === 'description')?.value || null,
            description: des === "" ? null : des,
            brandName: values.find((item) => item.key === "brand")?.value || null,
            state: 0,
            categoryId: getCategoryId(),
            categoryName: category,
            shopId: shopId,
            shopName: "shop name",
            isDisabled: false,
            isWarned: false,
            isBanned: false,
        }

        const listFile = []
        for (let subImage of subImages) {
            listFile.push(subImage.originFileObj)
        }

        const params = {
            productDTO: JSON.stringify(productDto),
            mainImage: imageMain[0].originFileObj,
            subImages: listFile,
        }

        // productDto.imageMain = params.mainImage === undefined ? null : params.mainImage;
        // productDto.subImages = params.subImages;
        console.log(params)
        productApi
          .addNewProduct(params)
          .then((res) => {
              console.log(res)
              if (res.status === 201) {
                  openNotificationWithIcon("Success", "Add new product successfully!")
                  resetAllStates();
                  setCreated(state => !state);
              }
          })
          .catch((err) => {
              console.log(err)
              openNotificationWithIcon("Failed", "Image size is too big!")
          })
    }

    const handleEntailmentRequest = (e) => {
        e.preventDefault()
    }

    return (
        <div className="bg-gray-200 p-4 col-span-9 min-h-screen">
            <h1 className="text-2xl text-center font-bold mb-5">Create new product</h1>

            <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="p-4 bg-white">

                    <form encType="multipart/form-data" className="w-full p-3 text-sm text-left text-gray-500 bg-white-700 dark:text-gray-400"
                        onSubmit={(e) => {
                            if (imageMain.length === 0) {
                                handleEntailmentRequest(e);
                                setMessage('Please upload main image!');

                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                });
                            }
                            else if (error !== null || errorSub !== null) {
                                handleEntailmentRequest(e);

                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                });
                            }
                            else {
                                setMessage(null);
                                handleEntailmentRequest(e);
                                var list = [];
                                for (var i = 0; i < e.target.length; i++) {
                                    if (e.target[i].name !== '') {
                                        list.push(e.target[i].name + '=' + e.target[i].value);
                                    }
                                    // console.log(e.target[i].id);
                                }
                                onSubmit(list);
                            }
                        }}>
                        <div className="mb-7">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                <p className="text-red-500 inline-block">*</p> Name
                            </label>
                            <div className="flex flex-wrap items-stretch w-full relative">
                                <input type="text"
                                    id="name"
                                    onChange={onChangeName}
                                    maxLength={120}
                                    required
                                    name="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 flex-shrink flex-grow w-px flex-1 text-sm rounded-lg rounded-r-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block p-2.5 relative"
                                    placeholder="product name" />
                                <div className="flex">
                                    <span className="flex items-center leading-normal bg-white rounded-lg rounded-l-none border border-l-0 border-gray-300 p-2.5 whitespace-no-wrap text-grey-dark text-sm">{nameLength + "/120"}</span>
                                </div>
                            </div>
                        </div>
                        <div className="mb-7">
                            <label
                                htmlFor="mainImage"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                <p className="text-red-500 inline-block">*</p> Main Image
                                <p className="text-red-500">{message || error}</p>
                            </label>
                            <Upload
                                id="mainImage"
                                listType="picture-card"
                                fileList={imageMain}
                                onPreview={handlePreview}
                                onChange={handleImageMain}
                            >
                                {imageMain.length >= 1 ? null : uploadButtonMain}
                            </Upload>
                            <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
                                <img
                                    alt="example"
                                    style={{
                                        width: "100%",
                                    }}
                                    src={previewImage}
                                />
                            </Modal>
                        </div>
                        <div className="mb-7">
                            <label
                                htmlFor="subImages"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Sub Images (optional)
                                <p className="text-red-500">{errorSub}</p>
                            </label>
                            <Upload
                                listType="picture-card"
                                fileList={subImages}
                                onPreview={handlePreview}
                                onChange={handleSubImages}
                            >
                                {subImages.length >= 8 ? null : uploadButton}
                            </Upload>
                            <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
                                <img
                                    alt="example"
                                    style={{
                                        width: "100%",
                                    }}
                                    src={previewImage}
                                />
                            </Modal>
                        </div>
                        <div className="mb-7">
                            <label
                                htmlFor="category"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                <p className="text-red-500 inline-block">*</p> Category
                            </label>
                            <Select
                                required
                                size="large"
                                className="block w-40"
                                onChange={(value) => setCategory(value)}
                                defaultValue={categories[0]}
                                options={categories.map((category) => ({
                                    label: category,
                                    value: category,
                                }))}
                            />
                        </div>
                        {category === categories[0] && (
                            <div className="mb-7">
                                <label
                                    htmlFor="species"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Species (optional)
                                </label>
                                <input
                                    type="text"
                                    id="species"
                                    name="species"
                                    placeholder="bird species"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block w-full p-2.5"
                                />
                            </div>
                        )}
                        {category === categories[0] && (
                            <div className="mb-7">
                                <label
                                    htmlFor="age"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Age (optional)
                                </label>
                                <input
                                    type="text"
                                    min={1}
                                    max={100}
                                    id="age"
                                    name="age"
                                    placeholder="bird age (Years | Months | Days)"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block w-full p-2.5"
                                />
                            </div>
                        )}
                        {category === categories[0] && (
                            <div className="mb-7">
                                <label
                                    htmlFor="gender"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Gender (optional)
                                </label>
                                <Select
                                    size="large"
                                    className="block w-40"
                                    onChange={(value) => setGender(value)}
                                    defaultValue={genders[0]}
                                    options={genders.map((gender) => ({
                                        label: gender,
                                        value: gender,
                                    }))}
                                />
                            </div>
                        )}
                        {category !== categories[0] && (
                            <div className="mb-7">
                                <label
                                    htmlFor="made-in"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Made in (optional)
                                </label>
                                <input
                                    type="text"
                                    id="made-in"
                                    name="made-in"
                                    placeholder="country of origin"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block w-full p-2.5"
                                />
                            </div>
                        )}
                        {category !== categories[0] && (
                            <div className="mb-7">
                                <label
                                    htmlFor="brand"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Brand (optional)
                                </label>
                                <input
                                    type="text"
                                    id="brand"
                                    name="brand"
                                    placeholder="brand name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block w-full p-2.5"
                                />
                            </div>
                        )}
                        <div className="mb-7">
                            <label
                                htmlFor="weight"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                <p className="text-red-500 inline-block">*</p> Weight
                            </label>
                            <div className="flex flex-wrap items-stretch w-full relative">
                                <input
                                    type="number"
                                    min={1}
                                    required
                                    id="weight"
                                    name="weight"
                                    placeholder="weight in grams"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 flex-shrink flex-grow w-px flex-1 text-sm rounded-lg rounded-r-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block p-2.5 relative"
                                />
                                <div className="flex">
                                    <span className="flex items-center leading-normal bg-white rounded-lg rounded-l-none border border-l-0 border-gray-300 p-2.5 whitespace-no-wrap text-grey-dark text-sm">
                                        gram
                                    </span>
                                </div>
                            </div>
                        </div>
                        {category === categories[1] && (
                            <div className="mb-7">
                                <label
                                    htmlFor="material"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Material (optional)
                                </label>
                                <input
                                    type="text"
                                    id="material"
                                    name="material"
                                    placeholder="product material"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block w-full p-2.5"
                                />
                            </div>)}
                        <div className="mb-7">
                            <label
                                htmlFor="color"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Color (optional)
                            </label>
                            <input
                                type="text"
                                id="color"
                                name="color"
                                placeholder="color"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block w-full p-2.5"
                            />
                        </div>
                        {category === categories[1] && (
                            <div className="mb-7">
                                <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900" >
                                    Size (optional)
                                </label>
                                <input
                                    type="text"
                                    id="size"
                                    name="size"
                                    placeholder="size"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block w-full p-2.5"
                                />
                            </div>)}
                        {category !== categories[0] && (
                            <div className="mb-7">
                                <label
                                    htmlFor="expDate"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Expired date (optional)
                                </label>
                                <DatePicker
                                    className="block w-40"
                                    id="expDate"
                                    name="expDate"
                                    size="large"
                                    format={dateFormatList} />
                            </div>)}
                        <div className="mb-7">
                            <label
                                htmlFor="price"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                <p className="text-red-500 inline-block">*</p> Price
                            </label>
                            <div className="flex flex-wrap items-stretch w-full relative">
                                <div className="flex">
                                    <span className="flex items-center leading-normal bg-white rounded-lg rounded-r-none border border-r-0 border-gray-300 p-2.5 whitespace-no-wrap text-grey-dark text-sm">$</span>
                                </div>
                                <input type="number"
                                    min={0.01}
                                    step={"0.01"}
                                    id="price"
                                    name="price"
                                    placeholder="0.00"
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 flex-shrink flex-grow w-px flex-1 text-sm rounded-lg rounded-l-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block p-2.5 relative"
                                />
                            </div >
                        </div >

                        <div className="mb-7">
                            <label
                                htmlFor="quantity"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                <p className="text-red-500 inline-block">*</p> Quantity
                            </label>
                            <input
                                placeholder="product quantity"
                                type="number"
                                id="quantity"
                                name="quantity"
                                min={1}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 focus:outline-none focus:shadow-outline block w-full p-2.5"
                                required
                            />
                        </div>
                        <div className="mb-7">
                            <label
                                htmlFor="description"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Description (optional)
                            </label>

                            <ReactQuill
                                className="text-gray-900 text-sm"
                                ref={quillRef}
                                theme="snow"
                                modules={modules}
                                formats={formats}
                                placeholder="Write something about your product..."
                                onChange={handleProcedureContentChange}
                            />

                            <p className="float-right">{desLength}/3000</p>
                        </div>
                        <div className="flex justify-center mt-2">
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                            >
                                Submit
                            </button>
                        </div>
                    </form >
                </div >
            </div >
        </div >
    )
}




export default CreateProduct
