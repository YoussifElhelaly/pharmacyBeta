import { BaseUrl } from "@/app/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import token from "../../../Atom/accessToken";

function SalesBox() {


    const [data, setData] = useState([])
    const accessToken = useRecoilValue(token)

    async function getData() {
        const options = {
            method: 'GET',
            url: `${BaseUrl}/medicine/get/best-seller/`,
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
            <h3>الاكثر مبيعا</h3>
            <div className="details">
                <ul className="w-[100%]">
                    {
                        data?.map((product, index) => {
                            return (
                                <li key={index} className="flex my-2 justify-between bg-[#CCECC9] px-2 py-1 rounded-md"><p dir="ltr">{product.solds_count} units</p><h5>{product.name}</h5></li>

                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default SalesBox
