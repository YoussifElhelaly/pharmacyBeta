'use client'
import Image from 'next/image'
import BackIcon from '../../Img/BackIcon.png'
import { useRecoilState, useRecoilValue } from 'recoil'
import { BaseUrl } from '@/app/layout'
import DetailsProductOpen from '../../../Atom/DetailsProductOpen'

function DetailsProduct(props) {

    const [isOpen, setIsOpen] = useRecoilState(DetailsProductOpen)

    return (

        <div className="createSale bg-[#5f6076d2] left-0 top-0 absolute w-full h-full flex justify-center items-center">
            <div className="relative content bg-bgPrimary w-[1150px] ">
                <Image alt='icon' onClick={() => setIsOpen(false)} src={BackIcon} className='cursor-pointer absolute left-[50px] top-[10px]'></Image>
                <div className="showData my-5 flex gap-5 justify-between bg-[#EAEAEA] px-[50px] py-3">
                    <div className="details flex gap-5">
                        <div className="img">
                            <Image alt='test-Img' src={`${BaseUrl}${props.currentProduct.medicine_img}`} width={300} height={300}></Image>

                        </div>
                        <ul className='flex flex-col justify-between text-[#000] text-xl'>
                            <li>{props.currentProduct.name}</li>
                            <li>كود المنتج : {props.currentProduct.bar_code}  </li>
                            <li>السعر : 16.6 $</li>
                            <li className='flex items-center '>

                                الكمية : {props.currentProduct.stock}
                            </li>
                            <li>تاريخ انتهاء الصلاحية : 15/12/2023</li>
                        </ul>
                    </div>

                </div>
                <button onClick={() => {
                    uploadImg()

                }} className='bg-primary px-[50px] text-[#fff] w-full py-5 my-5 rounded-[10px]'>حفظ المنتج</button>
            </div>
        </div >
    )

}

export default DetailsProduct