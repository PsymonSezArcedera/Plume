import { createUser } from "../api/userAPI"
import { useState } from "react"

function CreateUser({buttonView}){
 
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "", 
    })

    function handleChange(e){
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e){
        e.preventDefault()
        let response = await createUser(user)
        console.log(response)
        if(response.status !== 200) {
            alert("User account could not be created")
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <input placeholder={"First Name"} onChange={handleChange} name="firstName" required maxLength={20}/>
            <input placeholder={"Last Name"} onChange={handleChange} name="lastName" required maxLength={20}/>
            <input placeholder={"Email"} onChange={handleChange} name="email" required maxLength={20}/>
            <input placeholder={"Password"} onChange={handleChange} name="password" required maxLength={20}/>
            <button type="submit">Create Account</button>
            <div>
                {buttonView}
            </div>
        </form>
    )   
}

export default CreateUser