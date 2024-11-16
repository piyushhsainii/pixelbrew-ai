import { Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { authUser, promptInfo } from '../atoms/atoms'
import axios from 'axios'
import { BACKEND_URL } from '../lib/url'
import { useToast } from '../hooks/use-toast'
import { Switch } from './ui/switch'
import Loader from './Loader'

type ImagePromptPair = {
    imageUrl: string
    prompt: string
}

const demoImagePairs: ImagePromptPair[] = [
    {
        imageUrl: "https://images.unsplash.com/photo-1679678691006-0ad24fecb769?w=500&h=500&fit=crop",
        prompt: "A futuristic cityscape with flying cars and neon lights, cyberpunk style, digital art. The city should have towering skyscrapers with holographic advertisements, and the sky should be filled with various flying vehicles emitting colorful light trails."
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1679678691006-0ad24fecb769?w=500&h=500&fit=crop",
        prompt: "A serene underwater scene with bioluminescent sea creatures, photorealistic style. The image should depict a deep ocean environment with various glowing fish, jellyfish, and coral formations. The water should have a slight blue tint, and light beams should be visible penetrating from the surface."
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1679678691006-0ad24fecb769?w=500&h=500&fit=crop",
        prompt: "A whimsical treehouse village in an enchanted forest, fantasy illustration style. The treehouses should be interconnected with rope bridges and have unique, organic shapes. Include magical elements like glowing lanterns, friendly forest creatures, and a soft, misty atmosphere."
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1679678691006-0ad24fecb769?w=500&h=500&fit=crop",
        prompt: "A steampunk-inspired laboratory with intricate brass machinery and Tesla coils, digital painting style. The scene should include a mad scientist character working on a mysterious invention. Include details like gears, pipes, and steam, with a warm color palette dominated by brass and copper tones."
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1679678691006-0ad24fecb769?w=500&h=500&fit=crop",
        prompt: "An alien landscape with bizarre flora and twin suns, science fiction concept art. The landscape should feature unusual rock formations, strange plant life with vivid colors, and a distant view of an alien city. The sky should depict two suns of different sizes and colors, casting multiple shadows."
    }
]

export default function Component({ imagePairs = demoImagePairs }: { imagePairs?: ImagePromptPair[] }) {

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
    const [copiedIndex2, setCopiedIndex2] = useState<number | null>(null)
    const [isLoading, setisLoading] = useState(false)
    const [isContentLoaded, setisContentLoaded] = useState(false)
    const [prompt, setPrompt] = useRecoilState(promptInfo)
    const [userName, setuserName] = useState(null)
    const [avatar, setAvatarUrl] = useState(null)
    const [createdAt, setcreatedAt] = useState<string | null>(null)
    const [refresh, setRefresh] = useState<any>()
    const [ReverseMap, setReverseMap] = useState([])
    const [user, setUser] = useRecoilState(authUser)
    const { toast } = useToast()


    const copyPrompt = async (prompt: string, index: number) => {
        try {
            await navigator.clipboard.writeText(prompt)
            setCopiedIndex(index)
            setTimeout(() => {
                setCopiedIndex(null)
            }, 1500)
        } catch (err) {
            console.error('Failed to copy text:', err)
        }
    }
    let promptArray = []

    const truncatePrompt = (prompt: string, maxLength: number = 300) => {
        if (prompt.length <= maxLength) return prompt
        return prompt.slice(0, maxLength - 3) + '...'
    }
    const getPrompts = async () => {
        setisContentLoaded(true)
        try {
            const { data } = await axios.post(`${BACKEND_URL}/getPrompts`, {
                email: user.email
            })
            setPrompt(data.user.Prompt)
            setuserName(data.user.name)
            setAvatarUrl(data.user.avatar_url)
            reverseMap(data.user.Prompt)
            setcreatedAt(data.user.createdAt)
            setisContentLoaded(false)
        } catch (error) {
            setisContentLoaded(false)
            toast({
                title: "Could not fetch user prompts",
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",

            });
        }
    }
    const reverseMap = (data) => {
        if (data) {
            for (let i = 0; i < data.length; i++) {
                const reverseLen = data.length - 1 - i
                promptArray.push(data[reverseLen])
            }
            setReverseMap(promptArray)
        }
    }
    const switchVisibility = async (index) => {
        const id = prompt[index].id
        setisLoading(true)
        setCopiedIndex2(index)
        try {
            const updateVisibility = await axios.post(`${BACKEND_URL}/switchVisibilityOfPrompts`, {
                id: id,
                switch: prompt[index].isPublic == true ? false : true
            })
            setCopiedIndex2(null)
            toast({
                title: `Your Image is now ${updateVisibility.data.isPublic == true ? "Public" : "Private"}`,
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",
            });
            setisLoading(false)
            // window.location.reload()
            setRefresh(updateVisibility)
        } catch (error) {
            setisLoading(false)

        }
    }
    useEffect(() => {
        getPrompts()
    }, [copiedIndex2])
    const formattedDate = new Date(createdAt).toLocaleDateString()
    return (
        <div className=" bg-black text-purple-300 p-5 font-sans">
            <h1 className="text-4xl font-bold text-purple-500 mb-8 text-center select-none">
                Your Pixel Brew AI Gallery
            </h1>
            {
                isContentLoaded ?
                    <Loader /> :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {prompt && prompt.map((pair, index) => (
                            <div key={index} className="flex flex-col bg-gray-950 rounded-lg overflow-hidden   shadow-purple-700  shadow-[3px_2px_1px_[1]px_rgba(2,4,4,0.2)]">
                                {/* Image Section */}
                                <div className="h-64 w-full">
                                    <img
                                        src={pair.url}
                                        alt={`Generated image ${index + 1}`}
                                        className="object-cover w-full h-full"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="flex flex-col flex-grow p-4">
                                    {/* User Info */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <img
                                            src={user.user_metadata.avatar_url}
                                            alt=""
                                            className="rounded-full w-7 h-7"
                                        />
                                        <p className="text-white font-semibold">
                                            {userName}
                                        </p>
                                    </div>

                                    {/* Prompt Text */}
                                    <div className="flex-grow">
                                        <p className="text-gray-300 font-sans text-sm">
                                            {expandedIndex === index ? pair.prompt : truncatePrompt(pair.prompt)}
                                        </p>
                                        {pair.prompt.length > 300 && (
                                            <button
                                                className="mt-2 text-purple-500 hover:text-purple-400 transition-colors"
                                                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                            >
                                                {expandedIndex === index ? 'Show Less' : 'Show More'}
                                            </button>
                                        )}
                                    </div>
                                    {
                                        <div className='text-white text-sm flex items-center gap-2 my-3'>
                                            <Switch
                                                checked={pair.isPublic}
                                                onCheckedChange={() => switchVisibility(index)}
                                            />

                                            <div>
                                                {
                                                    isLoading == true ?
                                                        index == copiedIndex2 ?
                                                            "loader" :
                                                            pair.isPublic == false ?
                                                                "Try adding it to Explore Page!" :
                                                                "Switch back to Private ?"
                                                        :
                                                        pair.isPublic == false ?
                                                            "Try adding it to Explore Page!" :
                                                            "Switch back to Private ?"
                                                }
                                            </div>

                                        </div>
                                    }
                                    {/* Footer Section */}
                                    <div className="flex justify-between items-center mt-4 text-sm text-white">
                                        <span>{formattedDate}</span>
                                        <button
                                            className="flex items-center gap-2"
                                            onClick={() => copyPrompt(pair.prompt, index)}
                                        >
                                            {copiedIndex === index ? (
                                                <span>Text copied!</span>
                                            ) : (
                                                <Copy
                                                    size={18}
                                                    className="hover:scale-125 duration-150 transition-all"
                                                />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
            }

        </div>
    )

}