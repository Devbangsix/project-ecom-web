import React, { useEffect, useState } from 'react'
import { getOrdersAdmin,changeOrderStatus } from '../../api/admin'
import uesEcomStore from '../../store/ecom-store'
import { Pyramid } from 'lucide-react';
import {toast} from 'react-toastify'
import {numberFormat} from '../../utils/number'
import { dateFormat } from '../../utils/dateformant';


const TableOrders = () => {
    const token = uesEcomStore((state) => state.token)
    const [order, setOrder] = useState([])
    useEffect(() => {
        hdlGetOrder(token)
    }, [])
    const hdlGetOrder = (token) => {
        getOrdersAdmin(token)
            .then((res) => {
                setOrder(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const handleChangeOrderStatus = (token,orderId,orderStatus) => {
        // console.log(orderId,orderStatus)
        changeOrderStatus(token,orderId,orderStatus)
            .then((res) => {
                console.log(res)
                toast.success('Update Status Success')
                hdlGetOrder(token)
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
        <div className='container mx-auto p-4 bg-slate-800 text-white '>
            <div>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>user</th>
                            <th>date</th>
                            <th>product</th>
                            <th>summary</th>
                            <th>status</th>
                            <th>manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order?.map((item, index) => {
                                console.log(item)
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <p>{item.orderBy.email}</p>
                                            <p>{item.orderBy.address}</p>
                                        </td>
                                        <td>
                                            {dateFormat(item.createdAt)}
                                        </td>
                                        <td className='px-2 py-4'>
                                            {

                                                item.products?.map((product, index) =>
                                                    <li key={index}>
                                                        <span>{product.product.title}</span>
                                                        <span>{product.count} x {numberFormat(product.product.price)}</span>
                                                    </li>
                                                )
                                            }
                                        </td>
                                        <td>{numberFormat(item.cartTotal)}</td>

                                        <td>
                                            <span className={`${getStatusColor(item.orderstatus)} px-2 py-1 rounded-full`}>
                                                {item.orderstatus}
                                            </span>
                                        </td>
                                        <td>
                                            <select
                                            value={item.orderStatus}
                                            onChange={(i)=>handleChangeOrderStatus(token,item.id,i.target.value)}
                                             className='text-black'>
                                                <option>Not Process</option>
                                                <option>Processing</option>
                                                <option>Completed</option>
                                                <option>Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableOrders