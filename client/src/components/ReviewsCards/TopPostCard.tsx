import { Heart } from "lucide-react";
import { cn } from "../../lib/utils";

export const TopPostCard = ({
    img,
    name,
    username,
    body,
}: {
    img: string;
    name: string;
    username: string;
    body: string;
}) => {

    return (
        <>
            <figure
                className={cn(
                    "relative w-[26rem] cursor-pointer overflow-hidden rounded-xl  ",
                    "  hover:bg-black text-white relative max-w-[26rem] max-h-[295px] flex flex-col justify-between items-center"
                )}
            >
                <img src={body} className=" text-sm text-gray-200 max-w-[26rem] max-h-[245px] font-sans rounded-lg border-2 border-black" />
                <div className="flex flex-row items-center justify-between w-[90%] gap-2 font-sans">
                    {/* <img className="rounded-full border border-black" width="32" height="32" alt="" src={img} /> */}
                    <div className="text-sm font-medium text-white">
                        {name}
                    </div>
                    <div className="text-xs font-medium text-gray-400 font-sans flex items-center gap-1">
                        {username} <Heart size={14} className="mt-[0.2rem]" color="red" fill="red" />
                    </div>
                </div>
            </figure>
        </>
    );
};