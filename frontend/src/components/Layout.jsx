import NavBar from "./NavBar"
import { Outlet,useNavigate } from "react-router-dom"
import { useEffect } from "react"


function Layout(){
    const navigate = useNavigate()

    return (
        <div>
            <NavBar/>
            <Outlet/>
        </div>
    )
}

export default Layout