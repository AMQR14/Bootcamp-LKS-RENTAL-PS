import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminUser from './pages/Admin/AdminUser'
import AdminLevel from './pages/Admin/AdminLevel'
import AdminOrder from './pages/Admin/AdminOrder'
import AdminRoom from './pages/Admin/AdminRoom'
import AdminInventory from './pages/Admin/AdminInventoris'
import AdminConsumable from './pages/Admin/AdminConsumable'
import More from './pages/More'

function AdminRoute(){
  const {user, loading} = useState()
  const token = localStorage.getItem('token')

  if(loading) return <div>Loading...</div>
  if(!token) return <Navigate to={'/home'} />

  return <Outlet/>
}

function PublicRoute(){
  const {user, loading} = useState()
  const token = localStorage.getItem('token')

  if(loading) return <div>Loading...</div>
  if(token) return <Navigate to={'/admin/dashboard'} />

  return <Outlet/>
}

function AppRoute(){
  return (
    <Routes>
      <Route element={<PublicRoute/>}>
        <Route path='/home' element={<LandingPage/>}/>
        <Route path='/more' element={<More/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Route>

      <Route element={<AdminRoute/>}>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin/user' element={<AdminUser/>}/>
        <Route path='/admin/level' element={<AdminLevel/>}/>
        <Route path='/admin/order' element={<AdminOrder/>}/>
        <Route path='/admin/room' element={<AdminRoom/>}/>
        <Route path='/admin/inventory' element={<AdminInventory/>}/>
        <Route path='/admin/consumable' element={<AdminConsumable/>}/>
      </Route>
    </Routes>
  )
}

function App() {
    return (
      <BrowserRouter>
        <AppRoute/>
      </BrowserRouter>
    )
}

export default App;
