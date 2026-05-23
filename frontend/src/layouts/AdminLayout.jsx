import { Menu } from 'lucide-react'
import { useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminLayout({children}){
    const location = useLocation()
    const [openSide, setOpenSide] = useState(true)
    const [openProfile, setOpenProfile] = useState(false)
    const {logout} = useAuth()

    const openingSide = () =>{
        setOpenSide(!openSide)
    }

    const openingProfile = () =>{
        setOpenProfile(!openProfile)
    }

    return (
        <div className='flex flex-col h-screen'>
            <header className='sticky top-0'>
                <div className="h-20 bg-[#404a8b] px-6 flex items-center text-white justify-between">
                    <div className={`bg-[#505a97] ${openSide == true ? 'ml-34' : 'ml-0'}   p-1 rounded-md`}>
                        <Menu className='text-[#2c3258]' onClick={()=> openingSide()}/>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="w-8 flex items-center justify-center">
                            <div className="w-0.5 h-10 bg-[#2c3258]"></div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <p className='font-semibold'>ADMIN 1</p>
                            <div className='bg-[#505a97] h-12 w-12 rounded-full' onClick={()=> openingProfile()}></div>
                        </div>    
                    </div>
                </div>
            </header>
            {openProfile == true 
            ? <div className='flex w-full justify-end'>
                <div className='h-45 w-40 fixed bg-[#404a8b] rounded-bl-2xl flex flex-col justify-between p-2'>
                    <div className='flex flex-col text-white ml-2'>
                        <p className='font-semibold'>Admin1</p>
                        <p className='text-sm text-gray-300'>Admin</p>
                    </div>
                    <div className='flex flex-col gap-2 text-white m-2'>
                        <button className='p-2 px-4 rounded-md bg-[#505a97] hover:bg-[#5e67a4] transition-all'>Profile</button>
                        <div className='h-0.5 w-full bg-[#2c3258]'>
                            <div></div>
                        </div>
                            <button className='p-2 px-4 w-full rounded-md bg-[#b95656] hover:bg-[#d16e6e] transition-all' onClick={()=> logout()}>Logout</button>
                    </div>
                </div>
            </div> : ''}
            
            {openSide == true 
            ? <div className='flex fixed top-0 left-0 bottom-0 w-40 bg-[#404a8b] text-white flex-col items-center  border-[#505a97]'>
                <div>
                    <p className="text-2xl font-bold my-6">REN-PLAY</p>
                </div>
                <div>
                    <ul className='font-semibold my-2'>
                        <Link to={'/admin/dashboard'}>
                            <li className={`${location.pathname == '/admin/dashboard' ? 'border-l-5 hover:border-white' : ''}  hover:border-l-5 hover:border-white p-3 px-4 hover:bg-[#505a97] transition-all`}>Dashboard</li>
                        </Link>
                        <Link to={'/admin/user'}>
                            <li className={`${location.pathname == '/admin/user' ? 'border-l-5 hover:border-white' : ''}  hover:border-l-5 hover:border-white p-3 px-4 hover:bg-[#505a97] transition-all`}>User</li>
                        </Link>
                        <Link to={'/admin/level'}>
                            <li className={`${location.pathname == '/admin/level' ? 'border-l-5 hover:border-white' : ''}  hover:border-l-5 hover:border-white p-3 px-4 hover:bg-[#505a97] transition-all`}>Level</li>
                        </Link>
                        <Link to={'/admin/order'}>
                            <li className={`${location.pathname == '/admin/order' ? 'border-l-5 hover:border-white' : ''}  hover:border-l-5 hover:border-white p-3 px-4 hover:bg-[#505a97] transition-all`}>Order</li>
                        </Link>
                        <Link to={'/admin/room'}>
                            <li className={`${location.pathname == '/admin/room' ? 'border-l-5 hover:border-white' : ''}  hover:border-l-5 hover:border-white p-3 px-4 hover:bg-[#505a97] transition-all`}>Room</li>
                        </Link>
                        <Link to={'/admin/inventory'}>
                            <li className={`${location.pathname == '/admin/inventory' ? 'border-l-5 hover:border-white' : ''}  hover:border-l-5 hover:border-white p-3 px-4 hover:bg-[#505a97] transition-all`}>Inventory</li>
                        </Link>
                    </ul>
                </div>
            </div>: ''}
            <main className={`h-full ${openSide == true ? 'ml-40 pl-0' : 'pr-7 ml-0' }  text-white px-7 bg-[#404a8b] overflow-hidden`}>
                <div className='bg-linear-to-b from-[#2c3258]  to-[#1a2145] rounded-xl w-full overflow-auto p-6 px-8 h-full'>
                    {children}
                </div>
            </main>
            <footer className='b-0'>
                <div className='bg-[#404a8b] h-7'></div>
            </footer>
        </div>
    )
}