'use client'
import barcodeIcon from '../../Img/barcodeIcon.png'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import BackIcon from '../../Img/BackIcon.png'
import { useRecoilState, useRecoilValue } from 'recoil'
import addIcon from '../../Img/addIcon.png'
import categoryOpen from '../../../Atom/CategoryOpen'
import AddCate from '../addCategory/addCate'
import addBlockOpen from '../../../Atom/addBlockOpen'
import axios from 'axios'
import { BaseUrl } from '@/app/layout'
import token from '../../../Atom/accessToken'
import deleteIcon from '../../Img/deleteIcon.png'
import { toast } from 'react-toastify'


function AddBlockProduct(props) {
    const [isAddOpen, setIsAddOpen] = useRecoilState(categoryOpen)
    const [addOpenBlock, setAddOpenBlock] = useRecoilState(addBlockOpen)
    const productCode = useRef()
    const [blockArray, setBlockArray] = useState([])
    const [addBlockArray, setAddBlockArray] = useState([])
    const tokken = useRecoilValue(token)
    const [listDisease, setListDisease] = useState([])
    const cateInput = useRef()

    console.log(addBlockArray)

    async function getProduct() {
        const options = {
            method: 'GET',
            url: `${BaseUrl}/medicine/get-barcode/${productCode.current.value}/`,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {
                console.log(response.data.data)
                setAddBlockArray((old) => [
                    ...old, {
                        "id": response.data.data.id,
                        "barcode": response.data.data.bar_code
                    }
                ])
                setBlockArray((old) => [
                    ...old,
                    response.data.data
                ])
                toast.success("تم العثور علي الدواء")
            })
            .catch(function (error) {
                toast.error(error.response.data.message)
            }
            );
    }
    async function addList() {
        const options = {
            method: 'POST',
            url: `${BaseUrl}/banlist/create/`,
            data: {
                "disease": cateInput.current.value,
                "medicines": addBlockArray
            }
            ,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {
                console.log(response)
                toast.success(response.data.message)
            })
            .catch(function (error) {
                toast.error(error.response.data.message)
                console.log(error.response)
            }
            );
    }

    function removeItemAtIndex(arr, index) {
        return [...arr.slice(0, index), ...arr.slice(index + 1)];
    }


    useEffect(() => {
        let url
        if (props.current == true) {
            url = `${BaseUrl}/disease/get/all/`
        }
        if (props.current == false) {
            url = `${BaseUrl}/category/get/all/`

        }
        const options = {
            method: 'GET',
            url: url,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = axios.request(options)
            .then(function (response) {
                setListDisease(response.data.data)
            })
            .catch(function (error) {
                toast.error(error.response.data.message)
            }
            );
    }, [isAddOpen])

    return (

        <div className="createSale text-[#000] bg-[#5f6076d2] left-0 top-0 absolute w-full h-full flex justify-center items-center">
            <div className="relative content bg-bgPrimary w-[1150px] ">
                <Image alt='icon' onClick={() => setAddOpenBlock(false)} src={BackIcon} className='cursor-pointer absolute left-[50px] top-[10px]'></Image>
                <div className='form px-[50px]'>
                    <div className=" flex gap-5 mb-5">
                        <div className="input relative flex flex-col w-1/2 items-end ms-auto">
                            <Image alt='icon' src={addIcon} onClick={() => setIsAddOpen(true)} className=' cursor-pointer absolute bottom-[10px] right-[-50px]'></Image>
                            <label htmlFor="">
                                {
                                    props.current ? "المرض" : "الفئة"
                                }

                            </label>
                            <select ref={cateInput}>
                                {
                                    listDisease.map((dise, index) => {
                                        console.log(dise)
                                        return (
                                            <option key={index}>{dise.name} </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-5 items-end">

                        <button onClick={() => { getProduct() }} className='bg-primary text-[#fff] w-[240px]  py-4 rounded-[10px]'> أضف الدواء</button>
                        <div className="input relative text-end flex-1">
                            <label htmlFor="">اضافة دواء جديد</label>
                            <input type="number" ref={productCode} />
                            <Image alt='icon' src={barcodeIcon} className='absolute right-[10px] top-[50%] translate-y-[10%]'></Image>

                        </div>
                    </div>
                </div>

                <div className="billDetails my-5 px-[50px]">
                    <table className="salesTable text-[16px] border w-full bg-[#373854] ">
                        <thead>
                            <th></th>
                            <th>سعر المنتج</th>
                            <th> الكمية</th>
                            <th> اسم المنتج</th>
                            <th>كود المنتج</th>
                        </thead>
                        <tbody className="text-center">
                            {
                                blockArray.map((product, index) => {
                                    console.log(product)
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <Image src={deleteIcon} alt='icon' className='cursor-pointer' onClick={() => {
                                                    const newList = removeItemAtIndex(blockArray, index);
                                                    const newSaleList = removeItemAtIndex(addBlockArray, index);

                                                    setBlockArray(newList);
                                                    setAddBlockArray(newSaleList)
                                                }}></Image>
                                            </td>
                                            <td>
                                                {product.price} $
                                            </td>
                                            <td>
                                                {product.stock} units
                                            </td>
                                            <td>
                                                {product.name}
                                            </td>
                                            <td>{product.bar_code}</td>
                                        </tr>
                                    )

                                })
                            }
                        </tbody>
                    </table>
                    <button onClick={() => addList()} className='bg-primary text-[#fff] w-full py-5 my-5 rounded-[10px]'> إضافة  </button>
                </div>
            </div>
            {
                isAddOpen ? <AddCate title={props.current ? "" : "category"} /> : null
            }
        </div>
    )

}

export default AddBlockProduct