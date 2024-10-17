import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import Navbar from "../Navbar"
import { Info, Lightbulb } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip"
import { supabase } from "../../lib/supabase"
import { useRecoilState } from "recoil"
import { authUser } from "../../atoms/atoms"



export default function ProfileSetup() {

    const [name, setName] = useState("")
    const [about, setAbout] = useState("")
    const [image, setImage] = useState<File | null>(null)
    const [user, setUser] = useRecoilState(authUser)



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission here
        console.log({ name, about, image })
    }
    // const getSession = async () => {
    //     const user = await supabase.auth.getSession()
    //     const getUser = await supabase.auth.getUser(user.data.session.access_token)
    //     console.log(getUser)
    // }
    // getSession()
    console.log(user)
    return (
        <>
            <div className=" flex items-center justify-center bg-primmaryColor p-3 font-sans">
                <Card className="w-full max-w-4xl max-h-[800px] bg-black bg-opacity-50 text-white overflow-hidden flex flex-col">
                    <CardHeader className="flex-shrink-0">
                        <CardTitle className="text-3xl font-bold">Profile Setup</CardTitle>
                        <CardDescription className="text-gray-300">
                            Complete your profile to get started
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow overflow-auto">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="name" className="text-white">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-[#0c0f1a] border-0 text-white rounded-xl"
                                />
                            </div>
                            <div className="space-y-1  ">
                                <Label htmlFor="about" className="text-white">About</Label>
                                <Textarea
                                    id="about"
                                    placeholder="Tell us about yourself"
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    className="bg-[#0c0f1a] border-0 text-white min-h-[100px] rounded-2xl resize-none "
                                />
                            </div>
                            <div className="flex gap-9">
                                <div className="space-y-2 w-[70%]">
                                    <div className="flex justify-between items-center w-full" >
                                        <div><Label htmlFor="training_image" className="text-white">Training Image</Label></div>
                                        <TooltipProvider>
                                            <Tooltip delayDuration={200}>
                                                <TooltipTrigger>
                                                    <div className="text-[0.77rem] flex gap-1 items-center text-gray-400">
                                                        note:
                                                        <Info width={12} color="grey" className="pt-[0.25rem]" />
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent className="h-[170px] w-[170px] bg-primmaryColor border-white border border-opacity-30">
                                                    <div className="flex justify-between items-center font-bold border-b border-gray-400 border-opacity-20 ">
                                                        <Lightbulb size={13} className="" />
                                                        <div className="text-center py-2">Tips for better result </div>
                                                    </div>
                                                    <div className="font-semibold flex flex-col justify-center gap-3 mt-2 ">
                                                        <li > Provide high res image </li>
                                                        <li > Upload clear image of your face</li>
                                                        <li > Provide meaningful prompts </li>
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Input
                                        id="training_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                                        className="bg-[#0c0f1a] border-0 text-white rounded-xl"
                                    />
                                </div>
                                <div className={'bg-primmaryColor w-[130px] h-[100px]'} >
                                    <img src="" alt="pfp" />
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-[#0c0f1a] hover:bg-opacity-80 text-white rounded-xl">
                                Save Profile
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}