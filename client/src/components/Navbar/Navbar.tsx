import { Link, useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { authUser } from "../../atoms/atoms"
import { supabase } from "../../lib/supabase"
import { useToast } from "../../hooks/use-toast"
import Balance from "../BalanceComponent"
import { Globe, Image, IndianRupee } from "lucide-react"
import { QuestionMarkIcon } from "@radix-ui/react-icons"
import AvatarComponent from "./AvatarComponent"

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
            <div className=' flex justify-between w-full border-b border-secondaryColor border-opacity-40 bg-black'>
                <div className="flex items-center gap-12" >
                    <Link to={'/'}>
                        <div className="text-white p-4 font-normal text-xl select-none font-mono">
                            <span className="inline-block transition-all duration-300 hover:shadow-[0_0_20px_rgba(125,34,190,0.6)]">
                                Pixel Brew AI
                            </span>
                        </div>

                    </Link>
                    <Link to={'/explore'} >
                        <div className="text-white font-mono flex gap-2 cursor-pointer hover:text-purple-400">
                            <Globe color="purple" width={18} />  Explore
                        </div>
                    </Link>
                    <Link to={'/myImages'} >
                        <div className="text-white font-mono flex gap-2 cursor-pointer hover:text-purple-400">
                            <Image color="purple" width={18} /> My Images

                        </div>
                    </Link>
                    <Link to={'/shop'} >
                        <div className="text-white font-mono flex gap-2 cursor-pointer hover:text-purple-400">
                            <IndianRupee color="purple" width={18} />  Pricing
                        </div>
                    </Link>
                    <a href={'/#how-it-works'} >
                        <div className="text-white font-mono flex gap-2 items-center cursor-pointer hover:text-purple-400">
                            <QuestionMarkIcon color="purple" width={20} />  How it Works?
                        </div>
                    </a>
                </div>
                <div className="flex items-center justify-center">
                    {user?.email && balance !== null &&
                        <Balance balance={balance} />}
                    {user == null ?
                        <Link to={'/login'}>
                            <div className="cursor-pointer duration-150 transition-all">
                                <img src="https://github.com/shadcn.png" alt="" className='w-6 h-6 m-5 rounded-full' />
                            </div>
                        </Link>
                        :
                        <AvatarComponent logoutHandler={logoutHandler} />}
                </div>
            </div>
        </>

    )
}

export default Navbar