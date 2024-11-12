import { Request, Response, Router } from "express";
import prisma from "../db";
import Replicate from "replicate";
import dotenv from "dotenv"
dotenv.config()


const router = Router()
const replicate = new Replicate({
    auth: process.env.REPLICATION_TOKEN,
})

router.post('/generate', async (req: Request, res: Response) => {
    const body = req.body
    try {
        const input = body.input
        const aspect_ratio = body.aspect_ratio
        const model_version = body.model_version
        const style_type = body.style_type
        const image_url = body.face_swap
        const magic_Prompt = body.magic_prompt                      //enum - ON | OFF | AUTO
        const email = body.email
        const userDetail = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (userDetail == null) {
            res.json({
                error: "Failed to fetch user"
            }).status(400)
        }
        if (userDetail.balance == 0) {
            res.json({
                error: "Please buy credits to generate Images"
            }).status(400)
        }

        const response = await fetch("https://api.ideogram.ai/generate", {
            method: "POST",
            headers: {
                "Api-Key": process.env.API_KEY!,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "image_request": {
                    "prompt": `${input}`,
                    "aspect_ratio": aspect_ratio,
                    "model": model_version,
                    "style_type": style_type,
                    "magic_prompt_option": magic_Prompt,
                }
            }),
        });
        const result = await response.json();
        if (!result.data[0].url) {
            res.json({ error: "Something went wrong generating image" }).status(400)
        }
        if (result.data && result.data.length > 0) {
            try {
                const output = await replicate.run(
                    "cdingram/face-swap:d1d6ea8c8be89d664a07a457526f7128109dee7030fdac424788d762c71ed111",
                    {
                        input: {
                            swap_image: image_url,
                            input_image: result.data[0].url
                        }
                    }
                );
                result.data[0].url = output;
                console.log(output, "replicate response")
                const updateBalance = await prisma.user.update({
                    where: { email: email },
                    data: { balance: userDetail.balance - 1 }
                })
                res.json({
                    result,
                    balance: updateBalance.balance
                })
            } catch (error) {
                console.log(error)
            }


        }
    }
    catch (error) {
        console.error(error);
        res.json(error).status(400)
    }
})

export default router

