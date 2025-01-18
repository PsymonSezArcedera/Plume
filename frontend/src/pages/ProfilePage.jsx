import { useState, useEffect } from "react"
import * as jwt_decode from "jwt-decode"

function ProfilePage(){
    const [user, setUser] = useState({})

    useEffect(() => {
        async function loadUserData(){
            const token = sessionStorage.getItem("User")
            const decodedUser = jwt_decode.jwtDecode(token)
            setUser(decodedUser)
        }
        loadUserData()
    }, [])
    
    return(
        <div className="m-40">
            <h2 className="text-4xl font-bold text-green-950">{user.user?.firstName.concat(" ", user.user?.lastName)}</h2>
        </div>
    )
}

export default ProfilePage