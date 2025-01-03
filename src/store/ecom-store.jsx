import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { listCategory } from "../api/category";
import { listProduct, searchFilters } from "../api/product";
import _ from 'lodash'

const ecomStore = (set, get) => ({
    user: null,
    token: null,
    category: [],
    products: [],
    carts: [],
    logout: () => {
        set({
            user: null,
            token: null,
            category: [],
            products: [],
            carts: [],
        })
    },
    actionLogin: async (form) => {
        const res = await axios.post('https://project-ecom-api.vercel.app/Ping-eco/login', form)
        // console.log(res.data.token)
        set({
            user: res.data.Payload,
            token: res.data.token
        })
        return res
    },
    getCategory: async () => {
        try {
            const res = await listCategory()
            set({
                category: res.data
            })
        } catch (err) {
            console.log(err)
        }
    },
    getProduct: async (count) => {
        try {
            const res = await listProduct(count)
            set({
                products: res.data
            })
        } catch (err) {
            console.log(err)
        }
    },
    actionSearchFilters: async (arg) => {
        try {
            const res = await searchFilters(arg)
            set({
                products: res.data
            })
        } catch (err) {
            console.log(err)
        }
    },
    actionAddtoCart: (product) => {
        const carts = get().carts
        const updateCart = [...carts, { ...product, count: 1 }]
        const uniqu = _.unionWith(updateCart, _.isEqual)
        // console.log('hello',updateCart)
        // console.log('uuiqu',uniqu)
        set({
            carts: uniqu
        })
    },
    actionUpdateQuantity: (productId, newQuantity) => {
        // console.log('update', productId, newQuantity)
        set((state) => ({
            carts: state.carts.map((item) =>
                item.id === productId
                    ? {...item, count: Math.max(1, newQuantity)}
                    : item
            )
        }))
    },
    actionRemoveProduct: (productId) => {
        // console.log('Remove',productId)
        set((state) => ({
            carts: state.carts.filter((item) =>
                item.id !== productId
            )
        }))
    },
    getTotalPrice:() => {
        return get().carts.reduce((total,item)=>{
            return total + item.price * item.count
        },0)
    },
    clearCart: () =>{
        set({carts: []})
    }
})
const usePersist = {
    name: 'ecom-store',
    storage: createJSONStorage(() => localStorage)
}

const uesEcomStore = create(persist(ecomStore), usePersist)

export default uesEcomStore