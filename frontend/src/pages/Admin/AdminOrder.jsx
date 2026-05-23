import { Edit, MoveLeft, Plus, Search, Trash, X } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"
import Dialog from "../../assets/Dialog"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import api from '../../lib/api'
import { useAuth } from "../../context/AuthContext"

export default function AdminOrder(){
    const {user} = useAuth()

    const userid = user.data?.id

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [formCreate, setFormCreate] = useState({
        user_id: '',
        level_id: '',
        time: '',
        price_payed: '',
        status: '',
    })
    const [errorCreate, setErrorCreate] = useState({})
    const [formEdit, setFormEdit] = useState({
        user_id: '',
        level_id: '',
        time: '',
        price_payed: '',
        status: '',
    })
    const [errorEdit, setErrorEdit] = useState({})
    const [orderid, setOrderid] = useState('')

    const [create , setCreate] = useState(false)

    const openCreate = () => {
        setCreate(!create)
        setFormCreate('')
        setErrorCreate('')
        setLevelid('')
        setTime('')
        setLevelPrice(0)
    }

    const [edit , setEdit] = useState(false)

    const openEdit = (id) => {
        setEdit(!edit)
        setFormEdit('')
        setErrorEdit('')
        setOrderid(id)
        setLevelid('')
        setTime('')
        setLevelPrice(0)
        
    }
    const [del, setDel] = useState(false)

    const openDelete = (id) => {
        setDel(!del)
        setOrderid(id)
    }

    async function handleCreate(e) {
        e.preventDefault()
        setErrorCreate({})
        setLoading(false)
        try{
            await api.post('/order', {
                user_id: userid,
                level_id: levelid,
                time: time,
                price_payed: Math.round(levelPrice * time),
                status: formCreate.status,
            })
            openCreate()
            fetchAllOrder()
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
            await api.put(`/order/${orderid}`, {
                user_id: userid,
                level_id: levelid,
                time: time,
                price_payed: Math.round(levelPrice * time),
                status: formEdit.status,
            })
            openEdit()
            fetchAllOrder()
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
            await api.delete(`/order/${id}`)
            openDelete()
            fetchAllOrder()
        }finally{
            setLoading(false)
        }
    }

    async function fetchAllOrder() {
        setLoading(true)
        try{
            const res = await api.get('/order')
            setOrders(res.data.orders)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchAllOrder()
    }, [])

    async function fetchOrder() {
        setLoading(true)
        try{
            const res = await api.get(`/order/${orderid}`)
            setFormEdit(res.data.order)
            setLevelid(res.data.order.level_id)
            setTime(res.data.order.time)
            // console.log(res.data.order)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(orderid){
            fetchOrder()
        }
    }, [orderid])

    const [levels, setLevels] = useState([])

    async function fetchLevel() {
        setLoading(true)
        try{
            const res = await api.get('/level')
            setLevels(res.data.levels)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchLevel()
    }, [])

    //levelid

    const [levelid, setLevelid] = useState('')

    const putLevelid = (e) =>{
        setLevelid(e.target.value)
        console.log(levelid)
    }

    //time

    const [time, setTime] = useState(1)

    const putTime = (e) =>{
        setTime(e.target.value)
        console.log(time)
    }

    const [levelPrice, setLevelPrice] = useState(0)

    async function fetchLevelPrice() {
        setLoading(true)
        try{
            const res = await api.get(`/level/${levelid}`)
            setLevelPrice(res.data.level.price)
            console.log(res.data.level.price)
        }finally{
            setLoading(false)
        }
    } 

    useEffect(()=>{
        if(levelid){
            fetchLevelPrice()
        }
    }, [levelid])

    const [search, setSearch] = useState('')

    const putSearch = (e) => {
        setSearch(e.target.value)
    }

    const filter = orders.filter((order)=>(
        order.user.username.toLowerCase().includes(search.toLowerCase())
    ))

    return (
        <AdminLayout>
            {create 
            ? <Dialog>
                <div className="">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Create Order</p>
                        <div onClick={()=> openCreate()}>
                            <X/>
                        </div>
                    </div>
                    <form action="" className="mt-8 flex flex-col gap-4" onSubmit={handleCreate}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Level</label>
                            <select name="" id="" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"value={levelid} onChange={putLevelid}>
                                <option value="" disabled selected className="bg-[#2c3258]">Select Level</option>
                                {levels.map((level)=>(
                                    <option value={level.id} className="bg-[#2c3258]">{level.name}</option>
                                ))}
                            </select>
                            {errorCreate.level_id && <p className="text-red-400">{errorCreate.level_id[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Time (hour)</label>
                            <input type="number" min={1} step={0} name="" id="" placeholder="Enter time"  className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none" value={time} onChange={putTime}/>
                            {errorCreate.time && <p className="text-red-400">{errorCreate.time[0]}</p>}
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
                        <div className="flex items-center gap-2 mt-2">
                            <label htmlFor="" className="font-semibold">Price:</label>
                            <div className="bg-[#505a97] p-1 px-3 rounded-md">${Math.round(levelPrice * time)}</div>
                        </div>
                        <div>
                            <button className="bg-[#505a97] hover:bg-[#444d8c] p-3 px-4 rounded-md mt-6 w-full" type="submit">Create</button>
                        </div>
                    </form>
                </div>
            </Dialog>: ''}

            {edit 
            ? <Dialog>
                <div className="">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Edit Order</p>
                        <div onClick={()=> openEdit()}>
                            <X/>
                        </div>
                    </div>
                    <form action="" className="mt-8 flex flex-col gap-4" onSubmit={handleEdit}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Level</label>
                            <select name="" id="" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none" value={levelid} onChange={putLevelid}>
                                <option value="" disabled selected className="bg-[#2c3258]">Select Level</option>
                                {levels.map((level)=>(
                                    <option value={level.id} className="bg-[#2c3258]">{level.name}</option>
                                ))}
                            </select>
                            {errorEdit.level_id && <p className="text-red-400">{errorEdit.level_id[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Time (hour)</label>
                            <input type="number" min={1} step={0} name="" id="" placeholder="Enter time"  className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none" value={time} onChange={putTime}/>
                            {errorEdit.time && <p className="text-red-400">{errorEdit.time[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Status</label>
                            <select name="" id="" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormEdit({...formEdit, status:e.target.value})}>
                                <option value="" disabled selected className="bg-[#2c3258]">Select Status</option>
                                <option value="Occupied" className="bg-[#2c3258] " selected={formEdit.status == "Occupied"}>Occupied</option>
                                <option value="Not Occupied" className="bg-[#2c3258]" selected={formEdit.status == "Not Occupied"}>Not Occupied</option>
                            </select>
                            {errorEdit.status && <p className="text-red-400">{errorEdit.status[0]}</p>}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <label htmlFor="" className="font-semibold">Price:</label>
                            <div className="bg-[#505a97] p-1 px-3 rounded-md">${Math.round(levelPrice * time)}</div>
                        </div>
                        <div>
                            <button className="bg-[#505a97] hover:bg-[#444d8c] p-3 px-4 rounded-md mt-6 w-full" type="submit">Save</button>
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
                            <button className="p-2 px-4 rounded-md bg-[#c04b4b] hover:bg-[#ae3d3d] transition-all" onClick={()=> handleDelete(orderid)}>Delete</button>
                            <button className="p-2 px-4 rounded-md bg-[#505a97] hover:bg-[#444d8c] transition-all" onClick={()=> openDelete()}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Dialog>: ''}
            
            <div>
                <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold">Order</p>
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
                {loading ? `Loading...` :  orders.length == 0 ? 'There is no orders' :
                <div className="mt-4 border border-[#505a97] w-full">
                    <table className="w-full">
                        <thead className="border-b border-[#505a97]">
                            <tr className="bg-[#57609d]">
                                <th className="border-r-2 border-[#505a97] p-2">No</th>
                                <th className="border-r-2 border-[#505a97] p-2">User</th>
                                <th className="border-r-2 border-[#505a97] p-2">Level</th>
                                <th className="border-r-2 border-[#505a97] p-2">Time</th>
                                <th className="border-r-2 border-[#505a97] p-2">Price Payed</th>
                                <th className="border-r-2 border-[#505a97] p-2">Status</th>
                                <th className="">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filter.map((order, index)=>(
                                <tr className="border-b border-[#505a97]" key={order.id}>
                                    <td className="border-r border-[#505a97] p-2">{index + 1}</td>
                                    <td className="border-r border-[#505a97] p-2">{order.user.username}</td>
                                    <td className="border-r border-[#505a97] p-2">{order.level.name}</td>
                                    <td className="border-r border-[#505a97] p-2">{order.time}</td>
                                    <td className="border-r border-[#505a97] p-2">${order.price_payed}</td>
                                    <td className="border-r border-[#505a97] p-2">{order.status}</td>
                                    <td className="w-30 p-2">
                                        <div className="flex w-full justify-center items-center gap-2">
                                            <div className="p-1 px-2 bg-[#4b5ec0] hover:bg-[#3d50ae] transition-all rounded-md" onClick={()=> openEdit(order.id)}>
                                                <Edit/>
                                            </div>
                                            <div className="p-1 px-2 bg-[#c04b4b] hover:bg-[#ae3d3d] transition-all rounded-md" onClick={()=> openDelete(order.id)}>
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