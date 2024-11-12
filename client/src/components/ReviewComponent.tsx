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
        <form onSubmit={addReview}>
            <section className=" py-5 h-[45vh]  flex flex-col md:flex-row w-full px-10 bg-black justify-evenly items-center">

                <div className="flex flex-col text-white items-center justify-center font-sans text-pretty">
                    <div className="">
                        <div className=' font-sans p-2'> Let us know what you think about Pixel Brew ai? </div>
                        <Textarea
                            required={true}
                            placeholder='Let us know what you think about Pixel Brew ai? '
                            onChange={(e) => setReview(e.target.value)}
                            className="bg-black border max-w-[500px] hover:scale-100 text-white border-purple-800 resize-none rounded-2xl"
                        />
                        <div className=' font-sans p-2'> How can we make it better? </div>
                        <Textarea
                            onChange={(e) => setReview2(e.target.value)}
                            className="bg-black border max-w-[500px] hover:scale-100 text-white border-purple-800 resize-none rounded-2xl"
                            placeholder='Your honest feedback truly matters to us!'
                        />

                    </div>
                </div>
                <div className=' flex justify-center flex-col items-center my-4'>
                    <div className="text-white bg-black flex justify-center items-center  text-center  text-pretty text-2xl font-sans"> YOUR FEEDBACK TRULY MATTERS TO US </div>
                    <button
                        type='submit'
                        className="px-4 py-2  bg-purple-700 flex justify-center m-auto items-center my-5 hover:bg-purple-800 font-semibold font-sans transition duration-200 rounded-lg text-white shadow-white  shadow-[3px_4px_4px_[1]px_rgba(2,4,4,0.4)] hover:scale-110">
                        ADD MY REVIEW
                    </button>
                </div>

            </section>
        </form >
    )
}

export default ReviewComponent