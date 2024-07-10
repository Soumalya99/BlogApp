import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './Appwrite/auth_serv';
import {login, logout} from './Store/authSlice'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { Outlet } from 'react-router-dom';


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
      /** checking for currentUserState while App mounts */
    authService.currentUserStatus()
    .then((userData)=>{
      /** perform actions based on userData */
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout({userData}))
      }
    })
    .finally(() => setLoading(false))
    
  }, [])

  /**     Conditional rendering based on loading state */
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between '>
    <div className='w-full block'>
      <Header/>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
    </div>
  ) : null


}

export default App
