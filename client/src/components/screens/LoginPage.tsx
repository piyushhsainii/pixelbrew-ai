import { useRecoilState } from 'recoil'
import { authUser } from '../../atoms/atoms'
import { useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Button } from '../ui/button'
import { LogIn } from 'lucide-react'

const LoginPage = () => {

    const [user, setUser] = useRecoilState(authUser)

    async function getSession() {
        const user = await supabase.auth.getSession()
        setUser(user.data.session.user)
        return user
    }
    const logoutHandler = async () => {
        const { error } = await supabase.auth.signOut()
        if (!error) {
            setUser(null)
        }
    }

    useEffect(() => {
        getSession()
    }, [])
    console.log(user)
    return (
        <div className="grid h-screen  grid-cols-1 md:grid-cols-2">
            <div className="flex items-center justify-center bg-[radial-gradient(circle,_black_60%,_purple_99%)] h-[50vh] md:h-screen">
                <div className="text-center">
                    <h1 className="mb-4 text-5xl font-bold font-mono text-white">PixelBrew AI</h1>
                    <p className=" text-white opacity-80 font-sans text-base font-semibold">Pixel Perfect Thumbnails, Brewed by AI.</p>
                </div>
            </div>
            <div className="flex items-center justify-center bg-gray-100 h-[50vh] md:h-screen">
                <div className="w-full max-w-md space-y-8 px-4">
                    <div className="text-center">
                        <h2 className="mt-6 text-5xl font-bold text-gray-900 font-sans">Welcome back</h2>
                        <p className="mt-2 text-base text-gray-600 font-sans font-semibold">Please sign in to your account</p>
                    </div>
                    <div className="mt-8 border border-gray-600 border-opacity-30 rounded-lg ">
                        <Button
                            className="w-full  hover:bg-gray-200 transition-all duration-200"
                            variant="outline"
                            onClick={async () => {
                                await supabase.auth.signInWithOAuth({
                                    provider: 'google',

                                })
                                const user = await supabase.auth.getSession()
                                setUser(user.data.session.user)
                            }}
                        >
                            <LogIn className="mr-2 h-4 w-4" />
                            <div className=' text-base font-sans font-semibold'>Sign in with Google</div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage