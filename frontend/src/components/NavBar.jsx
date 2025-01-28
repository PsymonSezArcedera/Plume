import { Link, useNavigate } from "react-router-dom";
import { pageData } from "./pageData";
import logo from "../assets/plume_logo.png";
import { useLocation } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();

    function handleLogout() {
        sessionStorage.removeItem("User");
        navigate("/");
    }

    return (
        <div className="flex-col md:flex-row items-center bg-white fixed z-10 top-0 w-full flex justify-between border-2">
            <div className="flex flex-row content-center items-center">
                <img src={logo} alt="logo" className="w-[100px] h-[50px] m-4 -mr-5 object-contain" />
                <h1 className="text-blue-950 font-bold text-3xl">Plume.</h1>
            </div>

            <div className="flex justify-end">
                <nav>
                    {pageData.map((page) => (
                        <Link to={page.path} key={page.path}>
                            <button className={`text-blue-950 p-2 rounded font-semibold m-4 ${location.pathname === page.path ? 'underline underline-green-500 underline-offset-4' : ''}`}>
                                {page.name}
                            </button>
                        </Link>
                    ))}
                </nav>
                {/* <button className="text-green-400 bg-blue-950 p-2 rounded-3xl w-24 font-semibold m-4" onClick={handleLogout}> Logout </button> */}
            </div>
        </div>
    );
}

export default NavBar;
