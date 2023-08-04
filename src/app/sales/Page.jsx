'use client'

import { useEffect, useState } from "react"
import DetailsSale from "../../components/DetailsSale/detailsSale"
import CreateSale from "../../components/createSale/createSale"
import Layout from "../../components/layout/layout"
import SalesTable from "../../components/salesTable/salesTable"
import { useRecoilState, useRecoilValue } from "recoil"
import createOpen from "../../../Atom/CreateOpen"
import confirmOpen from "../../../Atom/ConfirmOpen"
import token from "../../../Atom/accessToken"
import { BaseUrl } from "../layout"
import openDetails from "../../../Atom/openDetails"
import axios from "axios"

export default function Sales() {
    const [isCreateOpen, setIsCreateOpen] = useRecoilState(createOpen)
    const isConfirmOpen = useRecoilValue(confirmOpen)
    const [data, setData] = useState([])
    const tokken = useRecoilValue(token)
    const [isDetailsOpen, setIsDetailsOpen] = useRecoilState(openDetails)
    const [detailsId, setDestailsId] = useState()
    async function getProduct() {
        const options = {
            method: 'GET',
            url: `${BaseUrl}/solds/get/all/`,
            headers: {
                "Authorization": `Bearer ${tokken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {
                console.log(response.data.data)
                setData(response.data.data)
            })
            .catch(function (error) {
                console.log(error.response)
            }
            );
    }

    useEffect(() => {
        getProduct()
    },[])

    return (
        <Layout>
            <div className="head flex">
                <button onClick={() => setIsCreateOpen(true)} className="bg-primary px-[50px] py-[8px] text-2xl text-[#fff] rounded-[10px] ms-auto">أنشاء مبيعة </button>
            </div>
            <div className="tableDetails bg-bgPrimary p-5 mt-5 rounded-[30px]" >
                <h3 className="text-xl mb-5">إجمالي المبيعات</h3>
                <SalesTable data={data} />
            </div>
            {
                isCreateOpen ? <CreateSale /> : null
            }

            {
                isDetailsOpen ? <DetailsSale /> : null
            }

        </Layout>
    )
}
