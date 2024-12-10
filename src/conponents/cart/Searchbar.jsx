import React, { useEffect, useState } from 'react'
import uesEcomStore from '../../store/ecom-store'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Searchbar = () => {

    const getProduct = uesEcomStore((state) => state.getProduct)
    const products = uesEcomStore((state) => state.products)
    const actionSearchFilters = uesEcomStore((state) => state.actionSearchFilters)
    const getCategory = uesEcomStore((state) => state.getCategory)
    const category = uesEcomStore((state) => state.category)
    const [text, setText] = useState('')
    const [categorySelected, setCategorySelected] = useState([])
    const [price, setPrice] = useState([0, 9000])
    const [ok, setOk] = useState(false)

    useEffect(() => {
        getCategory()
    }, [])

    // console.log(text)
    useEffect(() => {
        const delay = setTimeout(() => {
            if (text) {
                actionSearchFilters({ query: text })
            } else {
                getProduct()
            }
        }, 300)

        return () => clearTimeout(delay)
    }, [text])

    const headleCheck = (i) => {
        // console.log(i.target.value)
        const inCheck = i.target.value
        const inState = [...categorySelected]
        const findChectk = inState.indexOf(inCheck)
        if (findChectk === -1) {
            inState.push(inCheck)
        } else {
            inState.splice(findChectk, 1)
        }
        setCategorySelected(inState)
        actionSearchFilters({ category: inState })
        if (inState.length > 0) {
            actionSearchFilters({ category: inState })
        } else {
            getProduct()
        }
    }
    // console.log(categorySelected)
    useEffect(() => {
        actionSearchFilters({price})
    }, [ok])
    const headlePrice = (value => {
        console.log(value)
        setPrice(value)
        setTimeout(() =>{
            setOk(!ok)
        },300)
    })

    return (
        <div>
            <p className='text-xl font-bold mb-4'>Search</p>
            <input
                onChange={(i) => setText(i.target.value)}
                type="text"
                placeholder='Search'
                className='border rounded-md w-full mb-4' />
            <hr />
            <div>
                <p>
                    Category
                </p>
                <div>
                    {
                        category.map((item, index) =>
                            <div key={index} className='flex gap-2'>
                                <input
                                    onChange={headleCheck}
                                    value={item.id}
                                    type='checkbox' />
                                <label>{item.name}</label>
                            </div>
                        )
                    }
                </div>
            </div>
            <div>
                <p>Price</p>
                <div className='flex justify-between'>
                    <span>Min :{price[0]}</span>
                    <span>Max :{price[1]}</span>
                </div>
                <div>
                {/* <input onChange={headlePrice} type="range"  min={0} max={1000000}/> */}
                    <Slider onChange={headlePrice}
                    range
                    min={0}
                    max={100000}
                    defaultValue={[1000,60000]}/>

                </div>
            </div>
        </div>
    )
}

export default Searchbar