import axios from "axios";
import { useEffect, useRef, useState } from "react";
import token from "../../../Atom/accessToken";
import { useRecoilState, useRecoilValue } from "recoil";
import { BaseUrl } from "@/app/layout";
import DetailsProductOpen from "../../../Atom/DetailsProductOpen";
import DetailsProduct from "../DetailsProduct/DetailsProduct";
import searchIcon from '../../Img/searchIcon.png'
import Image from "next/image";


function InventoryTable() {

    const [data, setDate] = useState([])
    const [selectedProduct, setSelectedProduct] = useState()
    const tokken = useRecoilValue(token)
    const [isOpen, setIsOpen] = useRecoilState(DetailsProductOpen)
    const searchInp = useRef()




    async function uploadImg() {
        const options = {
            method: 'GET',
            url: `${BaseUrl}/medicine/get/all/`,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {
                console.log(response.data.data);
                setDate(response.data.data)
            })
            .catch(function (error) {
                console.log(error.response)

            }
            );
    }

    async function getProduct(id) {
        const options = {
            method: 'GET',
            url: `${BaseUrl}/medicine/get-barcode/${id}/`,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {
                console.log(response)
                setDate([response.data.data])
            })
            .catch(function (error) {
                console.log(error)
            }
            );
    }

    useEffect(() => { uploadImg() })

    return (
        <>
            <div className="head flex items-center  mb-5 justify-between ">
                <h3 className="text-3xl">إجمالي المنتجات </h3>
                <div className="filter content w-1/2">
                    <div className="form flex gap-8">

                        {/* <div className="input py-5 flex flex-col relative w-full">
                                <select>
                                    <option>dasfdfdf</option>
                                </select>
                            </div> */}
                        <div className="input py-5 flex flex-col relative w-full ">
                            <Image alt="icon" src={searchIcon} className="absolute right-5 top-[50%] translate-y-[-50%]"></Image>
                            <input ref={searchInp} onKeyUp={(e) => {
                                if (e.code == "Enter" || e.code == "NumpadEnter") {
                                    getProduct(searchInp.current.value)
                                    if (searchInp.current.value == "") {
                                        uploadImg()
                                    }
                                }
                                if (searchInp.current.value == "") {
                                    uploadImg()
                                }
                            }}
                                type="number" name="search" placeholder="بحث"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <table className="salesTable border w-full bg-[#373854]">
                <thead>
                    <tr>

                        <th></th>
                        <th>تاريخ انتهاء الصلاحية </th>
                        <th>الكمية</th>
                        <th>اسم المنتج</th>
                        <th>كود المنتج</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {
                        data?.map((product, index) => {
                            return (

                                <tr key={index}>
                                    <td>
                                        <button onClick={() => {
                                            setSelectedProduct(product)
                                            setIsOpen(true)
                                        }}>تفاصيل المنتج</button>
                                    </td>
                                    <td>
                                        {product.exp_date}
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
                {
                    isOpen ?
                        <DetailsProduct currentProduct={selectedProduct} />
                        :
                        null
                }
            </table>
        </>
    )
}
export default InventoryTable