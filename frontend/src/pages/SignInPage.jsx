import CreateUser from "../components/CreateUser"
import LogIn from "../components/LogIn"
import { useState } from "react"

function SignInPage(){

    const [view, setView] = useState(0)

    return(
        <>
            {!view ?
            <div className="flex flex-col"> 
                <LogIn buttonView={<button onClick={() => setView(!view)}>Sign Up</button>}/>
                
            </div>: 
            <>
                <CreateUser buttonView={<button  onClick={() => setView(!view)}>Login</button>}/>
            </>}   
        </>
    )
}

export default SignInPage