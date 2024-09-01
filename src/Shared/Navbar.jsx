
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/TSM-logo.png'
import icon from '../assets/placeholder.jpg'
import useAuth from '../hooks/UseAuth';


const Navbar = () => {

    const { user, logOut } = useAuth();
   
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login')
            })
            .catch(error => console.log(error));
    };


    return (
        <div>
            <div className="navbar bg-[#191970] bg-opacity-10 ">
                <div className="flex-1">
                    <img className='w-32 h-12 rounded-lg' src={logo} alt="" />
                </div>
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user?.photoURL || icon} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-700 rounded-box w-52">
                            {user ? (
                                
                                    <li>
                                        <button onClick={handleLogOut}>Logout</button>
                                    </li>
                               
                            ) : (
                                <>
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/register">Register</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;