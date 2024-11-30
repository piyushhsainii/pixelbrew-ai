import React, { useState } from 'react'
import { Textarea } from './ui/textarea'
import axios from 'axios'
import { BACKEND_URL } from '../lib/url'
import { useToast } from '../hooks/use-toast'

const ReviewComponent = ({ user }: { user: any }) => {
    const [Review, setReview] = useState<string | null>(null)
    const [Review2, setReview2] = useState<string | null>(null)
    const { toast } = useToast()

    const addReview = async (e) => {
        e.preventDefault()

        if (user == null) {
            return toast({
                title: "You must be Logged In to Add Review",
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",
            });
        }
        try {
            const { data } = await axios.post(`${BACKEND_URL}/addReview`, {
                review: Review,
                review2: Review2 ?? "",
                email: user.email,
            })
            setReview(null)
            setReview2(null)
            toast({
                title: "Thank you for your feedback!",
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",
            });
        } catch (error) {
            toast({
                title: "Error adding feedback",
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",
            });
        }
    }


    return (
        <form onSubmit={addReview} className=''>
            <div className="text-gray-300 bg-black flex justify-center pt-24  font-extralight items-center  text-center  tracking-wider text-pretty text-lg md:text-2xl font-sans">
                YOUR FEEDBACK TRULY MATTERS TO US
            </div>

            <section className="relative h-[60vh]  md:h-[45vh]  flex flex-col md:flex-row w-full px-10 bg-black justify-evenly items-center pb-10">
                <div className=" text-gray-300 items-center flex flex-col m-auto md:flex-row justify-center gap-8 tracking-wide font-sans text-pretty w-full">
                    <div>
                        <div className=' font-sans p-3 pl-0 py-5 '>Let us know what you think about Pixel Brew AI? </div>
                        <Textarea
                            required={true}
                            placeholder='Let us know what you think about PixelBrew AI '
                            onChange={(e) => setReview(e.target.value)}
                            cols={10}
                            rows={5}
                            className="bg-black border px-5 pl-4  pt-3 w-[300px] md:w-[500px] hover:scale-100 text-gray-300 border-gray-900 focus:border-purple-700 resize-none rounded-2xl"
                        />
                    </div>
                    <div>
                        <div className=' font-sans p-3 py-5 pl-0 '>How can we make it better? </div>
                        <Textarea
                            onChange={(e) => setReview2(e.target.value)}
                            cols={10}
                            rows={5}
                            className="bg-black border px-5 pl-4 pt-3  w-[300px] md:w-[500px] hover:scale-100 text-gray-300 border-gray-900 focus:border-purple-700 resize-none rounded-2xl"
                            placeholder='Your honest feedback truly matters to us!'
                        />
                    </div>

                </div>
            </section>
            <div className='bg-black '>
                <div className='bg-black flex justify-end m-auto relative right-40 pb-5'>
                    <button
                        type='submit'
                        className={`px-4 py-2 ${Review == null || Review == "" ? "bg-gray-900" : "bg-purple-700"}  flex justify-center  items-center  hover:bg-purple-800 font-light font-sans transition duration-200 rounded-lg text-white `}>
                        SUBMIT
                    </button>
                </div>
            </div>
        </form >
    )
}

export default ReviewComponent