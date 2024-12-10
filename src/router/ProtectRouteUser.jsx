import React, {useState, useEffect} from 'react'
import uesEcomStore from '../store/ecom-store'
import { currentAdmin } from '../api/auth'
import LoadingToRedirect from './LoadingToRedirect'



const ProtectRouteUser = ({eLement}) => {
  const [ ok, setOk ] = useState(false)
  const user = uesEcomStore((state) => state.user)
  const token = uesEcomStore((state) => state.token)
  
    useEffect(() => {
      if (user && token) {
        currentAdmin(token)
        .then((res) => setOk(true))
        .catch((err)=> setOk(false))
      }
    },[])

  return ok ? eLement : <LoadingToRedirect />
}

export default ProtectRouteUser