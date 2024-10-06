import dotenv from "dotenv"
dotenv.config()
import express, { Request, Response } from "express"
import cors from 'cors'

const app = express()
app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post('/generate', async (req: Request, res: any) => {
    const body = req.body
    try {
        const input = body.input
        const aspect_ratio = body.aspect_ratio
        const model_version = body.model_version
        const style_type = body.style_type
        const response = await fetch("https://api.ideogram.ai/generate", {
            method: "POST",
            headers: {
                "Api-Key": process.env.API_KEY!,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "image_request": {
                    "prompt": input,
                    "aspect_ratio": aspect_ratio,
                    "model": model_version,
                    "style_type": style_type,
                    "magic_prompt_option": "AUTO",

                }
            }),
        });
        const result = await response.json();
        console.log(result);
        return res.json(result)
    }
    catch (error) {
        console.error(error);
        return res.json(error).status(400)
    }
})

app.listen(8000, () => {
    console.log("server started")
})
