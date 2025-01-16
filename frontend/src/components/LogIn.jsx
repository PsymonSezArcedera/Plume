import { verifyUser } from "../api/userAPI";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"

function LogIn({buttonView}){
    const [user, setUser] = useState({
        email: "",  
        password: ""
    })

    const navigate = useNavigate()

    function handleChange(e){
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e){
        e.preventDefault()
        let response = await verifyUser(user)
        if(response){
            sessionStorage.setItem("User", response)
            axios.defaults.headers.common["Authorization"] = `Bearer ${response}`
            navigate("/homepage")
        }
        else{
            alert("Login failed")
        }
    }


    return(
        <form onSubmit={handleSubmit}>
            <input  placeholder={"Email"} type="email" onChange={handleChange} name ="email" required maxLength={40}></input>
            <input  placeholder={"Password"} type="password" onChange={handleChange} name ="password" required maxLength={40}></input>
            <button type="submit">SIGN IN</button>
            <div>
                {buttonView}
            </div>
        </form>
    )  

}

export default LogIn