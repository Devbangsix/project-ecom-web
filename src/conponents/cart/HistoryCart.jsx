import React, { useState, useEffect } from 'react'
import { getOrders } from '../../api/user'
import uesEcomStore from '../../store/ecom-store'
import { numberFormat } from '../../utils/number'
import { dateFormat } from '../../utils/dateformant'

const HistoryCart = () => {
    const [orders, setOrder] = useState([])
    const token = uesEcomStore((state) => state.token)
    useEffect(() => {
        hdlgetOrder(token)
    }, [])
    const hdlgetOrder = (token) => {
        getOrders(token)
            .then((res) => {
                // console.log(res)
                // console.log(res.data.orders)
                setOrder(res.data.orders)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const getStatusColor = (status) => {
        switch (status) {
            case "Not Process" :
                return 'bg-gray-300'
            case "Processing" :
                return 'bg-blue-300'
            case "Completed" :
                return 'bg-green-300'
            case "Cancelled" :
                return 'bg-red-300'
        }
    }
    
    return (
        <div className='space-y-6'>
            <h1 className='font-bold text-xl'>History</h1>
            {/* header */}
            <div className='space-y-6'>
                {
                    orders?.map((item, index) => {
                        // console.log(item)
                        return (
                            <div key={index} className='bg-gray-200 p-4 rounded-md shadow-md'>
                                <div className='flex justify-between mb-2' >
                                    <div>
                                        <div>Order Date</div>
                                        <div>{dateFormat(item.updatedAt)}</div>
                                    </div>
                                    <div>
                                        <div>
                                            <span className={`${getStatusColor(item.orderstatus)} px-2 py-1 rounded-full`}>
                                                {item.orderstatus}
                                            </span>
                                        </div>
                                    </div>


                                </div>
                                {/* product table */}
                                <div className='felx justify-between'>
                                    <table className='border w-full '>
                                        <thead>
                                            <tr className='bg-gray-300'>
                                                <th>product</th>
                                                <th>price</th>
                                                <th>qty</th>
                                                <th>total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                item.products?.map((product, index) => {
                                                    console.log(product)
                                                    return (
                                                        <tr key={index}>
                                                            <td>{product.product.title}</td>
                                                            <td>{numberFormat(product.product.price)}</td>
                                                            <td>{product.count}</td>
                                                            <td>{numberFormat(product.price * product.count)}</td>

                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {/* total */}
                                <div>
                                    <div className='text-right'>
                                        <div>total</div>
                                        {console.log(item)}
                                        <div>{numberFormat(item.cartTotal)}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {/* cart */}

            </div>
        </div>
    )
}

export default HistoryCart