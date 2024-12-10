import React, { useEffect, useState } from 'react'
import uesEcomStore from '../../store/ecom-store'
import { createProduct, readProduct, updateProduct } from '../../api/product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
import { useParams, useNavigate } from 'react-router-dom'

const initialState = {
    "title": "mouse",
    "description": "desc",
    "price": '800',
    "quantity": '20',
    "categoryId": '',
    "images": []
}

const FromEditProduct = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const token = uesEcomStore((state) => state.token)
    const getCategory = uesEcomStore((state) => state.getCategory)
    const category = uesEcomStore((state) => state.category)
    // console.log(products)

    const [form, setForm] = useState(initialState)
    useEffect(() => {
        getCategory()
        fetchProduct(token, id, form)
    }, [])
    
    const fetchProduct = async(token) => {
        try {
            const res = await readProduct(token ,id ,form)
            console.log('readProduct' ,res)
            setForm(res.data)
        }catch(err){
            console.log('fetch err',err)
        }
    }

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
            const res = await updateProduct(token,id,form)
            // console.log(res)
            toast.success(`Add Product ${res.data.title} succsee!`)
            navigate('/admin/product')
           
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='container mx-auto p-4 bg-slate-800 text-white'>
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
                
                <button className='bg-blue-600 mt-2'>Edit Product</button>
                <hr />
                <br />
                
            </form>
        </div>
    )
}

export default FromEditProduct