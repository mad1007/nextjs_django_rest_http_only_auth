import { useEffect } from 'react'
import { useUser } from '../contexts/UserContext'
import styles from '../styles/Home.module.css'
import {useRouter} from 'next/router'
import Spinner from 'react-bootstrap/Spinner';
import Game from '../components/Game/Game';

export default function Home() {
  const {checkAuth, user, loading, logout} = useUser()
  const router = useRouter()
  useEffect(() => {
    const authenticate = async ()=>{
      if(!user){
        const auth = await checkAuth()
        if(auth){
          console.log('Authenticated')
        }else{
          router.push('/login')
        }
      }
    }
    authenticate()

  }, [])
  if(loading || loading === undefined) return (
    <div className='w-100 m-auto text-center mt-5'>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
  </div>
  )

  return (
    <div className="container mt-5">
      <h1>Hello {user?.username}</h1>
    </div>
  )
}
