
function HomeBoxList(props) {
    let data = props.data?.slice(0, 3)


    return (
        <div className="homeBox bg-bgPrimary rounded-[30px] h-[210px] w-[calc(33.33%-27px)] py-8 px-5">
            <div className="boxTop flex justify-between items-center">
                <h3 className="font-semibold">{props.name}</h3>
            </div>
            <div className="boxBody text-center" dir="ltr">
                <ul>
                    {data?.map((product) => {
                        return (
                            <li key={product.id} className={`flex my-2 justify-between bg${props.secondry} text-[15px] px-2 py-1 rounded-md`}><h4>{product.name}</h4><p>{product.stock} units</p></li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default HomeBoxList