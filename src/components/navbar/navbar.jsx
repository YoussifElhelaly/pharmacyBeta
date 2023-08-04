'use client'
import Image from "next/image"
import searchIcon from '../../Img/searchIcon.png'
// import notifIcon from '../../../Img/notifIcon.png'
import person from '../../Img/personIcon.png'
import { useState } from "react"


function Navbar() {

    const [isOpen, setOpen] = useState(false)

    return (
        <nav className="flex bg-[#fff] items-center justify-between mb-8">
            <div className="search w-[450px] ">
                <div className="input rounded-full bg-bgPrimary relative ">
                    <Image src={searchIcon} className="absolute right-5 top-[50%] translate-y-[-50%]" alt="icon"></Image>
                    <input type="text" name="search" placeholder="بحث"
                        className="rounded-full w-full text-2xl py-2 pr-[50px] bg-bgPrimary placeholder:text-[#000] placeholder:text-[22px] " />
                </div>
            </div>
            <div className="userInfo flex justify-between items-center">
                <div className="notifictionBox relative">
                    <div className="icon">
                        {/* <Image onClick={() => setOpen(!isOpen)} src={notifIcon} className="w-[30px] h-[30px] cursor-pointer" alt="icon"></Image> */}
                    </div>
                    <div className={`notifictionWrapper absolute left-0 top-full
                     bg-[#fff]  w-[380px]
                     ${isOpen ? "h-[320px]" : "h-0"}
                     transition-[0.5s]
                     z-40
                      overflow-auto rounded-md shadow-md`}>
                        <ul className="notifictionList py-5">
                            <li className="notifictionItem text-secondary p-4 odd:bg-bgPrimary even:bg-[#fff]">
                                <h3 className="text-[24px]">منتج جديد تم اضافتة </h3>
                                <p>كود المنتج 225848964</p>
                            </li>
                            <li className="notifictionItem text-secondary p-4 odd:bg-bgPrimary even:bg-[#fff]">
                                <h3 className="text-[24px]">منتج جديد تم اضافتة </h3>
                                <p>كود المنتج 225848964</p>
                            </li>
                            <li className="notifictionItem text-secondary p-4 odd:bg-bgPrimary even:bg-[#fff]">
                                <h3 className="text-[24px]">منتج جديد تم اضافتة </h3>
                                <p>كود المنتج 225848964</p>
                            </li>
                            <li className="notifictionItem text-secondary p-4 odd:bg-bgPrimary even:bg-[#fff]">
                                <h3 className="text-[24px]">منتج جديد تم اضافتة </h3>
                                <p>كود المنتج 225848964</p>
                            </li>
                            <li className="notifictionItem text-secondary p-4 odd:bg-bgPrimary even:bg-[#fff]">
                                <h3 className="text-[24px]">منتج جديد تم اضافتة </h3>
                                <p>كود المنتج 225848964</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="userImage mr-12">
                    <Image src={person} alt="profile-picture" ></Image>
                </div>
            </div>
        </nav>
    )
}

export default Navbar