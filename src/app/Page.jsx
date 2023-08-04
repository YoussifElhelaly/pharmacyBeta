'use client'

import Layout from '../components/layout/layout'
import HomeBox from '../components/homeBox/homeBox'
import ExpiredBox from '../components/expiredBox/expiredBox'
import SalesBox from '../components/salesBox/salesBox'
import HomeBoxList from '../components/homeBoxList/homeBosList'
import { useRecoilState, useRecoilValue } from 'recoil'
import token from '../../Atom/accessToken'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BaseUrl } from './layout'



export default function Home() {
  const [accessToken, setToken] = useRecoilState(token)
  const [data, setDate] = useState([])

  async function getMedicine() {
    const options = {
      method: 'GET',
      url: `${BaseUrl}/medicine/get/all/`,
      headers: {
        "Authorization": `Bearer ${accessToken}`
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



  useEffect(() => {
    getMedicine()
  }, [])

  return (
    <Layout>
      <section className="home h-[calc(100vh-140px)]">

        <div className="boxWrapper flex flex-wrap gap-x-[40px] gap-y-[30px]">
          <HomeBox type="orders" primary="Vilot" secondry="VilotLow" title="إجمالي المبيعات" />
          <HomeBox type="sales" primary="Red" secondry="RedLow" title="اجمالي الطلابات" />
          <HomeBox primary="Vilot" secondry="VilotLow" />
          <HomeBox primary="Vilot" secondry="VilotLow" />
          <HomeBoxList secondry="GreenLow" data={data} name=" الدواء المضاف حديثا" />
          <HomeBoxList secondry="RedLow" data={data} name="دواء تم حظرة بموجب لائحة طبية" />
        </div>
        <div className="infoWrapper flex justify-between mt-10">
          <SalesBox />
          <ExpiredBox />
        </div>
      </section>
    </Layout>
  )
}
