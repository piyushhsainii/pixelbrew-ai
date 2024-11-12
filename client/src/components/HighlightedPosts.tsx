import { useEffect } from "react";
import { cn } from "../lib/utils";
import { Marquee } from "./ui/Marquee";
import axios from "axios";
import { BACKEND_URL } from "../lib/url";
import { AllReviews, TopPosts } from "../lib/interface";
import { ReviewCard } from "./ReviewsCards/ReviewCard";
import { TopPostCard } from "./ReviewsCards/TopPostCard";
import BlurFade from "./ui/blur-fade";

const reviews2 = [
    {
        name: "Jack",
        username: "@jack",
        body: "I've never seen anything like this before. It's amazing. I love it.",
        img: "https://avatar.vercel.sh/jack",
    },
    {
        name: "Jill",
        username: "@jill",
        body: "I don't know what to say. I'm speechless. This is amazing.",
        img: "https://avatar.vercel.sh/jill",
    },
    {
        name: "John",
        username: "@john",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/john",
    },
    {
        name: "Jane",
        username: "@jane",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/jane",
    },
    {
        name: "Jenny",
        username: "@jenny",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/jenny",
    },
    {
        name: "James",
        username: "@james",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/james",
    },
];

export function HighlightedPosts({ topPosts }: { topPosts: TopPosts[] }) {
    return (
        <div className="relative flex  w-full flex-col items-center justify-center overflow-hidden  bg-black md:shadow-xl">
            {
                topPosts &&
                <>
                    <div className="text-white font-sans text-3xl font-semibold my-4 tracking-tight">
                        TOP POSTS
                    </div>
                    <BlurFade inView className="mt-5">
                        <Marquee reverse pauseOnHover className="[--duration:22s]">
                            {topPosts?.map((review) => (
                                <TopPostCard key={review.id} body={review.url} img={review.user.avatar_url} name={review.user.name} username={review.Likes.toString()} />
                            ))}
                        </Marquee>
                    </BlurFade>
                </>
            }
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black"></div>
        </div>

    );
}
