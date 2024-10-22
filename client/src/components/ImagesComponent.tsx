import { Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { authUser, promptInfo } from '../atoms/atoms'
import axios from 'axios'
import { BACKEND_URL } from '../lib/url'
import { useToast } from '../hooks/use-toast'

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
    const [prompt, setPrompt] = useRecoilState(promptInfo)
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

    const truncatePrompt = (prompt: string, maxLength: number = 300) => {
        if (prompt.length <= maxLength) return prompt
        return prompt.slice(0, maxLength - 3) + '...'
    }

    const getPrompts = async () => {
        try {
            const { data } = await axios.post(`${BACKEND_URL}/getPrompts`, {
                email: user.email
            })
            setPrompt(data.prompt)
            setUser(data.url)
        } catch (error) {
            toast({
                title: "Could not fetch user prompts",
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",

            });
        }
    }
    console.log(prompt, user)
    useEffect(() => {
        if (prompt == null) {
            getPrompts()
        }
    }, [])

    return (
        <div className="min-h-screen bg-black text-purple-300 p-5 font-sans">
            <h1 className="text-4xl font-bold text-purple-500 mb-8 text-center select-none">Your Pixel Brew AI Gallery</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {imagePairs.map((pair, index) => (
                    <div key={index} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                        <div className="relative h-64">
                            <img
                                src={pair.imageUrl}
                                alt={`Generated image ${index + 1}`}
                                className="object-cover h-full w-full"
                            />
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-center">
                                <p className="text-white mb-2 font-semibold">Prompt:</p>
                                <div className="text-white mb-2 cursor-pointer min-w-[90px] text-right">
                                    {copiedIndex === index ? (
                                        "Text copied!"
                                    ) : (
                                        <Copy
                                            size={18}
                                            onClick={() => copyPrompt(pair.prompt, index)}
                                            className="hover:scale-125 duration-150 transition-all ml-auto"
                                        />
                                    )}
                                </div>
                            </div>
                            {expandedIndex === index ? (
                                <p className="text-white text-base">{pair.prompt}</p>
                            ) : (
                                <p className="text-white text-base">{truncatePrompt(pair.prompt)}</p>
                            )}
                            {pair.prompt.length > 300 && (
                                <button
                                    className="mt-2 text-purple-500 hover:text-purple-400 transition-colors"
                                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                >
                                    {expandedIndex === index ? 'Show Less' : 'Show More'}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}