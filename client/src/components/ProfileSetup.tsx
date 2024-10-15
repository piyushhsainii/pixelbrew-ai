import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

export default function ProfileSetup() {
    const [name, setName] = useState("")
    const [about, setAbout] = useState("")
    const [image, setImage] = useState<File | null>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission here
        console.log({ name, about, image })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0c0f1a]">
            <Card className="w-full max-w-md bg-[#152243] text-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Profile Setup</CardTitle>
                    <CardDescription className="text-gray-300">
                        Complete your profile to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-white">Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-[#0c0f1a] border-[#152243] text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="about" className="text-white">About</Label>
                            <Textarea
                                id="about"
                                placeholder="Tell us about yourself"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                className="bg-[#0c0f1a] border-[#152243] text-white min-h-[100px]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="training_image" className="text-white">Training Image</Label>
                            <Input
                                id="training_image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files?.[0] || null)}
                                className="bg-[#0c0f1a] border-[#152243] text-white"
                            />
                        </div>
                        <Button type="submit" className="w-full bg-[#0c0f1a] hover:bg-[#152243] text-white">
                            Save Profile
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}