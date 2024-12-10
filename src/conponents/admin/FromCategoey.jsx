import React, { useEffect, useState } from 'react'
import { createCategory, listCategory,removeCategory } from '../../api/category'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'

const FromCategoey = () => {

    const token = useEcomStore((state) => state.token)
    const [name, setName] = useState('')
    // const [ category, setCategory] = useState([])
    const category = useEcomStore((state) => state.category)
    const getCategory = useEcomStore(state => state.getCategory)

    useEffect(() => {
        getCategory(token)
    },[])

    const haedleSubmit = async (i) => {
        i.preventDefault()
        // console.log({name})
        if (!name) {
            return toast.warning('Please fikk data')
        }
        try {
            const res = await createCategory(token, { name })
            console.log(res)
            toast.success(`Add Category ${res.data.name} success!`)
            getCategory(token)
        } catch (err) {
            console.log(err)
        }
    }

    // const getCategory = async (token) => {
    //     try {
    //         const res = await listCategory(token)
    //         setCategory(res.data)
    //         console.log(res)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    const haedleRemove = async (id) =>{
        console.log(id)
        try {
            const res = await removeCategory(token,id)
            console.log(res)
            toast.success(`Delete ${res.data.name} success!`)
            getCategory(token)
        }catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='container mx-auto p-4 bg-slate-800'>
            <h1 className='text-white'>
                Category Management
            </h1>
            <form className='my-4' onSubmit={haedleSubmit}>
                <input onChange={(i) => setName(i.target.value)} type="text" className='border' />
                <button className='bg-blue-800 mt-2 text-white'> Add Category </button>
            </form>
            <hr />
                <ul className='list-none'>
                    {
                        category.map((item,index) =>
                            <il key={index} className='flex justify-between my-2'>
                                <span className='text-white' >
                                    {item.name}
                                </span>
                                
                                <button onClick={()=>haedleRemove(item.id)} className='bg-red-500'>Delete</button>
                            </il>
                        )
                    }
                </ul>
        </div>
    )
}

export default FromCategoey