import { useRecoilState } from 'recoil'
import { authUser } from '../../atoms/atoms'
import { useEffect } from 'react'
import { supabase } from '../../lib/supabase'

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

        <div className='flex justify-center items-center bg-black h-screen '>
            <button
                className='bg-white p-2 text-black font-bold font-sans rounded-lg m-5'>
                {user == null ?
                    <div
                        onClick={async () => {
                            await supabase.auth.signInWithOAuth({
                                provider: 'google',

                            })
                            const user = await supabase.auth.getSession()
                            setUser(user.data.session.user)
                        }}
                    >
                        LOGIN
                    </div> :
                    <div onClick={logoutHandler} >
                        LOGOUT
                    </div>
                }
            </button>
        </div>
    )
}

export default LoginPage