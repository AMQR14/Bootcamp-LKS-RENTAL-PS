import { Edit, MoveLeft, Plus, Search, Trash, X } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"
import Dialog from "../../assets/Dialog"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../../lib/api"

export default function AdminConsumable(){
    const [consumables, setConsumables] = useState([])
    const [loading, setLoading] = useState(false)
    const [formCreate, setFormCreate] = useState({
        name: '',
        description: '',
        price: '',
    })
    const [errorCreate, setErrorCreate] = useState({})
    const [formEdit, setFormEdit] = useState({
        name: '',
        description: '',
        price: '',
    })
    const [errorEdit, setErrorEdit] = useState({})
    const [consumableid, setConsumableid] = useState('')

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
        setConsumableid(id)
    }

    const [del, setDel] = useState(false)

    const openDelete = (id) => {
        setDel(!del)
        setConsumableid(id)
    }

    async function handleCreate(e) {
        e.preventDefault()
        setErrorCreate({})
        setLoading(false)
        try{
            await api.post('/consumable', {
                name: formCreate.name,
                description: formCreate.description,
                price: formCreate.price,
            })
            openCreate()
            fetchAllConsumable()
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
            await api.put(`/consumable/${consumableid}`, {
                name: formEdit.name,
                description: formEdit.description,
                price: formEdit.price,
            })
            openEdit()
            fetchAllConsumable()
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
            await api.delete(`/consumable/${id}`)
            openDelete()
            fetchAllConsumable()
        }finally{
            setLoading(false)
        }
    }

    async function fetchAllConsumable() {
        setLoading(true)
        try{
            const res = await api.get('/consumable')
            setConsumables(res.data.consumables)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchAllConsumable()
    }, [])

    async function fetchConsumable() {
        setLoading(true)
        try{
            const res = await api.get(`/consumable/${consumableid}`)
            setFormEdit(res.data.consumable)
            console.log(res.data.consumable)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(consumableid){
            fetchConsumable()
        }
    }, [consumableid])
    
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

    const [search, setSearch] = useState('')

    const putSearch = (e) => {
        setSearch(e.target.value)
    }

    const filter = consumables.filter((consumable)=>(
        consumable.name.toLowerCase().includes(search.toLowerCase())
    ))

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
                            <label htmlFor="" className="font-semibold">Price</label>
                            <input type="number" name="" id="" min={1} placeholder="Enter price"  className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormCreate({...formCreate, price:e.target.value})}/>
                            {errorCreate.price && <p className="text-red-400">{errorCreate.price[0]}</p>}
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
                            <label htmlFor="" className="font-semibold">Price</label>
                            <input type="number" value={loading ? 'Loading...' : formEdit?.price} name="" id="" min={1} placeholder="Enter price"  className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormEdit({...formEdit, price:e.target.value})}/>
                            {errorEdit.price && <p className="text-red-400">{errorEdit.price[0]}</p>}
                        </div>
                        <div>
                            <button className="bg-[#505a97] hover:bg-[#444d8c] p-3 px-4 rounded-md mt-8 w-full" type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </Dialog>: ''}

            {del 
            ? <Dialog>
                <div className="h-50 justify-between flex flex-col">
                    <div className="text-center text-lg my-2 mt-10">Are you sure you want to delete?</div>
                    <div>
                        <div className="flex justify-end w-full mt-10 gap-4">
                            <button className="p-2 px-4 rounded-md bg-[#c04b4b] hover:bg-[#ae3d3d] transition-all" onClick={()=> handleDelete(consumableid)}>Delete</button>
                            <button className="p-2 px-4 rounded-md bg-[#505a97] hover:bg-[#444d8c] transition-all" onClick={()=> openDelete()}>Cancel</button>
                        </div>
                    </div>
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
                            <input type="text" name="" id="" placeholder="Search..." className="rounded-md p-2 px-3 focus:outline-none" value={search} onChange={putSearch}/>
                            <Search className="mr-2 text-[#505a97]"/>
                        </div>
                        <div className="bg-[#505a97] hover:bg-[#444d8c] transition-all rounded-md p-2 px-3 flex items-center  justify-center" onClick={()=> openCreate()}>
                            <Plus/>
                        </div>
                    </div>
                </div>
                {loading ? `Loading...` :  consumables.length == 0 ? 'There is no consumables' :
                <div className="mt-4 border border-[#505a97] w-full">
                    <table className="w-full">
                        <thead className="border-b border-[#505a97]">
                            <tr className="bg-[#57609d]">
                                <th className="border-r-2 border-[#505a97] p-2">No</th>
                                <th className="border-r-2 border-[#505a97] p-2">Name</th>
                                <th className="border-r-2 border-[#505a97] p-2">Description</th>
                                <th className="border-r-2 border-[#505a97] p-2">Price</th>
                                <th className="">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filter.map((consumable, index)=>(
                                <tr className="border-b border-[#505a97]"  key={consumable.id}>
                                    <td className="border-r border-[#505a97] p-2">{index + 1}</td>
                                    <td className="border-r border-[#505a97] p-2">{consumable.name}</td>
                                    <td className="border-r border-[#505a97] p-2">{consumable.description}</td>
                                    <td className="border-r border-[#505a97] p-2">${consumable.price}</td>
                                    <td className="w-30 p-2">
                                        <div className="flex w-full justify-center items-center gap-2">
                                            <div className="p-1 px-2 bg-[#4b5ec0] hover:bg-[#3d50ae] transition-all rounded-md" onClick={()=> openEdit(consumable.id)}>
                                                <Edit/>
                                            </div>
                                            <div className="p-1 px-2 bg-[#c04b4b] hover:bg-[#ae3d3d] transition-all rounded-md" onClick={()=> openDelete(consumable.id)}>
                                                <Trash/>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>}
            </div>
        </AdminLayout>
    )
}