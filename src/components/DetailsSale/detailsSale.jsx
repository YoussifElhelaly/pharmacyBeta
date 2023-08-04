import Image from "next/image"
import BackIcon from '../../Img/BackIcon.png'
import { useEffect, useState } from "react"
import axios from "axios"
import { BaseUrl } from "@/app/layout"
import { useRecoilState, useRecoilValue } from "recoil"
import token from "../../..//Atom/accessToken"
import openDetails from "../../../Atom/openDetails"
import DetailsId from "../../../Atom/DetailsId"

function DetailsSale() {

    const [data, setData] = useState()
    const [disease, setDisease] = useState()
    const tokken = useRecoilValue(token)
    const [isOpen, setisOpen] = useRecoilState(openDetails)
    const id = useRecoilValue(DetailsId)


    async function getDetails() {
        const options = {
            method: 'GET',
            url: `${BaseUrl}/solds/get/${id}/`,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {
                console.log(response.data.data)
                getDise(response.data.data.disease)
                setData(response.data.data)
            })
            .catch(function (error) {
                console.log(error.response)
            }
            );

    }

    async function getDise(id) {

        const optionsDeas = {
            method: 'GET',
            url: `${BaseUrl}/disease/get/${id}/`,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let getDeas = await axios.request(optionsDeas)
            .then(function (response) {
                console.log(response.data.data)
                setDisease(response.data.data)
            })
            .catch(function (error) {
                console.log(error.response)
            }
            );
    }

    useEffect(() => {
        getDetails()
    })

    return (
        <div className="detailsSale bg-[#5f6076d2] left-0 top-0 absolute w-full h-full flex justify-center items-center">
            <div className="relative max-h-[860px] overflow-y-scroll rounded-[15px] py-[50px] bg-bgPrimary w-[1150px] ">
                <Image onClick={() => { setisOpen(false) }} alt="icon" src={BackIcon} className='cursor-pointer absolute left-[50px] top-[10px]'></Image>
                <div className='form px-[50px]'>
                    <div className=" flex gap-5 mb-5">
                        <div className="input flex flex-col items-end w-full">
                            <label htmlFor="">المرض
                            </label>
                            <input disabled defaultValue={disease?.name} type="text" />
                        </div>
                        <div className="input flex flex-col items-end w-full">
                            <label htmlFor="">رقم المبيعة</label>
                            <input type="text" disabled defaultValue={data?.sold_number} />
                        </div>
                    </div>
                    <div className=" flex gap-5 mb-5">
                        <div className="input flex flex-col items-end w-full">
                            <label htmlFor="">تاريخ المبيعة
                            </label>
                            <input defaultValue={data?.sold_at.split("T")[0]} disabled type="text" />
                        </div>
                        <div className="input flex flex-col items-end w-full">
                            <label htmlFor="">وقت المبيعة </label>
                            <input type="text" disabled defaultValue={data?.sold_at.split("T")[1].split(".")[0]} />
                        </div>
                    </div>
                    <div className=" flex gap-5 mb-5">
                        <div className="input flex flex-col items-end w-full">
                            <label htmlFor="">المستخدم
                            </label>
                            <input type="text" disabled defaultValue={data?.pharmacist} />
                        </div>
                        <div className="input flex flex-col items-end w-full">
                            <label htmlFor="">اجمالي السعر </label>
                            <input type="text" disabled defaultValue={data?.total} />
                        </div>
                    </div>
                </div>
                {
                    data?.sold_items.map((item) => {
                        return (
                            <>
                                <div className="showData my-5 flex gap-5 justify-between odd:bg-[#EAEAEA] px-[50px] py-3">
                                    <div className="details flex gap-5">
                                        <div className="img w-[190px] h-[170px] overflow-hidden">
                                            <Image alt="addImg" className="object-cover" src={`${BaseUrl}${item.medicine.medicine_img}`} width={190} height={170}></Image>
                                        </div>
                                        <ul className='flex flex-col justify-between'>
                                            <li>{item.medicine.name}</li>
                                            <li>كود المنتج : {item.medicine.bar_code}  </li>
                                            <li>السعر : $ {item.medicine.price}</li>
                                            <li className='flex items-center '>الكمية
                                                <div className="counter relative w-[100px] ms-4">
                                                    <input type="number" className='text-center h-full w-full bg-secondary text-[#fff] p-[2px] rounded focus-visible:outline-none' value={item.quantity} />
                                                </div>
                                            </li>
                                            <li>تاريخ انتهاء الصلاحية : {item.medicine.exp_date}</li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DetailsSale