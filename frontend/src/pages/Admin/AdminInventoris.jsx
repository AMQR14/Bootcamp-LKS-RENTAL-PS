import { Edit, MoveLeft, Plus, Search, Trash, Trophy, X } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"
import Dialog from "../../assets/Dialog"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import api from '../../lib/api'

export default function AdminInventory(){
    const [inventorys, setInventorys] = useState([])
    const [loading, setLoading] = useState(false)
    const [formCreate, setFormCreate] = useState({
        room_id: '',
        name: '',
        description: '',
        quantity: '',
        status: '',
    })
    const [errorCreate, setErrorCreate] = useState({})
    const [formEdit, setFormEdit] = useState({
        room_id: '',
        name: '',
        description: '',
        quantity: '',
        status: '',
    })
    const [errorEdit, setErrorEdit] = useState({})
    const [inventoryid, setInventoryid] = useState('')

    const [create , setCreate] = useState(false)

    const openCreate = () => {
        setCreate(!create)
        setFormCreate('')
        setErrorCreate('')
    }

    const [edit , setEdit] = useState(false)

    const openEdit = (id) => {
        setEdit(!edit)
        setFormEdit('')
        setErrorEdit('')
        setInventoryid(id)
    }

    async function handleCreate(e) {
        e.preventDefault()
        setErrorCreate({})
        setLoading(false)
        try{
            await api.post('/inventory', {
                room_id: formCreate.room_id,
                name: formCreate.name,
                description: formCreate.description,
                quantity: formCreate.quantity,
                status: formCreate.status,
            })
            openCreate()
            fetchAllInventory()
        }catch(err){
            if(err.response.status == 422){
                setErrorCreate(err.response.data.errors)
            }
        }finally{
            setLoading(false)
        }
    }

    async function handleEdit(e) {
        e.preventDefault()
        setErrorEdit({})
        setLoading(false)
        try{
            await api.put(`/inventory/${inventoryid}`, {
                room_id: formEdit.room_id,
                name: formEdit.name,
                description: formEdit.description,
                quantity: formEdit.quantity,
                status: formEdit.status,
            })
            openEdit()
            fetchAllInventory()
        }catch(err){
            if(err.response.status == 422){
                setErrorEdit(err.response.data.errors)
            }
        }finally{
            setLoading(false)
        }
    }
    
    async function handleDelete(id) {
        setLoading(true)
        try{
            await api.delete(`/inventory/${id}`)
            fetchAllInventory()
        }finally{
            setLoading(false)
        }
    }

    async function fetchAllInventory() {
        setLoading(true)
        try{
            const res = await api.get('/inventory')
            setInventorys(res.data.inventories)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchAllInventory()
    }, [])

    async function fetchInventory() {
        setLoading(true)
        try{
            const res = await api.get(`/inventory/${inventoryid}`)
            setFormEdit(res.data.inventory)
            console.log(res.data.inventory)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(inventoryid){
            fetchInventory()
        }
    }, [inventoryid])
    
    const [rooms, setRooms]= useState([])

    async function fetchRoom() {
        setLoading(true)
        try{
            const res = await api.get('/room')
            setRooms(res.data.rooms)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchRoom()
    }, [])

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
                    <form action="" className="mt-8 flex flex-col gap-4" onSubmit={handleCreate}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Room</label>
                            <select name="" id="" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormCreate({...formCreate, room_id:e.target.value})}>
                                <option value="" disabled selected className="bg-[#2c3258]">Select Room</option>
                                {rooms.map((room)=>(
                                    <option value={room.id} className="bg-[#2c3258]">{room.name}</option>
                                ))}
                            </select>
                            {errorCreate.room_id && <p className="text-red-400">{errorCreate.room_id[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Name</label>
                            <input type="text" name="" id="" placeholder="Enter name"  className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormCreate({...formCreate, name:e.target.value})}/>
                            {errorCreate.name && <p className="text-red-400">{errorCreate.name[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Description</label>
                            <input type="text" name="" id="" placeholder="Enter description"  className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormCreate({...formCreate, description:e.target.value})}/>
                            {errorCreate.description && <p className="text-red-400">{errorCreate.description[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Quantity</label>
                            <input type="number" min={1} name="" id="" placeholder="Enter quantity"  className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormCreate({...formCreate, quantity:e.target.value})}/>
                            {errorCreate.quantity && <p className="text-red-400">{errorCreate.quantity[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Status</label>
                            <select name="" id="" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormCreate({...formCreate, status:e.target.value})}>
                                <option value="" disabled selected className="bg-[#2c3258]">Select Status</option>
                                <option value="Occupied" className="bg-[#2c3258]">Occupied</option>
                                <option value="Not Occupied" className="bg-[#2c3258]">Not Occupied</option>
                            </select>
                            {errorCreate.status && <p className="text-red-400">{errorCreate.status[0]}</p>}
                        </div>
                        <div>
                            <button className="bg-[#505a97] hover:bg-[#444d8c] p-3 px-4 rounded-md mt-8 w-full" type="submit">Create</button>
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
                    <form action="" className="mt-8 flex flex-col gap-4" onSubmit={handleEdit}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Room</label>
                            <select name="" id="" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormEdit({...formEdit, room_id:e.target.value})}>
                                <option value="" disabled selected className="bg-[#2c3258]">Select Room</option>
                                {rooms.map((room)=>(
                                    <option value={room.id} className="bg-[#2c3258]" selected={formEdit.room_id == room.id}>{room.name}</option>
                                ))}
                            </select>
                            {errorEdit.room_id && <p className="text-red-400">{errorEdit.room_id[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Name</label>
                            <input type="text" value={loading ? 'Loading...' : formEdit?.name} name="" id="" placeholder="Enter name"  className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormEdit({...formEdit, name:e.target.value})}/>
                            {errorEdit.name && <p className="text-red-400">{errorEdit.name[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Description</label>
                            <input type="text" value={loading ? 'Loading...' : formEdit?.description} name="" id="" placeholder="Enter description"  className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormEdit({...formEdit, description:e.target.value})}/>
                            {errorEdit.description && <p className="text-red-400">{errorEdit.description[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Quantity</label>
                            <input type="number" value={loading ? 'Loading...' : formEdit?.quantity} min={1} name="" id="" placeholder="Enter quantity"  className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormEdit({...formEdit, quantity:e.target.value})}/>
                            {errorEdit.quantity && <p className="text-red-400">{errorEdit.quantity[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Status</label>
                            <select name="" id="" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormEdit({...formEdit, status:e.target.value})}>
                                <option value="" disabled selected className="bg-[#2c3258]">Select Status</option>
                                <option value="Occupied" className="bg-[#2c3258]" selected={formEdit.status == "Occupied"}>Occupied</option>
                                <option value="Not Occupied" className="bg-[#2c3258]" selected={formEdit.status == "Not Occupied"}>Not Occupied</option>
                            </select>
                            {errorEdit.status && <p className="text-red-400">{errorEdit.status[0]}</p>}
                        </div>
                        <div>
                            <button className="bg-[#505a97] hover:bg-[#444d8c] p-3 px-4 rounded-md mt-8 w-full" type="submit">Create</button>
                        </div>
                    </form>
                </div>
            </Dialog>: ''}
            
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <p className="text-xl font-semibold bg-[#505a97] rounded-md p-1 px-2">Inventory</p>
                        |
                        <Link to={'/admin/consumable'}>
                            <p className="text-xl font-semibold text-gray-500 hover:bg-[#505a97] rounded-md p-1 px-2 transition-all">Consumables</p>
                        </Link>
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
                                <th className="border-r-2 border-[#505a97] p-2">Room</th>
                                <th className="border-r-2 border-[#505a97] p-2">Name</th>
                                <th className="border-r-2 border-[#505a97] p-2">Description</th>
                                <th className="border-r-2 border-[#505a97] p-2">Quantity</th>
                                <th className="border-r-2 border-[#505a97] p-2">Status</th>
                                <th className="">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventorys.map((inventory, index)=>(
                                <tr className="border-b border-[#505a97]" key={inventory.id}>
                                    <td className="border-r border-[#505a97] p-2">{index + 1}</td>
                                    <td className="border-r border-[#505a97] p-2">{inventory.room.name}</td>
                                    <td className="border-r border-[#505a97] p-2">{inventory.name}</td>
                                    <td className="border-r border-[#505a97] p-2">{inventory.description}</td>
                                    <td className="border-r border-[#505a97] p-2">{inventory.quantity}</td>
                                    <td className="border-r border-[#505a97] p-2">{inventory.status}</td>
                                    <td className="w-30 p-2">
                                        <div className="flex w-full justify-center items-center gap-2">
                                            <div className="p-1 px-2 bg-[#4b5ec0] hover:bg-[#3d50ae] transition-all rounded-md" onClick={()=> openEdit(inventory.id)}>
                                                <Edit/>
                                            </div>
                                            <div className="p-1 px-2 bg-[#c04b4b] hover:bg-[#ae3d3d] transition-all rounded-md" onClick={()=> handleDelete(inventory.id)}>
                                                <Trash/>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    )
}