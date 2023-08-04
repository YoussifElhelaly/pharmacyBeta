import { useRecoilState } from 'recoil'
import './salesTable.css'
import DetailsId from '../../../Atom/DetailsId'
import openDetails from '../../../Atom/openDetails'

function SalesTable(props) {
    const [id, setId] = useRecoilState(DetailsId)
    const [DetailsOpen, setDestailsOpen] = useRecoilState(openDetails)
    console.log(props)

    return (
        <table className="salesTable border w-full bg-[#373854]">
            <thead>
                <tr>

                    <th></th>
                    <th>المستخدم</th>
                    <th>تاريخ الطلبية</th>
                    <th>وقت المبيعة</th>
                    <th>سعر المبيعة</th>
                    <th>الكمية</th>
                    <th>رقم الطلب</th>
                </tr>
            </thead>
            <tbody className="text-center">
                {
                    props.data.map((sale, index) => {
                        console.log(sale)
                        return (
                            <tr key={index}>
                                <td>
                                    <button onClick={() => {
                                        console.log("5lsaa")
                                        setId(sale.id)
                                        setDestailsOpen(true)
                                    }}>تفاصيل المبيعة</button>
                                </td>
                                <td>
                                    {sale.pharmacist}
                                </td>
                                <td>
                                    {sale.sold_at.split("T")[0]}
                                </td>
                                <td>
                                    {sale.sold_at.split("T")[1].split(".")[0]}
                                </td>
                                <td>
                                    {sale.total} $
                                </td>
                                <td>
                                    {sale.sold_items.length} units
                                </td>
                                <td>{sale.sold_number}</td>
                            </tr>
                        )
                    })
                }

            </tbody>
        </table>
    )
}

export default SalesTable