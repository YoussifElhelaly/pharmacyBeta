import Cookies from "js-cookie";
import { atom } from "recoil";


const value = Cookies.get("accessToken")

const token = atom({
    key: 'token',
    default: value,
});

export default token