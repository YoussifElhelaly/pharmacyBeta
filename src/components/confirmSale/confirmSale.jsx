import Image from "next/image"
import BackIcon from '../../Img/BackIcon.png'
import confirmOpen from "../../../Atom/ConfirmOpen"
import { useRecoilState, useRecoilValue } from "recoil"
import { BaseUrl } from "@/app/layout"
import axios from "axios"
import { useState } from "react"
import SuccessMessage from "../successMessage/successMessage"
import WrongMessage from "../wrongMessage/wrongMessage"
import token from "../../../Atom/accessToken"
import createOpen from "../../../Atom/CreateOpen"
import { toast } from "react-toastify"
function ConfirmSale(props) {

    const [isConfirmOpen, setIsConfirmOpen] = useRecoilState(confirmOpen)
    const [isCreateOpen, setIsCreateOpen] = useRecoilState(createOpen)

    const date = new Date().toLocaleDateString()
    const time = new Date().toLocaleString()
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [success, setSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const tokken = useRecoilValue(token)


    function getSumQuan() {
        let sum = 0
        props.saleList.map((product) => {
            sum += product.quantity
        })
        return sum
    }
    function getSumPrice() {
        let sum = 0
        props.list.map((product) => {

            sum = sum + +product.price
        })
        return sum
    }

    async function createReq() {
        const options = {
            method: 'POST',
            url: `${BaseUrl}/solds/create/`,
            data: {
                "disease": props.disease,
                "medicines": props.saleList
            }
            ,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {
                toast.success(response.data.message)
                setIsConfirmOpen(false)
                setIsCreateOpen(false)
            })
            .catch(function (error) {
                console.log(error)
                toast.error("يوجد منتج في هذه المبيعة ليس متوفر  في المخزون الكمية المطلوبة  ")
            }

            );
    }

    return (
        <div className="createSale bg-[#5f6076d2] left-0 top-0 absolute w-full h-full flex justify-center items-center">
            <div className="relative content bg-bgPrimary w-[1150px] ">
                <Image alt="icon" onClick={() => { setIsConfirmOpen(false) }} src={BackIcon} className='cursor-pointer absolute left-[50px] top-[10px]'></Image>
                {
                    error ?
                        <WrongMessage title={errorMessage} />
                        : null
                }
                {
                    success ?
                        <SuccessMessage title={successMessage} /> : null
                }
                <div className="billDetails my-5 px-[50px]">
                    <table className="salesTable border w-full bg-[#373854] ">
                        <thead>
                            <tr>
                                <th>تاريخ المبيعة</th>
                                <th>وقت المبيعة </th>
                                <th>سعر المنتج</th>
                                <th>الكمية</th>
                                <th>المنتج</th>
                                <th>كود المنتج</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {
                                props.list.map((product, index) => {
                                    return (


                                        <tr key={index}>
                                            <td>
                                                {date.split("/").reverse().join("-")}
                                            </td>
                                            <td>
                                                {time.split(",")[1]}
                                            </td>
                                            <td>
                                                {product.price} $
                                            </td>
                                            <td>
                                                {props.saleList[index].quantity} units
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
                </div>
                <ul className="px-[50px]">
                    <li className="bg-secondary p-[25px] my-5 text-[#fff] rounded-md text-[20px]">إجمالي الكمية :  {`${getSumQuan()} units`}   </li>
                    <li className="bg-secondary p-[25px] my-5 text-[#fff] rounded-md text-[20px]">إجمالي السعر : {getSumPrice()} $</li>
                    <button onClick={() => { createReq() }} className='bg-primary text-[#fff] w-full py-5 my-5 rounded-[10px]'>تأكيد مبيعة</button>
                </ul>
            </div>
        </div>
    )
}

export default ConfirmSale