import { Edit, MoveLeft, Plus, Search, Trash, X } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"
import Dialog from "../../assets/Dialog"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import api from '../../lib/api'

export default function AdminLevel(){
    const [levels, setLevels] = useState([])
    const [loading, setLoading] = useState(false)
    const [formCreate, setFormCreate] = useState({
        name: '',
        description: '',
        price: '',
        feature: '',
    })
    const [errorCreate, setErrorCreate] = useState({})
    const [formEdit, setFormEdit] = useState({
        name: '',
        description: '',
        price: '',
        feature: '',
    })
    const [errorEdit, setErrorEdit] = useState({})
    const [levelid, setLevelid] = useState('')

    const [create , setCreate] = useState(false)

    const openCreate = () => {
        setCreate(!create)
        setFormCreate('')
        setErrorCreate('')
        setAllFeatures([])
        setFeature('')
    }

    const [edit , setEdit] = useState(false)

    const openEdit = (id) => {
        setEdit(!edit)
        setFormEdit('')
        setErrorEdit('')
        setLevelid(id)
        setFormCreate('')
        setErrorCreate('')
        setAllFeatures([])
        setFeature('')
    }

    const [del, setDel] = useState(false)

    const openDelete = (id) => {
        setDel(!del)
        setLevelid(id)
    }

    async function handleCreate(e) {
        e.preventDefault()
        setErrorCreate({})
        setLoading(false)
        try{
            await api.post('/level', {
                name: formCreate.name,
                description: formCreate.description,
                price: formCreate.price,
                feature: allFeatures,
            })
            openCreate()
            fetchAllLevel()
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
        setErrorCreate({})
        setLoading(false)
        try{
            await api.post('/level', {
                name: formCreate.name,
                description: formCreate.description,
                price: formCreate.price,
                feature: allFeatures,
            })
            await api.delete(`/level/${levelid}`)
            openEdit()
            fetchAllLevel()
        }catch(err){
            if(err.response.status == 422){
                setErrorCreate(err.response.data.errors)
            }
        }finally{
            setLoading(false)
        }
    }
    
    async function handleDelete(id) {
        setLoading(true)
        try{
            await api.delete(`/level/${id}`)
            openDelete()
            fetchAllLevel()
        }finally{
            setLoading(false)
        }
    }

    async function fetchAllLevel() {
        setLoading(true)
        try{
            const res = await api.get('/level')
            setLevels(res.data.levels)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchAllLevel()
    }, [])

    async function fetchLevel() {
        setLoading(true)
        try{
            const res = await api.get(`/level/${levelid}`)
            setFormCreate(res.data.level)
            setAllFeatures(res.data.level.level_feature.map(e=>e.name))
            console.log(res.data.level.level_feature)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(levelid){
            fetchLevel()
        }
    }, [levelid])

    const [allFeatures, setAllFeatures] = useState([])
    const [feature, setFeature] = useState('')

    const addFeature = (e) => {
        setFeature(e.target.value)
        console.log(feature)
    }

    const putFeature = () =>{
        setAllFeatures(prev => [...prev, feature])
        console.log(allFeatures)
    }

    const removeFeature = (feat) =>{
        setAllFeatures(allFeatures.filter((i)=> i != feat))
    }

    const [search, setSearch] = useState('')

    const putSearch = (e) => {
        setSearch(e.target.value)
    }

    const filter = levels.filter((level)=>(
        level.name.toLowerCase().includes(search.toLowerCase())
    ))

    return (
        <AdminLayout>
            {create 
            ? <Dialog>
                <div className="">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Create Level</p>
                        <div onClick={()=> openCreate()}>
                            <X/>
                        </div>
                    </div>
                    <div action="" className="mt-8 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Name</label>
                            <input type="text" name="" id="" placeholder="Enter name" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormCreate({...formCreate, name:e.target.value})}/>
                            {errorCreate.name && <p className="text-red-400">{errorCreate.name[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Description</label>
                            <input type="text" name="" id="" placeholder="Enter desctiption" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormCreate({...formCreate, description:e.target.value})}/>
                            {errorCreate.description && <p className="text-red-400">{errorCreate.description[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Price/hour</label>
                            <input type="number" name="" min={1} max={100} id="" placeholder="Enter price" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormCreate({...formCreate, price:e.target.value})}/>
                            {errorCreate.price && <p className="text-red-400">{errorCreate.price[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Features</label>
                            <div className="flex gap-2">
                                <input type="text" name="" id="" placeholder="Enter Feature"  className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none w-full" value={feature} onChange={addFeature}/>
                                <div className="bg-[#505a97] hover:bg-[#444d8c] transition-all rounded-md p-2 px-3 flex items-center  justify-center" onClick={feature != '' ? putFeature : ''}>
                                    <Plus/>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                {allFeatures.map((all)=>(
                                    <div className="group/add bg-[#505a97] hover:bg-[#444d8c] p-2 rounded-md flex justify-between" onClick={()=> removeFeature(all)}>
                                        <p>{all}</p>
                                        <X className="hidden group-hover/add:block transition-all"/>
                                    </div>
                                ))}
                            </div>
                            {errorCreate.feature && <p className="text-red-400">{errorCreate.feature[0]}</p>}
                        </div>
                        <div>
                            <button className="bg-[#505a97] hover:bg-[#444d8c] p-3 px-4 rounded-md mt-8 w-full" onClick={handleCreate}>Create</button>
                        </div>
                    </div>
                </div>
            </Dialog>: ''}

            {edit 
            ? <Dialog>
                <div className="">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Edit Level</p>
                        <div onClick={()=> openEdit()}>
                            <X/>
                        </div>
                    </div>
                    <div action="" className="mt-8 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Name</label>
                            <input type="text" value={loading ? 'Loading...' : formCreate?.name} name="" id="" placeholder="Enter name" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormCreate({...formCreate, name:e.target.value})}/>
                            {errorCreate.name && <p className="text-red-400">{errorCreate.name[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Description</label>
                            <input type="text" value={loading ? 'Loading...' : formCreate?.description} name="" id="" placeholder="Enter desctiption" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormCreate({...formCreate, description:e.target.value})}/>
                            {errorCreate.description && <p className="text-red-400">{errorCreate.description[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Price/hour</label>
                            <input type="number" value={loading ? 'Loading...' : formCreate?.price} name="" min={1} max={100} id="" placeholder="Enter price" className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none"onChange={e => setFormCreate({...formCreate, price:e.target.value})}/>
                            {errorCreate.price && <p className="text-red-400">{errorCreate.price[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Features</label>
                            <div className="flex gap-2">
                                <input type="text" name="" id="" placeholder="Enter Feature"  className="[#2c3258] border-[#353b64] hover:border-[#505a97] transition-all border-2 rounded-md p-2 px-3 focus:outline-none w-full" value={feature} onChange={addFeature}/>
                                <div className="bg-[#505a97] hover:bg-[#444d8c] transition-all rounded-md p-2 px-3 flex items-center  justify-center" onClick={feature != '' ? putFeature : ''}>
                                    <Plus/>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                {allFeatures.map((all)=>(
                                    <div className="group/add bg-[#505a97] hover:bg-[#444d8c] p-2 rounded-md flex justify-between" onClick={()=> removeFeature(all)}>
                                        <p>{all}</p>
                                        <X className="hidden group-hover/add:block transition-all"/>
                                    </div>
                                ))}
                            </div>
                            {errorCreate.feature && <p className="text-red-400">{errorCreate.feature[0]}</p>}
                        </div>
                        <div>
                            <button className="bg-[#505a97] hover:bg-[#444d8c] p-3 px-4 rounded-md mt-8 w-full" onClick={handleEdit}>Create</button>
                        </div>
                    </div>
                </div>
            </Dialog>: ''}

            {del 
            ? <Dialog>
                <div className="h-50 justify-between flex flex-col">
                    <div className="text-center text-lg my-2 mt-10">Are you sure you want to delete?</div>
                    <div>
                        <div className="flex justify-end w-full mt-10 gap-4">
                            <button className="p-2 px-4 rounded-md bg-[#c04b4b] hover:bg-[#ae3d3d] transition-all" onClick={()=> handleDelete(levelid)}>Delete</button>
                            <button className="p-2 px-4 rounded-md bg-[#505a97] hover:bg-[#444d8c] transition-all" onClick={()=> openDelete()}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Dialog>: ''}
            
            <div>
                <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold">Level</p>
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
                {loading ? `Loading...` :  levels.length == 0 ? 'There is no levels' :
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
                            {filter.map((level, index)=>(
                                <tr className="border-b border-[#505a97]">
                                    <td className="border-r border-[#505a97] p-2">{index + 1}</td>
                                    <td className="border-r border-[#505a97] p-2">{level.name}</td>
                                    <td className="border-r border-[#505a97] p-2">{level.description}</td>
                                    <td className="border-r border-[#505a97] p-2">${level.price}</td>
                                    <td className="w-30 p-2">
                                        <div className="flex w-full justify-center items-center gap-2">
                                            <div className="p-1 px-2 bg-[#4b5ec0] hover:bg-[#3d50ae] transition-all rounded-md" onClick={()=> openEdit(level.id)}>
                                                <Edit/>
                                            </div>
                                            <div className="p-1 px-2 bg-[#c04b4b] hover:bg-[#ae3d3d] transition-all rounded-md" onClick={()=> openDelete(level.id)}>
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