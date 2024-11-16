import { Request, Response, Router } from "express";
import { fal } from "@fal-ai/client"
import { BACKEND_URL } from "../lib/url";
import axios from "axios";

const router = Router()

router.post('/generateImg', async (req: Request, res: Response) => {
    const prompt = req.body.image
    try {
        fal.config({
            credentials: process.env.FAL_AI
        });
        const result = await fal.subscribe("fal-ai/flux-pro/v1.1-ultra", {
            input: { prompt: prompt },
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status === "IN_PROGRESS") {
                    update.logs.map((log) => log.message).forEach(console.log);
                }
            },
        });
        res.json({
            success: true,
            result,
            prompt: result.data.prompt,
            url: result.data.images[0].url
        }).status(200)
    } catch (error) {
        res.json({ error }).status(400)
    }
})


router.post('/trainModel', async (req: Request, res: Response) => {
    try {
        fal.config({
            credentials: process.env.FAL_AI
        });
        const result = await fal.subscribe("fal-ai/flux-lora-fast-training", {
            input: {
                images_data_url: ""
            },
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status === "IN_PROGRESS") {
                }
            },
            webhookUrl: `${BACKEND_URL}/api/webhook`
        });
        console.log(result.data);
        console.log(result.requestId);
    } catch (error) {

    }
})

router.post(`api/webhhok`, async (req: Request, res: Response) => {

    const url = `https://queue.fal.run/fal-ai/flux/dev?fal_webhook=https://${BACKEND_URL}/api/webhook`;
    const falKey = process.env.FAL_AI; // Replace with your actual FAL_KEY

    axios.post(url, { prompt: 'Photo of a cute dog', },
        { headers: { Authorization: `Key ${falKey}`, 'Content-Type': 'application/json', }, })
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error.response ? error.response.data : error.message);
        });

})

export default router