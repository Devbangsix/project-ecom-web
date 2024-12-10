import axios from "axios";

export const createUserCart = async(token, cart) => {
    return  axios.post('https://project-ecom-api.vercel.app/Ping-eco/user/cart',cart,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}

export const listUserCart = async(token) => {
    return  axios.get('https://project-ecom-api.vercel.app/Ping-eco/user/cart',{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}

export const saveAddress = async(token,address) => {
    return  axios.post('https://project-ecom-api.vercel.app/Ping-eco/user/address',{address},{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}

export const saveOrder = async(token,payload) => {
    return  axios.post('https://project-ecom-api.vercel.app/Ping-eco/user/order',payload,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}

export const getOrders = async(token) => {
    return  axios.get('https://project-ecom-api.vercel.app/Ping-eco/user/order',{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}