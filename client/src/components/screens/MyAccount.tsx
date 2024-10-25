import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { authUser } from '../../atoms/atoms'
import axios from 'axios'
import { BACKEND_URL } from '../../lib/url'
import { useToast } from '../../hooks/use-toast'
import { Link } from 'react-router-dom'

interface userDetails {
    about: string,
    avatar_url: string,
    createdAt: string,
    email: string,
    id: string,
    name: string,
    provider: string,
    trainingImg: string,
    updatedAt: string
}

const MyAccount = () => {

    const [user, setUser] = useRecoilState(authUser)
    const [UserInfo, setUserInfo] = useState<userDetails | null>(null)
    const { toast } = useToast()

    const fetchUserDetails = async () => {
        try {
            const { data } = await axios.post(`${BACKEND_URL}/getUserDetails`, {
                email: user.user_metadata.email
            })
            if (data) {
                setUserInfo(data.user)
            }
        } catch (error) {
            toast({
                title: "Setup your profile to use Pixelbrew AI",
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",
            });
        }
    }

    useEffect(() => {
        fetchUserDetails()
    }, [])

    return (
        <div className='bg-black h-screen flex justify-center items-center'>
            <div className='bg-gray-400 max-h-[70vh] w-[70vw] rounded-2xl relative '>
                <div className='w-36 h-36 rounded-[100%]   absolute bottom-28 left-6 '>
                    <img
                        src={UserInfo?.trainingImg}
                        className='w-36 h-36 rounded-[100%] object-cover
                        border border-black
                        '
                        alt="" />
                </div>
                <div className='px-3 text-base flex justify-end bg-green font-sans '>
                    <Link to={'/profileSetup'}>
                        <button className='mt-20 bg-green-600 px-3 py-1 text-white font-semibold rounded-lg my-2
                    hover:scale-105 transition-all duration-200
                    '>
                            UPDATE PROFILE
                        </button>
                    </Link>
                </div>
                <div className='bg-black w-full text-white border border-gray-400 px-6 text-lg font-mono ' >
                    {UserInfo?.name}
                </div>
                <div className='px-3 m-3 text-lg'>
                    {UserInfo?.about}
                </div>
            </div>
        </div>
    )
}

export default MyAccount