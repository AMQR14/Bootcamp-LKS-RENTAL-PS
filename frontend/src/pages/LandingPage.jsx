import { MoveRightIcon } from 'lucide-react'
import PSImage from '../assets/ps.jpg'
import {Link, useLocation} from 'react-router-dom'

export default function LandingPage(){
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
                            <li className={`hover:underline hover:-translate-y-0.5 transition-all ${location.pathname == '/home' ? 'bg-[#505a97] p-1 px-2 rounded-md' : ''} `}>Home</li>
                            <Link to={'/more'}>
                                <li className={`hover:underline hover:-translate-y-0.5 transition-all ${location.pathname == '/more' ? 'bg-[#505a97] p-1 px-2 rounded-md' : ''} `}>Learn More</li>
                            </Link>
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
                <div className="flex flex-col md:flex-row gap-4 my-20">
                    <div className="md:w-[45%] flex gap-8 flex-col justify-center">
                        <p className="text-4xl font-semibold max-w-140">Welcome to the best PlayStation Rental website on Earth</p>
                        <div className='flex gap-6'>
                            <Link to={'/more'}>
                                <button className='w-fit h-full p-3 px-4 rounded-md bg-[#505a97] font-semibold hover:bg-[#404a8b] transition-all'>Learn More</button>
                            </Link>
                            <Link to={'/register'}>
                                <button className='w-fit p-3 px-4 rounded-md border-2 border-[#505a97] font-semibold hover:border-[#404a8b] transition-all flex gap-2 items-center'>Start Now! <MoveRightIcon/></button>
                            </Link>
                        </div>
                    </div>
                    <div className="rounded-md mt-8 md:mt-0 md:w-[55%] h-fit bg-[#505a97] overflow-hidden border hover:shadow-md transition-all border-[#505a97]">
                        <img src={PSImage} alt="" className=''/>
                    </div>
                </div>
                <div className='text-2xl font-semibold'>Best selling <b className='text-3xl'>Level!!!</b></div>
                <div className='mb-20 mt-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    <div className='border bg-[#2c3258] border-[#505a97] h-full rounded-md p-4'>
                        <div className='flex items-center gap-4'>
                            <div className='w-10 h-10 rounded-md bg-[#f9e75f] text-[#c0aa00] flex items-center justify-center text-2xl font-bold'>1</div>
                            <p className='text-xl font-semibold'>VIP</p>
                        </div>
                        <div className='mt-4 h-full'>
                            <div>
                                <p className='text-lg font-semibold mb-2'>Feature</p>
                                <ul>
                                    <li>- All the stuff from regular</li>
                                    <li>- Personal room</li>
                                    <li>- More AAA game</li>
                                    <li>- Higher quality/newer device</li>
                                    <li>- Free FIH</li>
                                </ul>
                            </div>
                            <div className='justify-end w-full h-auto bottom-0 mt-10 flex items-center'>
                                <div className='border h-10 w-fit p-3 px-4 flex items-center justify-center rounded-md bg-[#505a97] border-[#384284] font-semibold'>$6.7/hour</div>
                            </div>
                        </div>
                    </div>
                    <div className='border bg-[#2c3258] border-[#505a97] h-full rounded-md p-4'>
                        <div className='flex items-center gap-4'>
                            <div className='w-10 h-10 rounded-md bg-[#cecece] text-[#8e8e8e] flex items-center justify-center text-2xl font-bold'>2</div>
                            <p className='text-xl font-semibold'>UMAZING</p>
                        </div>
                        <div className='mt-4 h-full'>
                            <div>
                                <p className='text-lg font-semibold mb-2'>Feature</p>
                                <ul>
                                    <li>- All the stuff from VIP and below</li>
                                    <li>- Free Horse riding</li>
                                    <li>- Bonus Uma musume sticker</li>
                                    <li>- Pony pet</li>
                                    <li>- 10 pulls worth of carats</li>
                                </ul>
                            </div>
                            <div className='justify-end w-full mt-10 flex items-center'>
                                <div className='border h-10 w-fit p-3 px-4 flex items-center justify-center rounded-md bg-[#505a97] border-[#384284] font-semibold'>$42.0/hour</div>
                            </div>
                        </div>
                    </div>
                    <div className='border bg-[#2c3258] border-[#505a97] h-full rounded-md p-4'>
                        <div className='flex items-center gap-4'>
                            <div className='w-10 h-10 rounded-md bg-[#c49c4e] text-[#926712] flex items-center justify-center text-2xl font-bold'>3</div>
                            <p className='text-xl font-semibold'>UMAXXING</p>
                        </div>
                        <div className='mt-4 h-full'>
                            <div>
                                <p className='text-lg font-semibold mb-2'>Feature</p>
                                <ul>
                                    <li>- All the stuff from UMAZING and below</li>
                                    <li>- Uma Musume edition PS 1-5</li>
                                    <li>- Bonus Uma Musume merch</li>
                                    <li>- Bonus Horse</li>
                                    <li>- 20 pulls worth of carats</li>
                                </ul>
                            </div>
                            <div className='justify-end w-full mt-10 flex items-center'>
                                <div className='border h-10 w-fit p-3 px-4 flex items-center justify-center rounded-md bg-[#505a97] border-[#384284] font-semibold'>$69/hour</div>
                            </div>
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