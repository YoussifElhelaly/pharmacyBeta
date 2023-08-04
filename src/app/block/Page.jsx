'use client'

import { useEffect, useRef, useState } from "react"
import Layout from "../../components/layout/layout"
import testImg from '../../Img/test.png'
import Image from "next/image"
import AddBlockProduct from "../../components/addBlockProduct/addBlockProduct"
import { useRecoilState, useRecoilValue } from "recoil"
import addBlockOpen from "../../../Atom/addBlockOpen"
import addIcon from '../../Img/addIcon.png'
import { BaseUrl } from "../layout"
import token from "../../../Atom/accessToken"
import axios from "axios"
import { toast } from "react-toastify"


export default function Block() {

    const [currentPage, setCureentPage] = useState(true)
    const [addOpen, setAddOpen] = useRecoilState(addBlockOpen)
    const [listDisease, setListDisease] = useState([])
    const [date, setDate] = useState([])
    const tokken = useRecoilValue(token)
    const test = useRef()


    async function getData(id) {

        const options = {
            method: 'GET',
            url: `${BaseUrl}/banlist/get/${id}/`,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = axios.request(options)
            .then(function (response) {
                toast.success("تم العثور علي لائحة لهذا المرض")
                setDate(response.data.data.medicine)
            })
            .catch(function (error) {
                toast.error(error.response.data.message)
            }
            );
    }


    useEffect(() => {
        let url
        if (currentPage == true) {
            url = `${BaseUrl}/disease/get/all/`
        }
        if (currentPage == false) {
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
                console.log(response.data.data)
                getData(response.data.data[0].id)
                setListDisease(response.data.data)
            })
            .catch(function (error) {
                console.log(error.response)
            }
            );
    }, [currentPage])


    return (
        <Layout>
            <ul className="flex gap-5">
                <li onClick={() => { setCureentPage(true) }} className={`text-[20px] font-semibold ${currentPage ? "text-vilot border-b-2" : ""} `}>قائمة الامراض </li>
                <li onClick={() => { setCureentPage(false) }} className={`text-[20px] font-semibold ${currentPage ? "" : "text-vilot border-b-2"} `}>قائمة محظورات اللوائح الطبية</li>
            </ul>
            <div className="tableDetails bg-bgPrimary pt-5 mt-5 rounded-xl text-[20px] text-[#fff]" >

                <div className="input relative text-[#000] flex flex-col items-end ms-auto w-fit">
                    <label htmlFor="">{
                        currentPage ? "المرض" : "الفئة"
                    }
                    </label>
                    <Image src={addIcon} onClick={() => setAddOpen(true)} className=' cursor-pointer absolute bottom-[10px] right-[-50px]'></Image>

                    <select onChange={() => { getData(test.current.value) }} dir="ltr" ref={test} className="p-4 w-[490px] shadow-sm rounded-md">
                        {
                            listDisease?.map((dis, index) => {
                                return (
                                    <option key={index} value={dis.id}>{dis.name}</option>
                                )
                            })
                        }
                    </select>

                </div>
                <div className="products bg-[#373854] flex flex-wrap rounded-3xl p-10 gap-10 justify-between">
                    {
                        date?.map((product, index) => {
                            return (
                                <div key={index} className="product bg-[#282945] rounded-xl flex gap-5 items-center w-full p-3 2xl:w-[48%]">
                                    <Image src={testImg} alt="medicine image"></Image>
                                    <div className="details">
                                        <ul>
                                            <li>{product.name}</li>
                                            <li>كود المنتج : {product.bar_code}  </li>
                                            <li>السعر : {product.price} $</li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                {
                    addOpen ? <AddBlockProduct current={currentPage} /> : null
                }

            </div>
        </Layout>
    )
}
