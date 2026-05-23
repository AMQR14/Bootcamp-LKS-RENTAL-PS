import { Edit, MoveLeft, Plus, Search, Trash, X } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"
import Dialog from "../../assets/Dialog"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import api from '../../lib/api'

export default function AdminUser(){
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [formCreate, setFormCreate] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [errorCreate, setErrorCreate] = useState({})
    const [formEdit, setFormEdit] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [errorEdit, setErrorEdit] = useState({})
    const [userid, setUserid] = useState('')

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
        setUserid(id)
    }

    async function handleCreate(e) {
        e.preventDefault()
        setErrorCreate({})
        setLoading(false)
        try{
            await api.post('/user', {
                username:formCreate.username,
                email:formCreate.email,
                password:formCreate.password,
            })
            openCreate()
            fetchAllUser()
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
            await api.put(`/user/${userid}`, {
                username:formEdit.username,
                email:formEdit.email,
                password:formEdit.password,
            })
            openEdit()
            fetchAllUser()
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
            await api.delete(`/user/${id}`)
            fetchAllUser()
        }finally{
            setLoading(false)
        }
    }

    async function fetchAllUser() {
        setLoading(true)
        try{
            const res = await api.get('/user')
            setUsers(res.data.users)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchAllUser()
    }, [])

    async function fetchUser() {
        setLoading(true)
        try{
            const res = await api.get(`/user/${userid}`)
            setFormEdit(res.data.user)
            console.log(res.data.user)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(userid){
            fetchUser()
        }
    }, [userid])

    return (
        <AdminLayout>
            {create 
            ? <Dialog>
                <div className="">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Create User</p>
                        <div onClick={()=> openCreate()}>
                            <X/>
                        </div>
                    </div>
                    <form action="" className="mt-8 flex flex-col gap-4" onSubmit={handleCreate}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Username</label>
                            <input type="text" name="" id="" placeholder="Enter username" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormCreate({...formCreate, username:e.target.value})}/>
                            {errorCreate.username && <p className="text-red-400">{errorCreate.username[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Email</label>
                            <input type="email" name="" id="" placeholder="Enter email" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormCreate({...formCreate, email:e.target.value})}/>
                            {errorCreate.email && <p className="text-red-400">{errorCreate.email[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Password</label>
                            <input type="text" name="" id="" placeholder="Enter password"  className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormCreate({...formCreate, password:e.target.value})}/>
                            {errorCreate.password && <p className="text-red-400">{errorCreate.password[0]}</p>}
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
                        <p className="font-semibold">Edit User</p>
                        <div onClick={()=> openEdit()}>
                            <X/>
                        </div>
                    </div>
                    <form action="" className="mt-8 flex flex-col gap-4" onSubmit={handleEdit}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Username</label>
                            <input type="text" value={loading ? 'Loading...' : formEdit?.username} name="" id="" placeholder="Enter username" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormEdit({...formEdit, username:e.target.value})}/>
                            {errorEdit.username && <p className="text-red-400">{errorEdit.username[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Email</label>
                            <input type="email" value={loading ? 'Loading...' : formEdit?.email} name="" id="" placeholder="Enter email" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormEdit({...formEdit, email:e.target.value})}/>
                            {errorEdit.email && <p className="text-red-400">{errorEdit.email[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Password</label>
                            <input type="text" name=""  id="" placeholder="Enter password"  className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormEdit({...formEdit, password:e.target.value})}/>
                            {errorEdit.password && <p className="text-red-400">{errorEdit.password[0]}</p>}
                        </div>
                        <div>
                            <button className="bg-[#505a97] hover:bg-[#444d8c] p-3 px-4 rounded-md mt-8 w-full" type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </Dialog>: ''}
            
            <div>
                <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold">User</p>
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
                                <th className="border-r-2 border-[#505a97] p-2">Username</th>
                                <th className="border-r-2 border-[#505a97] p-2">Email</th>
                                <th className="">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index)=>(
                                <tr className="border-b border-[#505a97]" key={user.id}>
                                    <td className="border-r border-[#505a97] p-2">{index + 1}</td>
                                    <td className="border-r border-[#505a97] p-2">{user.username}</td>
                                    <td className="border-r border-[#505a97] p-2">{user.email}</td>
                                    <td className="w-30 p-2">
                                        <div className="flex w-full justify-center items-center gap-2">
                                            <div className="p-1 px-2 bg-[#4b5ec0] hover:bg-[#3d50ae] transition-all rounded-md" onClick={()=> openEdit(user.id)}>
                                                <Edit/>
                                            </div>
                                            <div className="p-1 px-2 bg-[#c04b4b] hover:bg-[#ae3d3d] transition-all rounded-md" onClick={()=> handleDelete(user.id)}>
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