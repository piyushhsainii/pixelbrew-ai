import { Request, Response, Router } from "express";
import { fal } from "@fal-ai/client"
import { BACKEND_URL } from "../lib/url";
import axios from "axios";
import prisma from "../db";

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
    const email = req.body.email
    try {
        const updateBalance = await prisma.user.findUnique({
            where: { email: email },
        })
        if (updateBalance.balance < 80) {
            res.json({ error: "Low balance" }).status(400)
        }
        const deductMoney = await prisma.user.update({
            where: { email: email },
            data: { balance: { decrement: 80 } }
        })
        fal.config({ credentials: process.env.FAL_AI });
        const result = await fal.subscribe("fal-ai/flux-lora-fast-training", {
            input: { images_data_url: "" },
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status == "IN_QUEUE") {
                    const addRequestID = prisma.falAIModel.create({
                        data: { requestID: result.requestId, userEmail: email, status: "IN_QUEUE" }
                    })
                }
                if (update.status === "IN_PROGRESS") {
                    const updateRequest = prisma.falAIModel.update({
                        where: { requestID: result.requestId },
                        data: { status: "IN_PROGRESS" }
                    })
                }
                if (update.status === "COMPLETED") {
                    const updateRequest = prisma.falAIModel.update({
                        where: { requestID: result.requestId },
                        data: { status: "COMPLETED" }
                    })
                }
            },
            webhookUrl: `${BACKEND_URL}/api/webhook`
        });

        console.log(result.data);
        console.log(result.requestId);
    } catch (error) {

    }
})


router.post('/getStatus', async (req: Request, res: Response) => {
    const ID = req.body.requestID
    try {
        const getFalAIdetails = await prisma.falAIModel.findUnique({ where: { id: ID } })
        const getStatus = await axios.get(`https://queue.fal.run/fal-ai/fast-sdxl/requests/${getFalAIdetails.requestID}/status`)
        res.json({ status: getStatus.status }).status(200)
    } catch (error) {
        res.json(error).status(400)
    }
})

router.post(`api/webhook`, async (req: Request, res: Response) => {
    console.log(req.body)
    // const url = `https://queue.fal.run/fal-ai/flux/dev?fal_webhook=https://${BACKEND_URL}/api/webhook`;
    // const falKey = process.env.FAL_AI; // Replace with your actual FAL_KEY

    // axios.post(url, { prompt: 'Photo of a cute dog', },
    //     { headers: { Authorization: `Key ${falKey}`, 'Content-Type': 'application/json', }, })
    //     .then(response => {
    //         console.log('Response:', response.data);
    //     })
    //     .catch(error => {
    //         console.error('Error:', error.response ? error.response.data : error.message);
    //     });

})

export default router