import axios from "axios";

export const createProduct = async(token, form) => {
    return  axios.post('https://project-ecom-api.vercel.app/Ping-eco/product',form,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}

export const listProduct = async(count = 20) => {
    return  axios.get('https://project-ecom-api.vercel.app/Ping-eco/products/'+count)
}

export const readProduct = async(token, id) => {
    return  axios.get('https://project-ecom-api.vercel.app/Ping-eco/product/'+id,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}

export const deleteProduct = async(token, id) => {
    return  axios.delete('https://project-ecom-api.vercel.app/Ping-eco/product/'+id,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}

export const updateProduct = async(token, id, form) => {
    return  axios.put('https://project-ecom-api.vercel.app/Ping-eco/product/'+id,form,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}

export const uploadFiles = async(token, form) => {
    return  axios.post('https://project-ecom-api.vercel.app/Ping-eco/images',{
        image:form
        
    },{
        headers:{
            Authorization:`Bearer ${token}`
        }
        
    })
}

export const removeFiles = async(token, public_id) => {
    return  axios.post('https://project-ecom-api.vercel.app/Ping-eco/removeimage',{
        public_id
        
    },{
        headers:{
            Authorization:`Bearer ${token}`
        }
        
    })
}

export const searchFilters = async(arg) => {
    return  axios.post('https://project-ecom-api.vercel.app/Ping-eco/search/filters',arg)
}

export const listProductBy = async(sort,order,limit) => {
    return  axios.post('https://project-ecom-api.vercel.app/Ping-eco/productby',{sort,order,limit,})
}
