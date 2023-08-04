import axios from "axios"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import token from "../../../Atom/accessToken"
import { BaseUrl } from "@/app/layout"

function HomeBox(props) {

    const [date, setDate] = useState(false)
    const [currentData, setCurrentData] = useState([])
    const accessToken = useRecoilValue(token)

    async function getData() {
        const options = {
            method: 'GET',
            url: `${BaseUrl}/analytics/${date ? "monthly" : "weekly"}-${props.type}/`,
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },

        }
        let result = await axios.request(options)
            .then(function (response) {
                console.log(response)
                setCurrentData(response.data)
            })
            .catch(function (error) {
                console.log(error.response)
            }
            );
    }

    useEffect(() => {
        getData()
    }, [date])

    console.log(date)

    return (
        <div className="homeBox flex flex-col justify-between bg-bgPrimary rounded-[30px] max-h-[210px] w-[calc(33.33%-27px)] px-5 py-3">
            <div className="boxTop flex justify-between items-center">
                <h3 className="font-semibold"> {props.title} </h3>
                <i className={`fa-solid fa-cart-shopping bg${props.secondry} p-4 rounded-full text${props.primary}`}></i>
            </div>
            <div className="boxBody text-center" dir="ltr">
                <p className="text-[50px] font-semibold">
                    {props.type === "sales" ? currentData.profits : currentData.sales_count}


                </p>
                {
                    currentData.increase_percentage ?
                        <span className="text-green font-semibold text-[20px]">
                            +{currentData.increase_percentage}%</span> :
                        null
                }

            </div>
            <div className="boxFooter">
                <div onClick={() => {
                    setDate(!date)
                }} className={`toggleButton mt-[10px] flex px-3 text-[#fff] overflow-hidden relative mx-auto rounded-full justify-between bg${props.secondry} w-[110px] cursor-pointer`}>
                    <p className="relative z-10">اسبوعيا</p>
                    <p className="relative z-10 ">شهريا</p>
                    <span className={`bg${props.primary}
                      rounded-full w-[52%] h-full absolute
                      transition-[0.5s]
                     ${date ? "left-[-1%]" : "left-[47%]"} 
                      `}></span>
                </div>
            </div>
        </div>
    )
}

export default HomeBox