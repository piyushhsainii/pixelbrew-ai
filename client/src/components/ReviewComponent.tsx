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
            <section className="bg-black py-5 h-[45vh] w-full flex justify-evenly items-center">
                <div>
                    <div className="text-white bg-black flex justify-center items-center text-2xl font-sans"> YOUR FEEDBACK TRULY MATTERS TO US </div>
                    <button
                        className="text-white m-auto px-8 py-2 rounded-xl mt-4 flex justify-center font-semibold hover:scale-110 active:scale-90 bg-purple-800 items-center text-pretty font-sans transition-all duration-200">
                        ADD MY REVIEW
                    </button>
                </div>
                <div className="flex flex-col text-white items-center justify-center font-sans text-pretty">
                    <div className="">
                        <div className='font-mono p-2'> Let us know what you think about Pixel Brew ai? </div>
                        <Textarea
                            required={true}
                            placeholder='Let us know what you think about Pixel Brew ai? '
                            onChange={(e) => setReview(e.target.value)}
                            className="bg-black border max-w-[500px] hover:scale-100 text-white border-purple-800 resize-none rounded-2xl"
                        />
                        <div className='font-mono p-2'> How can we make it better? </div>
                        <Textarea
                            onChange={(e) => setReview2(e.target.value)}
                            className="bg-black border max-w-[500px] hover:scale-100 text-white border-purple-800 resize-none rounded-2xl"
                            placeholder='Your honest feedback truly matters to us!'
                        />

                    </div>
                </div>

            </section>
        </form >
    )
}

export default ReviewComponent