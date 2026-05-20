import { Children } from "react";

export default function Dialog({children}){
    return (
        <div>
            <div className="bg-black/40 fixed w-full min-h-screen top-0 left-0 flex items-center justify-center">
                <div className="bg-[#2c3258] p-4 rounded-md w-full sm:w-100 m-10 max-w-100">
                    {children}
                </div>
            </div>
        </div>
    )
}