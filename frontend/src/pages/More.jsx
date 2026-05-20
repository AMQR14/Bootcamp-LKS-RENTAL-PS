import { MoveRightIcon } from 'lucide-react'
import PSImage from '../assets/ps.jpg'
import {Link, useLocation} from 'react-router-dom'

export default function More(){
    const location = useLocation()

    return (
        <div className="min-h-screen bg-linear-to-b from-[#2c3258]  to-[#1a2145]">
            <header className='sticky top-0'>
                <div className="h-20 bg-[#404a8b] px-6 flex items-center text-white justify-between">
                    <div>
                        <p className="text-3xl font-bold">REN-PLAY</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <ul className="flex gap-4 font-semibold items-center">
                            <Link to={'/home'}>
                                <li className={`hover:underline hover:-translate-y-0.5 transition-all ${location.pathname == '/home' ? 'bg-[#505a97] p-1 px-2 rounded-md' : ''} `}>Home</li>
                            </Link>
                            <li className={`hover:underline hover:-translate-y-0.5 transition-all ${location.pathname == '/more' ? 'bg-[#505a97] p-1 px-2 rounded-md' : ''} `}>Learn More</li>
                        </ul>
                        <div className="w-8 flex items-center justify-center">
                            <div className="w-0.5 h-10 bg-[#2c3258]"></div>
                        </div>
                        <div>
                            <Link to={'/login'}>
                                <button className="bg-[#2c3258] hover:bg-[#363c63] transition-all p-2 px-5 rounded-md font-semibold">Login</button>
                            </Link>
                        </div>    
                    </div>
                </div>
                <div className="h-7 bg-[#505a97]"></div>
            </header>
            <main className="text-white m-10 my-12">
                <div className="flex flex-col lg:flex-row gap-10 my-20">
                    <div className="rounded-lg mt-0 lg:w-[55%] h-fit bg-[#505a97] overflow-hidden border hover:shadow-md transition-all border-[#505a97]">
                        <img src={PSImage} alt="" className=''/>
                    </div>
                    <div className="lg:w-[45%] flex gap-8 flex-col justify-center">
                        <div className='gap-4 flex flex-col'>
                            <p className='text-2xl font-semibold'>Lorem ipsum dolor sit consectetur adipisicing elit</p>

                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis a quam consequuntur adipisci, et quasi labore illo iste incidunt cupiditate explicabo repudiandae. Magnam minus dicta aspernatur nesciunt corporis assumenda ab.</p>

                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis a quam consequuntur adipisci, et quasi labore illo iste incidunt cupiditate explicabo repudiandae. Magnam minus dicta aspernatur nesciunt corporis assumenda ab.</p>

                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis a quam consequuntur adipisci, et quasi labore illo iste incidunt cupiditate explicabo repudiandae. Magnam minus dicta aspernatur nesciunt corporis assumenda ab.</p>
                        </div>
                        <div className='flex gap-6'>
                            <Link to={'/home'}>
                                <button className='w-fit h-full p-3 px-4 rounded-md bg-[#505a97] font-semibold hover:bg-[#404a8b] transition-all'>Go Back</button>
                            </Link>
                            <Link to={'/register'}>
                                <button className='w-fit p-3 px-4 rounded-md border-2 border-[#505a97] font-semibold hover:border-[#404a8b] transition-all flex gap-2 items-center'>Start Now! <MoveRightIcon/></button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <footer className='b-0'>
                <div className="h-7 bg-[#505a97]"></div>
                <div className='bg-[#404a8b] h-14'></div>
            </footer>
        </div>
    )
}