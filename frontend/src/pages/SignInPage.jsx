import CreateUser from "../components/CreateUser"
import LogIn from "../components/LogIn"
import { useState } from "react"

function SignInPage(){

    const [view, setView] = useState(0)

    return(
        <>
            {!view ?
            <div className="flex flex-col"> 
                <LogIn buttonView={<button className="font-black text-sky-950 bg-green-500 rounded-full w-96 h-10 " onClick={() => setView(!view)}>SIGN UP</button>}/>
                
            </div>: 
            <>
                <CreateUser buttonView={<button className="font-black text-sky-950 bg-green-500 rounded-full w-96 h-10 " onClick={() => setView(!view)}>SIGN IN</button>}/>
            </>}   
        </>
    )
}

export default SignInPage