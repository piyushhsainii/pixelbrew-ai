import React from 'react'
import BlurFade from './ui/blur-fade'
import { Marquee } from './ui/Marquee'
import { ReviewCard } from './ReviewsCards/ReviewCard'
import { AllReviews } from "../lib/interface";

const Testimonials = ({ reviews }: { reviews: AllReviews[] }) => {
    return (
        <div className='bg-[#090c14] flex flex-col items-center justify-center   m-auto pb-16'>
            {reviews &&
                <div className='w-[100%] max-w-[1600px]  overflow-hidden'>
                    <div className="text-gray-300 font-sans text-3xl font-extralight py-12  tracking-wider text-center ">
                        TESTIMONIALS
                    </div>
                    <BlurFade inView className="" >
                        <Marquee className="[--duration:10s] ">
                            {reviews?.map((review) => (
                                <ReviewCard key={review.id} body={review.review} img={review.user.avatar_url} name={review.user.name} username={""} />
                            ))}
                        </Marquee>
                    </BlurFade>
                </div>
            }
        </div>
    )
}

export default Testimonials