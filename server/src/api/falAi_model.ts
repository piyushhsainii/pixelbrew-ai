import { Request, Response, Router } from "express";
import { fal } from "@fal-ai/client"
import { BACKEND_URL } from "../lib/url";
import prisma from "../db";

const router = Router()

// standard model
router.post('/generateImg', async (req: Request, res: Response) => {
    const prompt = req.body.image
    const email = req.body.email
    try {
        fal.config({
            credentials: process.env.FAL_AI
        });
        const { balance } = await prisma.user.findUnique({
            where: { email: email },
            select: { balance: true }
        })
        if (balance < 2) {
            res.json({ error: "Balance not enough" }).status(400)
        }
        if (balance < 2) return;
        const result = await fal.subscribe("fal-ai/flux-pro/v1.1-ultra", {
            input: { prompt: prompt },
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status === "IN_PROGRESS") {
                    update.logs.map((log) => log.message).forEach(console.log);
                }
            },
        });
        if (result) {
            await prisma.user.update({
                where: { email: email },
                data: { balance: { decrement: 2 } }
            })
        }
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

// API FOR FAL AI TRAINED MODEL
router.post('/trainedModel', async (req: Request, res: Response) => {
    const prompt = req.body.prompt
    const path1 = req.body.path1
    const email = req.body.email
    fal.config({ credentials: process.env.FAL_AI });
    try {
        const { balance } = await prisma.user.findUnique({
            where: { email: email },
            select: { balance: true }
        })
        if (balance < 3) {
            res.json({ error: "Balance not enough" }).status(400)
        }
        if (balance < 3) return;
        const result = await fal.subscribe('fal-ai/flux-lora', {
            input: {
                loras: [
                    { path: path1, scale: 1 },
                ],
                prompt: prompt
            }
        })
        if (result) {
            await prisma.user.update({
                where: { email: email },
                data: { balance: { decrement: 3 } }
            })
        }
        res.json(result).status(200)
    } catch (error) {
        res.json(error).status(400)
    }
})

// API FOR COMBINING MODEL
router.post('/customModel', async (req: Request, res: Response) => {
    const prompt = req.body.prompt
    const path1 = req.body.path1
    const path2 = req.body.path2
    const email = req.body.email
    try {
        const { balance } = await prisma.user.findUnique({
            where: { email: email },
            select: { balance: true }
        })
        if (balance < 3) {
            res.json({ error: "Balance not enough" }).status(400)
        }
        if (balance < 3) return;
        const result = await fal.subscribe('fal-ai/flux-lora', {
            input: {
                loras: [
                    { path: path1, scale: 1 },
                    { path: path2, scale: 1 }
                ],
                prompt: prompt
            }
        })
        if (result) {
            await prisma.user.update({
                where: { email: email },
                data: { balance: { decrement: 3 } }
            })
        }
        res.json(result).status(200)
    } catch (error) {
        res.json(error).status(400)
    }
})

// API FOR MODEL TRAINING
router.post('/trainModel', async (req: Request, res: Response) => {
    const email = req.body.email
    const imgUrl = req.body.imgUrl
    const isStyle = req.body.style
    const modelname = req.body.modelName
    try {
        if (imgUrl == "" || imgUrl == null) {
            res.json({ error: "error" }).status(400)
        }
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
        let updatedStatus = 0
        const updateProgress = async (update) => {
            const updateprogress = await prisma.falAIModel.create({
                data: {
                    modelName: modelname,
                    status: update.status,
                    requestID: update.request_id,
                    userEmail: email
                }
            })
        }
        const completeProgress = async (update) => {
            const updateprogress = await prisma.falAIModel.update({
                where: {
                    requestID: update.request_id
                },
                data: {
                    status: update.status,
                    requestID: update.request_id,
                    userEmail: email
                }
            })
        }
        const result = await fal.subscribe("fal-ai/flux-lora-fast-training", {
            input: {
                images_data_url: imgUrl,
                steps: 1000,
                is_style: isStyle
            },
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status == "IN_QUEUE") {
                    console.log("IN QUEUE")
                }
                if (update.status === "IN_PROGRESS") {
                    if (updatedStatus == 0) {
                        updatedStatus = 1
                        updateProgress(update)
                    }
                }
                if (update.status === "COMPLETED") {
                    if (updatedStatus == 1) {
                        updatedStatus = 2
                        completeProgress(update)
                    }
                }
            },
            webhookUrl: `${BACKEND_URL}/falAI/webhook`
        });

        console.log(result.data);
        console.log(result.requestId);
        const addEntry = await prisma.falAIModel.upsert({
            where: {
                requestID: result.requestId
            },
            create: {
                requestID: result.requestId,
                lora: result.data.diffusers_lora_file.url,
                isDataSet: isStyle,
                status: "completed",
                userEmail: email,
            },
            update: {
                requestID: result.requestId,
                lora: result.data.diffusers_lora_file.url,
                isDataSet: isStyle,
                status: "completed",
                userEmail: email,
            }
        })
        res.json(result).status(200)
    } catch (error) {
        res.json(error).status(400)
    }
})


router.post('/getStatus', async (req: Request, res: Response) => {
    const ID = req.body.requestID
    try {
        // const getFalAIdetails = await prisma.falAIModel.findUnique({ where: { id: ID } })
        const result = await fal.queue.result("fal-ai/flux-lora-general-training", {
            requestId: "834d5ba5-8f1b-4e3f-ad05-5dfc530976e0"
        });
        res.json({ result: result }).status(200)
    } catch (error) {
        res.json(error).status(400)
    }
})

router.post(`/falAI/webhook`, async (req: Request, res: Response) => {
    console.log(req.body, "req.body")
    console.log(req.body.event, "req.event")
    console.log(req.body.payload, "req.payload")
})

export default router