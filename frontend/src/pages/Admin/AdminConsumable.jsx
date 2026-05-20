import { Edit, MoveLeft, Plus, Search, Trash, X } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"
import Dialog from "../../assets/Dialog"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function AdminConsumable(){
    const [create , setCreate] = useState(false)

    const openCreate = () => {
        setCreate(!create)
    }

    const [edit , setEdit] = useState(false)

    const openEdit = () => {
        setEdit(!edit)
    }

    return (
        <AdminLayout>
            {create 
            ? <Dialog>
                <div className="">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Create Item</p>
                        <div onClick={()=> openCreate()}>
                            <X/>
                        </div>
                    </div>
                    <form action="" className="mt-8 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Item Name</label>
                            <input type="text" name="" id="" placeholder="Enter item name"  className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Type</label>
                            <select name="" id="" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none">
                                <option value="" disabled selected className="bg-[#2c3258]">Select Type</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Price</label>
                            <input type="number" name="" id="" min={1} placeholder="Enter price"  className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Stock</label>
                            <input type="number" name="" id="" min={0} placeholder="Enter stock"  className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"/>
                        </div>
                        <div>
                            <button className="bg-[#505a97] hover:bg-[#444d8c] p-3 px-4 rounded-md mt-8 w-full" onClick={()=> openCreate()}>Create</button>
                        </div>
                    </form>
                </div>
            </Dialog>: ''}

            {edit 
            ? <Dialog>
                <div className="">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Edit Item</p>
                        <div onClick={()=> openEdit()}>
                            <X/>
                        </div>
                    </div>
                    <form action="" className="mt-8 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Item Name</label>
                            <input type="text" name="" id="" placeholder="Enter item name"  className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Type</label>
                            <select name="" id="" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none">
                                <option value="" disabled selected className="bg-[#2c3258]">Select Type</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Price</label>
                            <input type="number" name="" id="" min={1} placeholder="Enter price"  className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Stock</label>
                            <input type="number" name="" id="" min={0} placeholder="Enter stock"  className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"/>
                        </div>
                        <div>
                            <button className="bg-[#505a97] hover:bg-[#444d8c] p-3 px-4 rounded-md mt-8 w-full" onClick={()=> openEdit()}>Edit</button>
                        </div>
                    </form>
                </div>
            </Dialog>: ''}
            
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <Link to={'/admin/inventory'}>
                            <p className="text-xl font-semibold text-gray-500 hover:bg-[#505a97] rounded-md p-1 px-2 transition-all">Inventory</p>
                        </Link>
                        |
                        <p className="text-xl font-semibold bg-[#505a97] rounded-md p-1 px-2">Consumables</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="border-2 rounded-md h-full border-[#353b64] hover:border-[#505a97] transition-all flex items-center">
                            <input type="text" name="" id="" placeholder="Search..." className="rounded-md p-2 px-3 focus:outline-none"/>
                            <Search className="mr-2 text-[#505a97]"/>
                        </div>
                        <div className="bg-[#505a97] hover:bg-[#444d8c] transition-all rounded-md p-2 px-3 flex items-center  justify-center" onClick={()=> openCreate()}>
                            <Plus/>
                        </div>
                    </div>
                </div>
                <div className="mt-4 border border-[#505a97] w-full">
                    <table className="w-full">
                        <thead className="border-b border-[#505a97]">
                            <tr className="bg-[#57609d]">
                                <th className="border-r-2 border-[#505a97] p-2">No</th>
                                <th className="border-r-2 border-[#505a97] p-2">Item ID</th>
                                <th className="border-r-2 border-[#505a97] p-2">Item</th>
                                <th className="border-r-2 border-[#505a97] p-2">Type</th>
                                <th className="border-r-2 border-[#505a97] p-2">Price</th>
                                <th className="border-r-2 border-[#505a97] p-2">Stock</th>
                                <th className="">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-[#505a97]">
                                <td className="border-r border-[#505a97] p-2">No</td>
                                <td className="border-r border-[#505a97] p-2">Item ID</td>
                                <td className="border-r border-[#505a97] p-2">Item</td>
                                <td className="border-r border-[#505a97] p-2">Type</td>
                                <td className="border-r border-[#505a97] p-2">Price</td>
                                <td className="border-r border-[#505a97] p-2">Stock</td>
                                <td className="w-30 p-2">
                                    <div className="flex w-full justify-center items-center gap-2">
                                        <div className="p-1 px-2 bg-[#4b5ec0] hover:bg-[#3d50ae] transition-all rounded-md" onClick={()=> openEdit()}>
                                            <Edit/>
                                        </div>
                                        <div className="p-1 px-2 bg-[#c04b4b] hover:bg-[#ae3d3d] transition-all rounded-md">
                                            <Trash/>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    )
}