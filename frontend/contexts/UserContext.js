import { useRouter } from 'next/router'
import React, { createContext, useContext, useState } from 'react'
import { fetchWithCreds } from '../utils/utils'
import { useMessages } from './MessageContext'
const UserContext = createContext()

const UserProvider = ({children})=>{
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const {addMessage} = useMessages()
    const router = useRouter()

    const checkAuth = async (showMsgError=true)=>{
        setLoading(true)
        const response = await fetchWithCreds(`/api/auth/check/`)

        if(!response.success){
            console.log('errMessage', response.error)
            if(showMsgError){
                addMessage({type:"warning", msg:response.error})
            }
            setLoading(false)
            return false
        }
        const data = response.data
        setUser(data)
        setLoading(false)
        return true
    }
    const logout = async ()=>{
        const response = await fetchWithCreds(`/api/logout/`)
        if(!response.success){
            return false
        }
        setUser(undefined)
        addMessage({type:"info", msg:"Successfuly logged out"})
        router.push('/login')

    }
    return(
        <UserContext.Provider value={{checkAuth, user, loading, setLoading, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider

export const useUser = ()=>{
    const context = useContext(UserContext)
    return context
}