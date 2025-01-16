import { Link, useNavigate } from "react-router-dom"
import { pageData } from "./pageData"
import logo from "../assets/plume_logo.png"
function NavBar(){
    const navigate = useNavigate()

    function handleLogout(){
        sessionStorage.removeItem("User")
        navigate("/")
    }

    return (
        <div className="rounded-xl items-center shadow-md fixed top-0 w-full flex justify-between">
            <div className="flex flex-row content-center items-center ">
                <img src={logo} alt="logo" className="w-[100px] h-[50px] m-4 -mr-5 object-contain"/>
                <h1 className="text-blue-950 font-black text-3xl">PLU</h1>
                <h1 className="text-green-500 font-black text-3xl">ME</h1>
            </div>

            <div className="flex justify-end">
                {pageData.map((page) => {
                    return(
                        <>
                            <Link to={page.path}>
                                <button className="text-blue-950 p-2 rounded font-semibold m-4">
                                    {page.name}
                                </button>
                            </Link>
                        </>
                    )
                })}
                {/* <button className = "rounded font-semibold">Logout</button> */}
                <button className="text-green-400 bg-blue-950  p-2 rounded-3xl w-24 font-semibold m-4" onClick={handleLogout}> Logout </button>
            </div>
        </div>
    )

}

export default NavBar