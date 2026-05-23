import { Edit, MoveLeft, Plus, Search, Trash, X } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"
import Dialog from "../../assets/Dialog"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import api from '../../lib/api'

export default function AdminRoom(){
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(false)
    const [formCreate, setFormCreate] = useState({
        name: '',
        description: '',
        capacity: '',
        status: '',
    })
    const [errorCreate, setErrorCreate] = useState({})
    const [formEdit, setFormEdit] = useState({
        name: '',
        description: '',
        capacity: '',
        status: '',
    })
    const [errorEdit, setErrorEdit] = useState({})
    const [roomid, setRoomid] = useState('')

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
        setRoomid(id)
    }

    async function handleCreate(e) {
        e.preventDefault()
        setErrorCreate({})
        setLoading(false)
        try{
            await api.post('/room', {
                name: formCreate.name,
                description: formCreate.description,
                capacity: formCreate.capacity,
                status: formCreate.status,
            })
            openCreate()
            fetchAllRoom()
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
            await api.put(`/room/${roomid}`, {
                name: formEdit.name,
                description: formEdit.description,
                capacity: formEdit.capacity,
                status: formEdit.status,
            })
            openEdit()
            fetchAllRoom()
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
            await api.delete(`/room/${id}`)
            fetchAllRoom()
        }finally{
            setLoading(false)
        }
    }

    async function fetchAllRoom() {
        setLoading(true)
        try{
            const res = await api.get('/room')
            setRooms(res.data.rooms)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchAllRoom()
    }, [])

    async function fetchRoom() {
        setLoading(true)
        try{
            const res = await api.get(`/room/${roomid}`)
            setFormEdit(res.data.room)
            console.log(res.data.room)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(roomid){
            fetchRoom()
        }
    }, [roomid])

    return (
        <AdminLayout>
            {create 
            ? <Dialog>
                <div className="">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Create Room</p>
                        <div onClick={()=> openCreate()}>
                            <X/>
                        </div>
                    </div>
                    <form action="" className="mt-8 flex flex-col gap-4" onSubmit={handleCreate}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Name</label>
                            <input type="text" name="" min={1} id="" placeholder="Enter name" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormCreate({...formCreate, name:e.target.value})}/>
                            {errorCreate.name && <p className="text-red-400">{errorCreate.name[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Description</label>
                            <input type="text" name="" min={1} id="" placeholder="Enter description" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormCreate({...formCreate, description:e.target.value})}/>
                            {errorCreate.description && <p className="text-red-400">{errorCreate.description[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Capacity</label>
                            <input type="number" name="" min={1} id="" placeholder="Enter capacity" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormCreate({...formCreate, capacity:e.target.value})}/>
                            {errorCreate.capacity && <p className="text-red-400">{errorCreate.capacity[0]}</p>}
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
                        <p className="font-semibold">Edit Room</p>
                        <div onClick={()=> openEdit()}>
                            <X/>
                        </div>
                    </div>
                    <form action="" className="mt-8 flex flex-col gap-4" onSubmit={handleEdit}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Name</label>
                            <input type="text" value={loading ? 'Loading...' : formEdit?.name} name="" min={1} id="" placeholder="Enter name" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormEdit({...formEdit, name:e.target.value})}/>
                            {errorEdit.name && <p className="text-red-400">{errorEdit.name[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Description</label>
                            <input type="text" value={loading ? 'Loading...' : formEdit?.description} name="" min={1} id="" placeholder="Enter description" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormEdit({...formEdit, description:e.target.value})}/>
                            {errorEdit.description && <p className="text-red-400">{errorEdit.description[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Capacity</label>
                            <input type="number" value={loading ? 'Loading...' : formEdit?.capacity} name="" min={1} id="" placeholder="Enter capacity" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormEdit({...formEdit, capacity:e.target.value})}/>
                            {errorEdit.capacity && <p className="text-red-400">{errorEdit.capacity[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Status</label>
                            <select name="" id="" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormEdit({...formEdit, status:e.target.value})}>
                                <option value="" disabled className="bg-[#2c3258]">Select Status</option>
                                <option value="Occupied" className="bg-[#2c3258]" selected={formEdit.status == "Occupied"}>Occupied</option>
                                <option value="Not Occupied" className="bg-[#2c3258]" selected={formEdit.status == "Not Occupied"}>Not Occupied</option>
                            </select>
                            {errorEdit.status && <p className="text-red-400">{errorEdit.status[0]}</p>}
                        </div>
                        <div>
                            <button className="bg-[#505a97] hover:bg-[#444d8c] p-3 px-4 rounded-md mt-8 w-full" type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </Dialog>: ''}
            
            <div>
                <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold">Room</p>
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
                                <th className="border-r-2 border-[#505a97] p-2">Name</th>
                                <th className="border-r-2 border-[#505a97] p-2">Description</th>
                                <th className="border-r-2 border-[#505a97] p-2">Capacity</th>
                                <th className="border-r-2 border-[#505a97] p-2">Status</th>
                                <th className="">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((room, index)=>(
                                <tr className="border-b border-[#505a97]" key={room.id}>
                                    <td className="border-r border-[#505a97] p-2">{index + 1}</td>
                                    <td className="border-r border-[#505a97] p-2">{room.name}</td>
                                    <td className="border-r border-[#505a97] p-2">{room.description}</td>
                                    <td className="border-r border-[#505a97] p-2">{room.capacity}</td>
                                    <td className="border-r border-[#505a97] p-2">{room.status}</td>
                                    <td className="w-30 p-2">
                                        <div className="flex w-full justify-center items-center gap-2">
                                            <div className="p-1 px-2 bg-[#4b5ec0] hover:bg-[#3d50ae] transition-all rounded-md" onClick={()=> openEdit(room.id)}>
                                                <Edit/>
                                            </div>
                                            <div className="p-1 px-2 bg-[#c04b4b] hover:bg-[#ae3d3d] transition-all rounded-md" onClick={()=> handleDelete(room.id)}>
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