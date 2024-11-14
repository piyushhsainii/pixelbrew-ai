import { Request, Response, Router } from "express"
import prisma from "../db"

const router = Router()

router.post(`/getPromptDetails`, async (req: Request, res: Response) => {
    const promptID = req.body.id
    try {
        const promptDetails = await prisma.prompt.findUnique({
            where: {
                id: promptID
            }
        })
        res.json({
            promptDetails
        }).status(200)
    } catch (error) {
        res.json(error).status(400)
    }
})

export default router
