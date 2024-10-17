import { Link } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useRecoilState } from "recoil"
import { authUser } from "../atoms/atoms"
import { supabase } from "../lib/supabase"

const Navbar = () => {

    const [user, setUser] = useRecoilState(authUser)

    const logoutHandler = async () => {
        const { error } = await supabase.auth.signOut()
        if (!error) {
            setUser(null)
        }
    }

    return (
        <div
            className=' flex justify-between w-full
            border-b border-secondaryColor border-opacity-40 bg-black'
        >
            <Link to={'/'}>
                <div className='text-white  p-4 font-normal text-xl select-none font-mono'>
                    Pixel Brew AI
                </div>
            </Link>
            {
                user == null ?
                    <Link to={'/login'}>
                        <div className="cursor-pointer">
                            <img src="https://github.com/shadcn.png" alt="" className='w-6 h-6 m-5 rounded-full' />
                        </div>
                    </Link>
                    :
                    <DropdownMenu>
                        <DropdownMenuTrigger className=" border-none outline-none">
                            <div className="cursor-pointer">
                                <img src="https://github.com/shadcn.png" alt="" className='w-6 h-6 m-5 rounded-full' />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-black border-none" >
                            <DropdownMenu aria-label="Static Actions" >
                                <Link to={'/profileSetup'} >
                                    <DropdownMenuItem className="cursor-pointer font-semibold p-0 bg-black text-white px-4 py-2 border-opacity-40 font-sans border-purple-700 border" key="new">
                                        Profile
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem
                                    onClick={logoutHandler}
                                    className="cursor-pointer font-semibold p-0 bg-black text-white px-4 py-2 border-opacity-40 font-sans border-purple-700 border" key="copy">
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenu>
                        </DropdownMenuContent>
                    </DropdownMenu>
            }

        </div>
    )
}

export default Navbar