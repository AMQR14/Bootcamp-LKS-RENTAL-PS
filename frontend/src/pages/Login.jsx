import { MoveLeft } from "lucide-react";
import {Link} from 'react-router-dom'

export default function Login(){
    return (
        <div className="min-h-screen bg-linear-to-b from-[#2c3258] to-[#1a2145]">
            <div className="flex justify-center">
                <div className="min-h-screen md:w-[50%] bg-[#505a97]">
                    
                </div>
                <div className="md:w-[50%] flex justify-center items-center text-white">
                    <div className="w-90">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xl font-semibold">Welcome</p>
                                <p className="font-semibold">Login into your account</p>
                            </div>
                            <Link to={'/home'}>
                                <div className="bg-[#505a97] hover:bg-[#444d8c] transition-all rounded-md p-2 px-3">
                                    <MoveLeft/>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <form action="" className="mt-8 flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="" className="font-semibold">Email</label>
                                    <input type="text" name="" id="" placeholder="Enter your email" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="" className="font-semibold">Password</label>
                                    <input type="text" name="" id="" placeholder="Enter your password"  className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"/>
                                </div>
                                <div>
                                    <Link to={'/admin/dashboard'}>
                                        <button className="bg-[#505a97] hover:bg-[#444d8c] p-3 px-4 rounded-md mt-8 w-full">Login</button>
                                    </Link>
                                    <div className="w-full flex justify-end">
                                        <p className="text-sm my-2">Doesn't have an account? <Link to={'/register'} className="underline text-[#7d86be] hover:text-[#505a97]">Register</Link></p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}