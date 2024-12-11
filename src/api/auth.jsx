import axios from "axios";

export const currentUser = async (token) =>
    await axios.post('https://project-ecom-api.vercel.app/Ping-eco/current-user',{},{
    headers:{
        Authorization: `Bearer ${token}`
    }
})

export const currentAdmin = async (token) => {
    return await axios.post('https://project-ecom-api.vercel.app/Ping-eco/current-admin',{},{
        headers:{
            Authorization: `Baarer ${token}`
        }
    })
}