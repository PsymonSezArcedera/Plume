import { createUser } from "../api/userAPI"
import { useState } from "react"
import logo from "../assets/plume_logo.png"
function CreateUser({buttonView}){
 
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "", 
    })

    const [type, setType] = useState('password');
    const [pass, setPass] = useState('show')
    
    function handleToggle(){
        if (type==='password'){
            setPass('hide');
            setType('text')
         } else {
            setPass('show')
            setType('password')
         }
    }

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
        <div className="flex flex-col md:flex-row justify-between min-h-screen h-screen">
            <form className="flex flex-col items-center w-full md:w-2/3 lg:w-1/2 shadow-2xl self-center m-4 md:m-10 lg:m-40 rounded-2xl h-screen"  onSubmit={handleSubmit}>
                <img src={logo} className="w-16 h-16 object-contain mt-10" alt="plume-logo"/>
                <h1 className="font-black text-sky-950 text-3xl">SIGN UP</h1>
                <input className="bg-sky-100 w-11/12 md:w-96 p-2 rounded-xl m-2 text-green-600 border-0" placeholder={"First Name"} onChange={handleChange} name="firstName" required maxLength={20}/>
                <hr className="m-2 w-11/12 md:w-96"></hr>
                <input className="bg-sky-100 w-11/12 md:w-96 p-2 rounded-xl m-2 text-green-600 border-0" placeholder={"Last Name"} onChange={handleChange} name="lastName" required maxLength={20}/>
                <hr className="m-2 w-11/12 md:w-96"></hr>
                <input className="bg-sky-100 w-11/12 md:w-96 p-2 rounded-xl m-2 text-green-600 border-0" placeholder={"Email"} onChange={handleChange} name="email" required maxLength={20}/>
                <hr className="m-2 w-11/12 md:w-96"></hr>
                <div className="flex flex-row w-11/12 md:w-96">
                    <input className="bg-sky-100  w-11/12 md:w-96 p-2 rounded-xl text-green-600 border-0" placeholder="Password" type={type} onChange={handleChange} name="password" required maxLength={40}></input>
                    <span class="flex justify-around items-center mb-5 cursor-pointer" onClick={handleToggle}>
                        <h1 className="text-sm font-bold text-sky-950 absolute mr-16 mt-5">{pass}</h1>
                    </span>
                </div>
                <button className="m-16 text-green-500 bg-sky-950 rounded-full w-11/12 md:w-96 p-2 font-black" type="submit">CREATE ACCOUNT</button>
            </form>
            <div className="flex flex-col bg-sky-950 w-full md:w-1/3 h-screen items-center justify-center p-10 text-center">
                <h1 className="font-black text-green-500 text-5xl m-2">Have an account?</h1>
                <h1 className="font-thin text-green-500 text-2xl mb-10">Login with your account and continue to explore the world of blogging!</h1>
                {buttonView}
            </div>
        </div>

    )   
}

export default CreateUser