import Image from 'next/image'
import BackIcon from '../../Img/BackIcon.png'
import barcodeIcon from '../../Img/barcodeIcon.png'
import addImage from '../../Img/test.png'
import './addProduct.css'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import AddCate from '../addCategory/addCate'
import addIcon from '../../Img/addIcon.png'
import { useRecoilState, useRecoilValue } from 'recoil'
import categoryOpen from '../../../Atom/CategoryOpen'
import SuccessMessage from '../successMessage/successMessage'
import WrongMessage from '../wrongMessage/wrongMessage'
import productOpen from '../../../Atom/productOpen'
import token from '../../../Atom/accessToken'
import { BaseUrl } from '@/app/layout'
import { toast } from 'react-toastify'


function AddProduct() {

    const file = useRef(null)
    const [isProductOpen, setIsProductOpen] = useRecoilState(productOpen)
    const [isAddOpen, setIsAddOpen] = useRecoilState(categoryOpen)
    const [message, setMessage] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const nameInp = useRef()
    const codeInp = useRef()
    const priceInp = useRef()
    const categoryInp = useRef()
    const quanInp = useRef()
    const expireInp = useRef()
    const date = new Date()
    const today = date.toLocaleDateString()

    function emptyInputs() {
        nameInp.current.value = null
        codeInp.current.value = null
        priceInp.current.value = null
        categoryInp.current.value = null
        quanInp.current.value = null
        expireInp.current.value = null
        file.current.value = null
    }
    console.log(today.split("/").reverse().join("-"))
    const tokken = useRecoilValue(token)

    const [data, setDate] = useState([])
    useEffect(() => {
        const options = {
            method: 'GET',
            url: `${BaseUrl}/category/get/all/`,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = axios.request(options)
            .then(function (response) {
                console.log(response.data.data);
                setDate(response.data.data)

            })
            .catch(function (error) {
                console.log(error.response)
            }
            );
    }, [isAddOpen])

    async function uploadImg() {

        let formData = new FormData()
        formData.append("name", nameInp.current.value)
        formData.append("price", priceInp.current.value)
        formData.append("category", categoryInp.current.value)
        formData.append("prodDate", today.split("/").reverse().join("-"))
        formData.append("expDate", expireInp.current.value)
        formData.append("medicineImg", file.current.files[0])
        formData.append("stock", quanInp.current.value)
        formData.append("stockWarnLimit", 3)
        formData.append("barCode", codeInp.current.value)

        const options = {
            method: 'POST',
            url: `${BaseUrl}/medicine/create/`,
            data: formData
            ,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {
                toast.success(response.data.message)
                emptyInputs()
            })
            .catch(function (error) {
                toast.error(error.response.data.message)
            }
            );
    }
    return (
        <div className="addProduct bg-[#5f6076d2] left-0 top-0 absolute w-full h-full flex justify-center items-center">
            <div className="relative content bg-bgPrimary h-full xl:h-fit w-[1150px] px-[50px]">
                <div className="flex justify-between">
                    <Image alt="icon" src={BackIcon} onClick={() => setIsProductOpen(false)} className='cursor-pointer absolute left-[50px] top-[10px]'></Image>
                    <div className="addImage w-[390px] flex justify-center items-center flex-col">
                        <h4 className='text-[20px] mb-2'>اضافة صور المنتج</h4>
                        <div className="img relative">
                            <input type="file" ref={file} className='absolute w-full h-full opacity-0 cursor-pointer' />
                            <Image alt='icon' src={addImage} className='h-[350px] w-[390px]'></Image>
                        </div>
                    </div>
                    <div className='form w-1/2'>
                        <div className="input py-2" dir='ltr'>
                            <label htmlFor="">كود المنتج</label>
                            <div className='relative'>
                                <Image alt='icon' src={barcodeIcon} className='absolute right-[10px] top-[50%] translate-y-[-50%]'></Image>

                                <input ref={codeInp} type="number" />
                            </div>
                        </div>
                        <div className="input py-2  flex flex-col items-end w-full">
                            <label htmlFor="">أسم المنتج</label>
                            <input ref={nameInp} type="text" />
                        </div>
                        <div className="input py-2 flex flex-col relative items-end w-full">
                            <label htmlFor="">الفئات
                            </label>
                            <Image alt='icon' src={addIcon} onClick={() => setIsAddOpen(true)} className=' cursor-pointer absolute bottom-[25px] right-[-50px]'></Image>
                            <select ref={categoryInp}>
                                {
                                    data.map((product, index) => {
                                        return (
                                            <option key={index}> {product.name}</option>

                                        )
                                    })
                                }

                            </select>
                        </div>
                        <div className="input py-2 flex flex-col items-end w-full">
                            <label htmlFor="">الكمية</label>
                            <div className="quan w-full">

                                <input ref={quanInp} type="number" />
                            </div>
                        </div>
                        <div className="input py-2  flex flex-col items-end w-full">
                            <label htmlFor="">السعر</label>
                            <div className="price w-full">

                                <input ref={priceInp} type="number" />
                            </div>
                        </div>
                        <div className="input py-2  flex flex-col items-end w-full">
                            <label htmlFor="">تاريخ انتهاء الصلاحية</label>
                            <input ref={expireInp} type="date" />
                        </div>
                    </div>
                </div>

                <button onClick={() => {
                    uploadImg()

                }} className='bg-primary px-[50px] text-[#fff] w-full py-5 my-5 rounded-[10px]'>حفظ المنتج</button>
            </div>
            {
                isAddOpen ? <AddCate title="category" /> : null
            }

        </div>
    )
}

export default AddProduct