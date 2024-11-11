import React from 'react'
import ShadowBtn from '../ShadowBtn'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='bg-black min-h-[60vh] 2xl:h-screen text-white flex flex-col md:flex-row justify-center items-center gap-10' >
            <div>
                <iframe
                    src="https://lottie.host/embed/85d57be3-87e8-4851-bcec-e8dd3f8c41d4/dTtz8OdYhe.lottie"
                    className='h-52 '
                >
                </iframe>
            </div>
            <div className='text-lg font-sans flex flex-col items-center my-2 gap-10 md:gap-3'>
                <div className=' text-3xl font-sans text-pretty text-center'>
                    OOPS, LOOKS LIKE YOU'RE LOST!
                </div>
                <Link to={'/'}>
                    <ShadowBtn string='Go back' classname='py-1' />
                </Link>
            </div>
        </div>
    )
}

export default NotFound