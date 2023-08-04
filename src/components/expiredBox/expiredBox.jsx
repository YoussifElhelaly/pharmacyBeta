import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import token from "../../../Atom/accessToken";
import { BaseUrl } from "@/app/layout";
import axios from "axios";

function ExpiredBox() {
    const [data, setData] = useState([])
    const accessToken = useRecoilValue(token)

    async function getData() {
        const options = {
            method: 'GET',
            url: `${BaseUrl}/medicine/get/expire-soon/`,
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {
                console.log(response)
                setData(response.data.data)
            })
            .catch(function (error) {
                console.log(error.response)
            }
            );
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div className="exipredBox bg-bgPrimary w-[49%] p-5 rounded-3xl">
            <h3>دواء ينتهي صلاحيتة قريبا</h3>
            <div className="details">
                <ul className="w-[100%]">
                    {
                        data?.map((product, index) => {
                            return (
                                <li key={index} className="flex my-2 justify-between bg-[#ECC9C9] px-2 py-1 rounded-md">
                                    <span className="w-[30%]">{product.exp_date}</span>
                                    <span className="w-[30%] text-center" dir="ltr">{product.stock} units</span>
                                    <p className="w-[30%] text-left">{product.name}</p></li>

                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default ExpiredBox