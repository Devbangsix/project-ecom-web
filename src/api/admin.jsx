import axios from "axios";

export const getOrdersAdmin = async (token) =>
    await axios.get('https://project-ecom-api.vercel.app/Ping-eco/admin/order', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

export const changeOrderStatus = async (token, orderId, orderStatus) =>
    await axios.put('https://project-ecom-api.vercel.app/Ping-eco/admin/order-status', {
        orderId, orderStatus,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

export const getListAllUsers = async (token) =>
    await axios.get('https://project-ecom-api.vercel.app/Ping-eco/users', {
        headers: {
            Authorization: `Bearer ${token}`
        }
})

export const changeUserStatus = async (token,value) =>
    await axios.post('https://project-ecom-api.vercel.app/Ping-eco/change-status',value, {
        headers: {
            Authorization: `Bearer ${token}`
        }
})

export const changeUserRole = async (token,value) =>
    await axios.post('https://project-ecom-api.vercel.app/Ping-eco/change-role',value, {
        headers: {
            Authorization: `Bearer ${token}`
        }
})