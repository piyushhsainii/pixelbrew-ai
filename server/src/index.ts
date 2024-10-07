import dotenv from "dotenv"
dotenv.config()
import express, { Request, Response } from "express"
import cors from 'cors'
import Replicate from "replicate";


const app = express()
app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const replicate = new Replicate({
    auth: process.env.REPLICATION_TOKEN,
})
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
        if (result.data && result.data.length > 0) {
            const output = await replicate.run(
                "cdingram/face-swap:d1d6ea8c8be89d664a07a457526f7128109dee7030fdac424788d762c71ed111",
                {
                    input: {
                        swap_image: process.env.HARKIRAT_IMG_URL,
                        input_image: result.data[0].url
                    }
                }
            );
            result.data[0].url = output;
            return res.json(result)
        }
    }
    catch (error) {
        console.error(error);
        return res.json(error).status(400)
    }
})

app.post('/test', async (req, res: any) => {
    const output = await replicate.run(
        "cdingram/face-swap:d1d6ea8c8be89d664a07a457526f7128109dee7030fdac424788d762c71ed111",
        {
            input: {
                swap_image: process.env.HARKIRAT_IMG_URL,
                input_image: "https://replicate.delivery/pbxt/LPsGWYhFW03GN2y21RDRlat7YBCVPupkwyEg3Ca0YxcFWYNE/images.jpeg"
            }
        }
    );
    console.log(output);
    return res.json({
        output
    })
})

app.listen(8000, () => {
    console.log("server started")
})
