import { Link, useNavigate } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useRecoilState } from "recoil"
import { authUser } from "../atoms/atoms"
import { supabase } from "../lib/supabase"
import { useToast } from "../hooks/use-toast"
import MyImages from "./MyImages"
import Balance from "./BalanceComponent"

const Navbar = ({ balance }: { balance: Number }) => {
    const navigate = useNavigate()
    const { toast } = useToast()
    const [user, setUser] = useRecoilState(authUser)

    const logoutHandler = async () => {
        const { error } = await supabase.auth.signOut()
        if (!error) {
            setUser(null)
        }
        toast({
            title: "Successfully logged out!",
            variant: "default",
            className: "bg-primmaryColor text-white font-sans border-gray-800 border",

        });
        navigate('/')
    }


    return (
        <>
            <div
                className=' flex justify-between w-full
            border-b border-secondaryColor border-opacity-40 bg-black'
            >
                <Link to={'/'}>
                    <div className='text-white  p-4 font-normal text-xl select-none font-mono'>
                        Pixel Brew AI
                    </div>
                </Link>
                <div className="flex items-center">
                    {
                        user?.email &&
                        <Balance balance={balance} />
                    }
                    <MyImages />
                    {
                        user == null ?
                            <Link to={'/login'}>
                                <div className="cursor-pointer duration-150 transition-all">
                                    <img src="https://github.com/shadcn.png" alt="" className='w-6 h-6 m-5 rounded-full' />
                                </div>
                            </Link>
                            :
                            <DropdownMenu>
                                <DropdownMenuTrigger className=" border-none outline-none mr-5">
                                    <div className="cursor-pointer  duration-150 transition-all ">
                                        <img src="https://github.com/shadcn.png" alt="" className='w-6 h-6 m-5 rounded-full border hover:bg-purple-700' />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-black border-none" >
                                    <DropdownMenu aria-label="Static Actions" >
                                        <Link to={'/profile'} >
                                            <DropdownMenuItem className="cursor-pointer font-semibold p-0 bg-black hover:bg-gray-800 text-white px-4 py-2 border-opacity-40 font-sans border-purple-700 border" key="new">
                                                My Account
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link to={'/profileSetup'} >
                                            <DropdownMenuItem className="cursor-pointer font-semibold p-0 bg-black hover:bg-gray-800 text-white px-4 py-2 border-opacity-40 font-sans border-purple-700 border" key="new">
                                                Manage Profile
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link to={'/shop'} >
                                            <DropdownMenuItem
                                                className="cursor-pointer font-semibold p-0 bg-black text-white px-4 py-2 hover:bg-gray-800 border-opacity-40 font-sans border-purple-700 border" key="copy">
                                                Shop
                                            </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuItem
                                            onClick={logoutHandler}
                                            className="cursor-pointer font-semibold p-0 bg-black text-white px-4 py-2 hover:bg-gray-800 border-opacity-40 font-sans border-purple-700 border" key="copy">
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenu>
                                </DropdownMenuContent>
                            </DropdownMenu>
                    }
                </div>

            </div>
        </>

    )
}

export default Navbar