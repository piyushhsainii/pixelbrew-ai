import dotenv from "dotenv"
dotenv.config()
import express, { Request, Response } from "express"
import cors from 'cors'
import Replicate from "replicate";
import { v2 as cloudinary } from 'cloudinary'
import auth from "./auth"
import prisma from "./db";
import Razorpay from "razorpay"
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
const multer = require('multer')
const app = express()
app.use(cors({
    origin: '*'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const replicate = new Replicate({
    auth: process.env.REPLICATION_TOKEN,
})

const RazorpayInstance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});

const upload = multer({ dest: 'uploads/' })

app.use('/auth', auth)             //handles the google auth

app.post('/generate', async (req: Request, res: any) => {
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
            return res.json({
                error: "Failed to fetch user"
            }).status(400)
        }
        if (userDetail.balance == 0) {
            return res.json({
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

            } catch (error) {
                console.log(error)
            }
            const updateBalance = await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    balance: userDetail.balance - 1
                }
            })
            return res.json({
                result,
                balance: updateBalance.balance
            })
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

app.post('/file', async (req: Request, res: any) => {
    console.log(req.body.file)
    return res.json({
        success: "success"
    })
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
            }
        })
        return res.json({
            user
        }).status(200)
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

app.post('/getPrompts', async (req: Request, res: any) => {
    const email = req.body.email
    try {
        const getPrompt = await prisma.prompt.findFirst({
            where: {
                user: {
                    email: email
                }
            },
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
            orderBy: [
                {
                    prompt: "asc"
                }
            ]
        })
        return res.json(getPrompt).status(200)
    } catch (error) {
        return res.json(error).status(400)
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

app.post('/purchaseTokens', async (req: Request, res: any) => {
    // Creating the order
    const amount = req.body.amount
    try {
        const response = await RazorpayInstance.orders.create({
            amount: `${amount}00`,
            currency: "INR",
            receipt: "reciept1"

        })
        return res.json({
            response
        }).status(200)
    } catch (error) {
        console.log(error)
        return res.json({
            error
        }).status(400)
    }
})
app.post('/verifyOrder', async (req: Request, res: any) => {
    // Creating the order
    const orderId = req.body.orderId
    try {
        const response = await RazorpayInstance.orders.fetch(orderId)
        return res.json({
            success: true,
            response
        }).status(200)
    } catch (error) {
        console.log(error)
        return res.json({
            mmessage: "Something went wrong",
            error: error
        }).status(400)
    }
})
app.post('/fetchPayments', async (req: Request, res: any) => {
    // Creating the order
    const payemtnID = req.body.paymentID
    try {
        const response = await RazorpayInstance.payments.fetch(payemtnID)
        return res.json({
            success: true,
            response
        }).status(200)
    } catch (error) {
        console.log(error)
        return res.json({
            mmessage: "Error occured while fetching payments",
            error: error
        }).status(400)
    }
})
app.post('/fetchPaymentandAddToken', async (req: Request, res: any) => {
    // Creating the order
    const payemtnID = req.body.paymentID
    const email = req.body.email
    try {
        const response = await RazorpayInstance.payments.fetch(payemtnID)
        if (response.status == "captured") {
            // const tokenAmount = Number(response.description[0])
            function extractTokenAmount(description) {
                // Use a regular expression to find numbers in the description
                const match = description.match(/\b\d+\b/);

                // If a match is found, convert it to a number; otherwise return 0 or an error value
                return match ? Number(match[0]) : 0;
            }
            const tokenAmount = extractTokenAmount(response.description)
            const rechargeTokens = await prisma.user.update({           //Updating Tokens in the database
                where: {
                    email: email
                },
                data: {
                    balance: {
                        increment: tokenAmount
                    }
                },
                select: {
                    balance: true
                }
            })
            return res.json({
                success: true,
                response,
                tokenRechargeAmount: rechargeTokens
            }).status(200)
        }
    } catch (error) {
        console.log(error)
        return res.json({
            mmessage: "Error occured while fetching payments",
            error: error
        }).status(400)
    }
})
app.post('/capturePayments', async (req: Request, res: any) => {
    // Creating the order
    const paymentID = req.body.paymentID
    const amount = req.body.amount
    const currency = req.body.currency
    try {
        const response = await RazorpayInstance.payments.capture(paymentID, amount, currency)
        return res.json({
            success: true,
            response
        }).status(200)
    } catch (error) {
        console.log(error)
        return res.json({
            mmessage: "Something went wrong",
            error: error
        }).status(400)
    }
})
app.post('/verifySignature', async (req: Request, res: any) => {
    const orderID = req.body.orderID
    const paymentId = req.body.paymentId
    const signature = req.body.signature
    const secret = process.env.KEY_SECRET
    const userEmail = req.body.email
    const tokenAmt = req.body.tokenAmt
    try {
        const isVerified = validatePaymentVerification({ order_id: orderID, payment_id: paymentId }, signature, secret)
        if (isVerified) {
            const addPaymentEntry = await prisma.payments.create({
                data: {
                    orderID: orderID,
                    tokensPurchased: Number(tokenAmt),
                    paymentId: paymentId,
                    signature: signature,
                    userEmail: userEmail
                }
            })
            return res.json({
                isVerified,
                addPaymentEntry
            }).status(200)
        }
    } catch (error) {
        return res.json({
            message: "Something went wrong",
            error
        }).status(400)
    }

})

app.get("/", (req: Request, res: any) => res.send("Congratulation 🎉🎉! Our Express server is Running on Vercel"));

app.listen(8000, () => {
    console.log("server started")
})
