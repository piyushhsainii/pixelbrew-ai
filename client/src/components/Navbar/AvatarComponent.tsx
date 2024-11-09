import { Link } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Edit, IndianRupee, LogOut, ShoppingCart, User } from "lucide-react"

const AvatarComponent = ({ logoutHandler }: { logoutHandler: () => Promise<void> }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className=" border-none outline-none ">
                <div className="cursor-pointer  duration-150 transition-all ">
                    <img src="https://github.com/shadcn.png" alt=""
                        className='w-6 h-6 m-5 rounded-full hover:scale-125 hover:border hover:border-purple-700 transition-all duration-150' />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black border-none  right-0" >
                <DropdownMenu aria-label="Static Actions" >
                    <Link to={'/profile'} >
                        <DropdownMenuItem className="cursor-pointer font-semibold p-0 hover:text-white  bg-black hover:bg-gray-800 text-white px-4 py-2 border-opacity-40 font-sans border-purple-700 border" key="new">
                            <User /> Profile
                        </DropdownMenuItem>
                    </Link>
                    <Link to={'/profileSetup'} >
                        <DropdownMenuItem className="cursor-pointer font-semibold p-0 hover:text-white  bg-black hover:bg-gray-800 text-white px-4 py-2 border-opacity-40 font-sans border-purple-700 border" key="new">
                            <Edit /> Manage Account
                        </DropdownMenuItem>
                    </Link>
                    <Link to={'/shop'} >
                        <DropdownMenuItem
                            className="cursor-pointer font-semibold p-0 hover:text-white  bg-black text-white px-4 py-2 hover:bg-gray-800 border-opacity-40 font-sans border-purple-700 border" key="copy">
                            <ShoppingCart /> Shop
                        </DropdownMenuItem>
                    </Link>
                    <Link to={'/purchases'} >
                        <DropdownMenuItem
                            className="cursor-pointer font-semibold p-0 hover:text-white  bg-black text-white px-4 py-2 hover:bg-gray-800 border-opacity-40 font-sans border-purple-700 border" key="copy">
                            <IndianRupee /> My Purchases
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                        onClick={logoutHandler}
                        className="cursor-pointer font-semibold p-0 hover:text-white  bg-black text-white px-4 py-2 hover:bg-gray-800 border-opacity-40 font-sans border-purple-700 border" key="copy">
                        <LogOut /> Logout
                    </DropdownMenuItem>
                </DropdownMenu>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AvatarComponent