import AdminLayout from "../../layouts/AdminLayout"

export default function AdminDashboard(){
    return (
        <AdminLayout>
            <div className="">
                <div className="sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 grid">
                    <div className="h-40 rounded-md bg-[#505a97]"></div>
                    <div className="h-40 rounded-md bg-[#505a97]"></div>
                    <div className="h-40 rounded-md bg-[#505a97]"></div>
                    <div className="h-40 rounded-md bg-[#505a97]"></div>
                </div>
                <div className="mt-6">
                    <div className="rounded-md bg-[#505a97] h-130"></div>
                </div>
            </div>
        </AdminLayout>
    )
}