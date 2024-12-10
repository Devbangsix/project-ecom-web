import React, { useEffect, useState } from 'react'
import uesEcomStore from '../../store/ecom-store'
import { createProduct, deleteProduct } from '../../api/product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
import { Link } from 'react-router-dom'
import { FilePenLine } from 'lucide-react';
import { Eraser } from 'lucide-react';
import {numberFormat} from '../../utils/number'
import { dateFormat } from '../../utils/dateformant'


const initialState = {
    "title": "",
    "description": "",
    "price": "",
    "quantity": "",
    "categoryId": '',
    "images": []
}

const FromProduct = () => {
    const token = uesEcomStore((state) => state.token)
    const getCategory = uesEcomStore((state) => state.getCategory)
    const category = uesEcomStore((state) => state.category)
    const getProduct = uesEcomStore((state) => state.getProduct)
    const products = uesEcomStore((state) => state.products)
    // console.log(products)

    const [form, setForm] = useState({
        "title": "",
        "description": "",
        "price": "",
        "quantity": "",
        "categoryId": '',
        "images": []
    })
    useEffect(() => {
        getCategory()
        getProduct(100)
    }, [])
    // console.log(category)

    const handleOnChange = (i) => {
        console.log(i.target.name, i.target.value)
        setForm({
            ...form,
            [i.target.name]: i.target.value
        })
    }

    const handleSubmit = async (i) => {
        i.preventDefault()
        try {
            const res = await createProduct(token, form)
            // console.log(res.title)
            setForm(initialState)
            console.log(res.data)
            toast.success(`Add Product ${res.data.title} Succsee`)
            getProduct()

        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        console.log(id)
        if (window.confirm('do you really want to delet???')) {
            try {
                const res = await deleteProduct(token, id)
                toast.success(`Delete ${res.data.title} Succsee!`)
                getProduct()
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div className='container mx-auto p-4 bg-slate-800 text-white '>
            <form onSubmit={handleSubmit} className='text-slate-900 '>
                <h1 className='text-white'>Add Product</h1>
                <input className='border flex mt-2'
                    value={form.title}
                    onChange={handleOnChange}
                    placeholder='title'
                    name='title'
                />

                <input className='border flex flex-1 mt-2 '
                    value={form.description}
                    onChange={handleOnChange}
                    placeholder='description'
                    name='description'
                />

                <input className='border flex flex-1 mt-2'
                    type='number'
                    value={form.price}
                    onChange={handleOnChange}
                    placeholder='price'
                    name='price'
                />

                <input className='border flex flex-1 mt-2'
                    type='number'
                    value={form.quantity}
                    onChange={handleOnChange}
                    placeholder='quantity'
                    name='quantity'
                />
                <select
                    className='border flex flex-1 mt-2'
                    name='categoryId'
                    onChange={handleOnChange}
                    value={form.categoryId}
                >
                    <option value=" " disabled > Please Select</option>
                    {
                        category.map((item, index) =>

                            <option key={index} value={item.id}>{item.name}</option>
                        )
                    }
                </select>
                <hr />
                <Uploadfile form={form} setForm={setForm} />

                <button className='bg-blue-600 mt-2 hover:scale-105 hover:-translate-y-1 hover:duration-200'>Add Product</button>
                <hr />
                <br />
                <table className="table bg-slate-200 w-full border">
                    <thead>
                        <tr className='bg-slate-600'>
                            <th scope="col">No.</th>
                            <th scope="col">image</th>
                            <th scope="col">Name</th>
                            <th scope="col">details</th>
                            <th scope="col">price</th>
                            <th scope="col">conut</th>
                            <th scope="col">sell</th>
                            <th scope="col">date</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item, index) => {
                                // console.log(item)
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                            {
                                                item.images.length > 0
                                                    ? <img
                                                        className='w-20 h-20 rounded-lg shadow-md'
                                                        src={item.images[0].url} />
                                                    : <div
                                                        className='w-20 h-20 bg-slate-400 shadow-md rounded-lg flex items-center justify-center'>
                                                        No Image
                                                    </div>
                                            }
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{numberFormat(item.price)}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.sold}</td>
                                        <td>{dateFormat(item.updatedAt)}</td>
                                        <td className='flex gap-2'>
                                            <p className='bg-yellow-400 mt-2 hover:scale-105 hover:-translate-y-2 hover:duration-200'>
                                                <Link to={'/admin/product/' + item.id}><FilePenLine /></Link>
                                            </p>
                                            <p
                                                onClick={() => handleDelete(item.id)}
                                                className='bg-red-400 mt-2 hover:scale-105 hover:-translate-y-2 hover:duration-200'>
                                                <Eraser />
                                            </p>
                                        </td>
                                    </tr>

                                )
                            })
                        }
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default FromProduct