import React, { useState, useEffect } from 'react'
import uesEcomStore from '../../store/ecom-store'
import { listUserCart,saveAddress } from '../../api/user'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { numberFormat } from '../../utils/number'

const SummaryCart = () => {
    const token = uesEcomStore((state) => state.token)
    const [products, setPrducts] = useState([])
    const [cartTotal, setCartTotal] = useState(0)
    const [address, setAddress] = useState('')
    const [addressSaved, setAddressSaved] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        hdlGetUserCart(token)
    }, [])
    const hdlGetUserCart = (token) => {
        listUserCart(token)
            .then((res) => {
                // console.log(res)
                setPrducts(res.data.products)
                setCartTotal(res.data.cartTotal)
            })
            .catch((err) => {
                console.log('err', err)
            })
    }
    const hdlSaveAddress = () => {
        // console.log(address)
        if(!address) {
            return toast.warning('Please fill address')
        }
        saveAddress(token,address)
        .then((res) => {
            console.log(res)
            toast.success(res.data.message)
            setAddressSaved(true)
        })
        .catch((err) => {
            console.log(err)
        })
        
        
    }
    const hdlGoToPayment = () => {
        if(!addressSaved) {
            return toast.warning("Please enter the delivery address first.")
        }
        navigate('/user/payment')
    }
    return (
        <div className='mx-auto'>
            <div className='flex gap-4 '>
                {/* left */}
                <div className='w-2/4'>
                    <div className='bg-gray-700 p-2 rounded-md border shadow-md space-y-4'>
                        <h1 className='text-white'>Address</h1>
                        <textarea required onChange={(i) => setAddress(i.target.value)} placeholder='Please enter delivery address.' className='w-full px-2' />
                        <button onClick={hdlSaveAddress} className=' w-full text-white  px-4 py-2 bg-indigo-500 hover:bg-indigo-700'>Save Address</button>
                    </div>
                </div>
                {/* right */}
                <div className='w-2/4'>
                    <div className=' bg-gray-700 p-2 rounded-md border shadow-md'>
                        <h1 className='text-white '>Summary</h1>
                        {/* item list */}
                        {
                            products?.map((item,index) =>
                                <div key={index}>
                                    <div className='flex justify-between items-end'>
                                        <div>
                                            <p>{item.product.title}</p>
                                            <p>{item.count} x {numberFormat(item.product.price)}</p>
                                        </div>
                                        <div>
                                            <p className='text-indigo-500 font-bold' >฿{numberFormat(item.count * item.product.price)}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        <hr />
                        <div>
                            <div className='flex justify-between'>
                                <p>Shopping cost :</p>
                                <p className='text-indigo-500 font-bold'>฿</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>discount :</p>
                                <p className='text-indigo-500 font-bold'>฿</p>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <div className='flex justify-between'>
                                <p className='font-bold '>Grand total :</p>
                                <p className='font-bold text-indigo-500 text-lg'>฿{numberFormat(cartTotal)}</p>
                            </div>
                        </div>
                        <div>
                            <button onClick={hdlGoToPayment} className='bg-red-500 hover:bg-red-700 w-full p-2 rounded-md'>Cofirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SummaryCart