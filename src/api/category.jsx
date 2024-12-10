import axios from "axios";

export const createCategory = async(token, form) => {
    return axios.post('https://project-ecom-api.vercel.app/Ping-eco/category',form,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}

export const listCategory = async() => {
    return axios.get('https://project-ecom-api.vercel.app/Ping-eco/category')
}


export const removeCategory = async(token,id) => {
    return axios.delete('https://project-ecom-api.vercel.app/Ping-eco/category/'+id,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}