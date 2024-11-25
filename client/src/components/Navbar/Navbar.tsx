import { Link, useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { authUser, userCompleteInfo } from "../../atoms/atoms"
import { supabase } from "../../lib/supabase"
import { useToast } from "../../hooks/use-toast"
import Balance from "../BalanceComponent"
import { Globe, Image, IndianRupee, Info, MenuIcon, Zap } from "lucide-react"
import { DashboardIcon, QuestionMarkIcon } from "@radix-ui/react-icons"
import AvatarComponent from "./AvatarComponent"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import HowItWorksDialog from "../how_it_works_dialog"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { useState } from "react"
import AboutPage from "../About"

const Navbar = ({ balance }: { balance: Number }) => {
    const navigate = useNavigate()
    const { toast } = useToast()
    const [user, setUser] = useRecoilState(authUser)
    const [SheetOpen, setSheetOpen] = useState(false)
    const [userInfo, setuserInfo] = useRecoilState(userCompleteInfo)
    const logoutHandler = async () => {
        const { error } = await supabase.auth.signOut()
        if (!error) {
            setUser(null)
        }
        toast({
            title: "Successfully logged out!",
            variant: "default",
            className: "bg-primmaryColor text-white font-sans tracking-wider border-gray-800 border",

        });
        navigate('/')
    }
    return (
        <>
            <div className=' flex justify-between w-full border-b border-secondaryColor border-opacity-40 bg-black fixed top-0 z-[100]'>
                <div className="flex items-center gap-4 lg:gap-7" >
                    <Link to={'/'}>
                        <div className="text-white p-2 font-normal md:text-xl lg:text-xl select-none font-sans tracking-wider">
                            <span className="inline-block transition-all duration-300 hover:shadow-[0_0_20px_rgba(125,34,190,0.6)]">
                                Pixel Brew AI
                            </span>
                        </div>

                    </Link>
                    <Link to={'/generate'} >
                        <div className="text-white font-sans tracking-wider hidden sm:flex gap-1 cursor-pointer hover:text-purple-400">
                            <Zap color="purple" width={18} />  Generate
                        </div>
                    </Link>
                    <Link to={'/explore'} >
                        <div className="text-white font-sans tracking-wider  hidden sm:flex items-center gap-1 cursor-pointer hover:text-purple-400">
                            <Globe color="purple" width={18} />  Explore
                        </div>
                    </Link>
                    <Link to={'/shop'} className="hidden md:block">
                        <div className="text-white font-sans tracking-wider flex gap-1 cursor-pointer hover:text-purple-400">
                            <IndianRupee color="purple" width={18} />  Pricing
                        </div>
                    </Link>
                    <Link to={'/how-it-works'}>
                        <div className="hidden  text-white font-sans tracking-wider md:flex gap-1 items-center cursor-pointer hover:text-purple-400">
                            <QuestionMarkIcon color="purple" width={20} />  How it Works?
                        </div>
                    </Link>
                    {userInfo !== null &&
                        <Link to={'/dashboard/exploreModels'} className="hidden lg:block" >
                            <div className="text-white font-sans  flex items-center tracking-wider  gap-1 cursor-pointer hover:text-purple-400">
                                <DashboardIcon color="purple" width={18} /> Dashboard
                            </div>
                        </Link>}
                    <Link to={'about-us'}>
                        <div className="text-white font-sans hidden lg:flex items-center tracking-wider  gap-1 cursor-pointer hover:text-purple-400">
                            <Info color="purple" width={18} /> About Us
                        </div>
                    </Link>
                </div>
                <div className=" flex items-center justify-center">
                    <div className=" flex items-center lg:hidden ">
                        <Sheet onOpenChange={() => setSheetOpen((v) => !v)} >
                            <SheetTrigger onClick={() => setSheetOpen((v) => !v)}>
                                <MenuIcon color="purple" className="mr-2" />
                            </SheetTrigger>
                            <SheetContent className="bg-black text-white border border-purple-700">
                                <div className="">
                                    <div className="flex flex-col items-center gap-10" >
                                        <a href={'/'} onClick={() => setSheetOpen((v) => !v)}>
                                            <div className="text-white p-4 font-normal md:text-xl lg:text-xl select-none font-sans tracking-wider">
                                                <span className="inline-block transition-all duration-300 hover:shadow-[0_0_20px_rgba(125,34,190,0.6)]">
                                                    Pixel Brew AI
                                                </span>
                                            </div>
                                        </a>
                                        <a href={'/generate'} onClick={() => setSheetOpen((v) => !v)}>
                                            <div className="text-white font-sans tracking-wider flex gap-1 cursor-pointer hover:text-purple-400">
                                                <Zap color="purple" width={18} />  Generate
                                            </div>
                                        </a>
                                        <a href={'/explore'} onClick={() => setSheetOpen((v) => !v)}>
                                            <div className="text-white font-sans tracking-wider flex gap-1 cursor-pointer hover:text-purple-400">
                                                <Globe color="purple" width={18} />  Explore
                                            </div>
                                        </a>
                                        {
                                            userInfo !== null &&
                                            <a href={'/myImages'} className="" onClick={() => setSheetOpen((v) => !v)}>
                                                <div className="text-white font-sans tracking-wider flex gap-1 cursor-pointer hover:text-purple-400">
                                                    <Image color="purple" width={18} /> My Images

                                                </div>
                                            </a>
                                        }
                                        <a href={'/shop'} className="" onClick={() => setSheetOpen((v) => !v)}>
                                            <div className="text-white font-sans tracking-wider flex gap-1 cursor-pointer hover:text-purple-400">
                                                <IndianRupee color="purple" width={18} />  Pricing
                                            </div>
                                        </a>
                                        <Link to={'/dashboard/exploreModels'}  >
                                            <div className="text-white font-sans  flex items-center tracking-wider  gap-1 cursor-pointer hover:text-purple-400">
                                                <DashboardIcon color="purple" width={18} /> Dashboard
                                            </div>
                                        </Link>
                                        <Link to={'/how-it-works'}  >
                                            <div className="text-white font-sans  flex items-center tracking-wider  gap-1 cursor-pointer hover:text-purple-400">
                                                <QuestionMarkIcon color="purple" width={20} />  How it Works?
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
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