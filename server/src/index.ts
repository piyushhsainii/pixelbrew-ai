import dotenv from "dotenv"
dotenv.config()
import express, { Request, Response } from "express"
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary'
import auth from "./auth"
import prisma from "./db";
import paymentApi from "./api/payment"
import modelApi from "./api/model"

const multer = require('multer')
const app = express()
app.use(cors({
    origin: '*'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: 'uploads/' })

app.use('/auth', auth)             //handles the google auth
app.use('/', paymentApi)
app.use('/', modelApi)

app.post('/uploadToCloud', upload.single('file'), async (req: Request, res: any) => {
    try {
        const result = await cloudinary.uploader
            .upload("my_image.jpg")
        return res.json({
            result
        }).status(200)
    } catch (error) {
        return res.json({ error }).status(400)
    }
})

app.post('/setupProfile', async (req: Request, res: any) => {
    const name = req.body.name
    const email = req.body.email
    const about = req.body.about
    const trainingImg = req.body.trainingImg
    const avatar_url = req.body.avatar_url
    const provider = req.body.provider

    try {
        const response = await prisma.user.create({
            data: {
                name,
                email,
                about,
                trainingImg,
                avatar_url,
                provider,
            }
        })
        return res.json({
            success: true,
            response
        }).status(200)
    } catch (error) {
        return res.json({ error }).status(400)
    }
})

app.post('/getUserDetails', async (req: Request, res: any) => {
    const email = req.body.email
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email
            },
            include: {
                Payments: true,
                Prompt: true,
                Reviews: true,
                Likes: {
                    select: {
                        isLiked: true,
                        postID: true,
                        userEmail: true
                    }
                }
            }
        })
        return res.json({
            user
        }).status(200)
    } catch (error) {
        return res.json(error).status(400)
    }
})

app.post('/getAllImages', async (req: Request, res: any) => {
    const email = req.body.email
    try {
        const AllImages = await prisma.prompt.findMany({
            where: {
                isPublic: true
            },
            include: {
                user: true,
                likes: true
            },
            orderBy: {
                Likes: "desc"
            },

        })
        const userLikes = await prisma.likes.findMany({
            where: {
                userEmail: email
            }
        })
        return res.json({
            AllImages,
            userLikes
        }).status(200)
    } catch (error) {
        return res.json(error).status(400)
    }
})

app.post('/getPrompts', async (req: Request, res: any) => {
    const email = req.body.email
    try {
        const getPrompt = await prisma.prompt.findFirst({
            where: { user: { email: email } },
            include: {
                user: {
                    select: {
                        trainingImg: true,
                        Prompt: true,
                        name: true,
                        avatar_url: true,
                        createdAt: true,
                    }
                }
            },
            orderBy: [{ prompt: "asc" }]
        })
        return res.json(getPrompt).status(200)
    } catch (error) {
        return res.json(error).status(400)
    }
})

app.post('/savePrompts', async (req: Request, res: any) => {
    const prompt = req.body.prompt
    const ImageUrl = req.body.image
    const userEmail = req.body.email
    try {
        const saveDataToPromptTable = await prisma.prompt.create({
            data: {
                prompt: prompt,
                url: ImageUrl,
                user: {
                    connect: { email: userEmail }
                }
            },
            include: { user: true },
        })
        return res.json({
            saveDataToPromptTable
        }).status(200)
    } catch (error) {
        return res.json(error).status(400)
    }
})

app.post('/updateProfile', async (req: Request, res: any) => {
    const email = req.body.email
    const username = req.body.username
    const about = req.body.about
    const trainingImg = req.body.trainingImg
    try {
        const updateProfie = await prisma.user.update({
            data: {
                name: username,
                about: about,
                trainingImg: trainingImg
            },
            where: {
                email: email
            }
        })
        return res.json({
            updateProfie
        }).status(200)
    } catch (error) {
        return res.json({
            error
        }).status(400)
    }
})

app.put('/updateLikes', async (req: Request, res: any) => {
    const likes = req.body.likes
    const liked = req.body.isLiked
    const postID = req.body.postID
    const userEmail = req.body.userEmail
    try {
        // delete the like
        if (liked == true) {
            await prisma.likes.updateMany({
                where: { postID: postID },
                data: { isLiked: false }
            })
            console.log("update to false")
        } else {
            await prisma.likes.create({
                data: {
                    isLiked: true,
                    postID: postID,
                    userEmail: userEmail
                }
            })
            console.log("create the like")
        }
        // updating likes of the post
        await prisma.prompt.update({ where: { id: postID }, data: { Likes: likes } })
        return res.json({ success: true }).status(200)
    } catch (error) {
        return res.json({ success: false, error }).status(400)
    }
})
app.put('/deleteLikes', async (req: Request, res: any) => {
    const id = req.body.id
    try {
        const deleteLikes = await prisma.likes.delete({ where: { id: id } })
        return res.json({ deleteLikes }).status(200)
    } catch (error) {
        return res.json({
            success: false,
            error
        }).status(400)
    }
})
app.post('/switchVisibilityOfPrompts', async (req: Request, res: any) => {
    const id = req.body.id
    const Visibility = req.body.switch
    try {
        const switchVisibility = await prisma.prompt.update({
            where: {
                id: id
            },
            data: {
                isPublic: Visibility
            }
        })
        return res.json(switchVisibility).status(200)
    } catch (error) {
        return res.json(error).status(400)
    }
})
// review
app.post('/addReview', async (req: Request, res: any) => {
    const review = req.body.review
    const review2 = req.body.review2
    const userEmail = req.body.email
    try {
        const Reviews = await prisma.reviews.create({
            data: {
                userEmail: userEmail,
                review: review,
                Improvement: review2
            },
            include: { user: { select: { name: true } } }
        })
        return res.json(Reviews).status(200)
    } catch (error) {
        return res.json(error).status(400)
    }
})
app.get('/getAllReviews', async (req: Request, res: any) => {
    try {
        const reviews = await prisma.reviews.findMany({
            include: { user: { select: { name: true, avatar_url: true } } }
        })
        return res.json(reviews).status(200)
    } catch (error) {
        return res.json(error).status(400)
    }
})
app.get('/getTopPosts', async (req: Request, res: any) => {
    try {
        const topPosts = await prisma.prompt.findMany({
            include: { user: { select: { name: true, avatar_url: true } } },
            orderBy: {
                Likes: "desc"
            },
            where: {
                isPublic: true
            },
            take: 10
        })
        return res.json(topPosts).status(200)
    } catch (error) {
        return res.json(error).status(400)
    }
})

app.get("/", (req: Request, res: any) => res.send("Congratulation 🎉🎉! Our Express server is Running on Vercel"));

app.listen(8000, () => {
    console.log("server started")
})
