import { ArrowRight } from "lucide-react";

const data = [
    {
        name: "Prompt 1",
        body: "Generate a youtube thumbnail for me for my coding tutorial youtube video, the title of the video is 'Build Chess with me' and it should be vibrant and flashy and i should be in center with highlights to make me popout of the thubmnail.",
    }, {
        name: "Prompt 2",
        body: "Intense gaze of a male hacker, late 20s, wearing a black hoodie with hood partially up. Green lines of code reflected in her determined eyes and on skin. Dark room lit by multiple screens. Overlay: 'CYBER ADDICTION EXPOSED' in glowing red and white text that appears to be burning through the image. Faint silhouette of another person in background.",
    }, {
        name: "Prompt 3",
        body: "The name 'Agus' appears at the top in white artistic lettering and decorated with white autumn motifs. A young woman with wavy brown hair, sitting amidst a background of falling autumn leaves. She is wearing a plaid shirt, blue jeans, and an orange beanie. She is holding a mug, possibly containing a hot drink, and is surrounded by pumpkins, lanterns, and an open book. The mood suggests a cozy, autumnal setting.",
    }, {
        name: "Prompt 4",
        body: "I'm an indian brown girl who loves to code and play chess. Loves playing with AI. But is not a nerd. Doesn't wear glasses. Mid length hair. generate a youtube thumbnail for me for my coding tutorial youtube video, the title of the video is 'Build Chess with me' and it should be vibrant and flashy and i should be in center with highlights to make me popout of the thubmnail.",
    }];

const SuggestionCard = ({ generate, setInput }: { generate: any, setInput: React.Dispatch<React.SetStateAction<string>> }) => {
    return (
        <div className="flex flex-wrap  w-[65vw] gap-4  m-auto ">
            {
                data && data.map((data, index) => (
                    <div
                        key={index}
                        className="border-purple-700 flex flex-col  justify-between border text-white w-[380px] p-4 rounded-xl hover:bg-purple-700 hover:bg-opacity-40 " >
                        <div className="font-sans"> {data.name} </div>
                        <div className="font-sans text-[0.800rem] my-2"> {data.body} </div>
                        <button className="flex justify-end  ">
                            <ArrowRight size={35} className="hover:bg-purple-700 rounded-full mx-2 p-1  cursor-pointer " />
                        </button>
                    </div>
                ))
            }
        </div>
    )
}

export default SuggestionCard