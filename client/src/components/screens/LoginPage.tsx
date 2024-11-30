import { useRecoilState } from 'recoil'
import { authUser } from '../../atoms/atoms'
import { useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Button } from '../ui/button'
import { LogIn } from 'lucide-react'
import { Spotlight } from '../ui/spotlight'

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
    return (
        <div className=" h-screen  bg-black">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="purple"
            />
            <div className="flex items-center justify-center bg-black h-full md:h-screen">
                <div className="w-full max-w-md space-y-8 px-4">
                    <div className="text-center">
                        <h2 className="mt-6 text-5xl font-light tracking-widest text-gray-200 font-sans">PixelBrew AI</h2>
                        <p className="mt-2 text-base text-gray-200 font-sans ">Please sign in to your account</p>
                    </div>
                    <div className="mt-8  border-opacity-30 rounded-lg flex flex-col gap-5">
                        <Button
                            className="w-full border border-gray-600 border-opacity-45 hover:bg-gray-200 transition-all duration-200"
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