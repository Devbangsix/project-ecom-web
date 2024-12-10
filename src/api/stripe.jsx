import axios from "axios";

export const payment = async (token) =>
    await axios.post('https://project-ecom-api.vercel.app/Ping-eco/user/create-payment-intent',{},{
    headers:{
        Authorization: `Bearer ${token}`
    }
})