
import { Request, Router } from "express";
import Razorpay from "razorpay";
import prisma from "../db";
import { validatePaymentVerification, validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

const router = Router()

const RazorpayInstance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});

router.post('/purchaseTokens', async (req: Request, res: any) => {
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
router.post('/verifyOrder', async (req: Request, res: any) => {
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
router.post('/fetchPayments', async (req: Request, res: any) => {
    // Creating the order
    const payemtnID = req.body.paymentID
    try {
        const response = await RazorpayInstance.payments.fetch(payemtnID)
        if (!response) {
            return res.json({ error: "could not find that payment" }).status(400)
        }
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

router.get('/fetchAllPayments', async (req: Request, res: any) => {
    try {
        const userPayments = await prisma.payments.findMany()
        return res.json(userPayments).status(200)
    } catch (error) {
        return res.json(error).status(400)
    }
})

router.post('/fetchPaymentandAddToken', async (req: Request, res: any) => {
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
        } else {
            console.log(response)
            return res.json(response).status(200)
        }
    } catch (error) {
        console.log(error)
        return res.json({
            mmessage: "Error occured while fetching payments",
            error: error
        }).status(400)
    }
})
// WEBHOOK API
router.post("/api/webhook", async (req: Request, res: any) => {
    const signature = req.headers["x-razorpay-signature"];
    const isValid = await validateWebhookSignature(
        JSON.stringify(req.body),
        signature as string,
        process.env.RAZORPAY_WEBHOOK_SIGNATURE
    );
    if (isValid) {
        const { event, payload } = req.body;
        console.log(payload)
        switch (event) {
            case "payment.authorized":
                await console.log('payment was authorised')
                break;
            case "payment.captured":
                const email = payload.payment.entity.email

                try {
                    function extractTokenAmount(description) {
                        const match = description.match(/\b\d+\b/);
                        return match ? Number(match[0]) : 0;
                    }
                    const tokenAmount = extractTokenAmount(payload.payment.entity.description)
                    const rechargeTokens = await prisma.user.update({           //Updating Tokens in the database
                        where: { email: email },
                        data: { balance: { increment: tokenAmount } },
                        select: { balance: true }
                    })
                    // Add the entry to payments table -
                    const paymentTableEntry = await prisma.payments.upsert({
                        where: { paymentId: payload.payment.entity.id },
                        create: {
                            orderID: payload.payment.entity.order_id,
                            paymentId: payload.payment.entity.id,
                            tokensPurchased: Number(payload.payment.entity.amount),
                            method: payload.payment.entity.method,
                            userEmail: email,
                            status: payload.payment.entity.status,
                            Tokens: JSON.stringify(tokenAmount),
                        },
                        update: {
                            orderID: payload.payment.entity.order_id,
                            paymentId: payload.payment.entity.id,
                            tokensPurchased: Number(payload.payment.entity.amount),
                            method: payload.payment.entity.method,
                            userEmail: email,
                            status: payload.payment.entity.status,
                            Tokens: JSON.stringify(tokenAmount),
                        }
                    })
                    return res.json({ success: true, payload, tokenRechargeAmount: rechargeTokens, paymentTableEntry }).status(200)
                }
                catch (error) {
                    console.log(error)
                    return res.json({
                        mmessage: "Error occured while fetching payments",
                        error: error
                    }).status(400)
                }
            case "payment.failed":

                function extractTokenAmount(description) {
                    const match = description.match(/\b\d+\b/);
                    return match ? Number(match[0]) : 0;
                }
                const tokenAmount = extractTokenAmount(payload.payment.entity.description)
                await prisma.payments.create({
                    data: {
                        orderID: payload.payment.entity.order_id,
                        paymentId: payload.payment.entity.id,
                        tokensPurchased: Number(payload.payment.entity.amount),
                        method: payload.payment.entity.method,
                        userEmail: email,
                        status: payload.payment.entity.status,
                        Tokens: JSON.stringify(tokenAmount),
                    }
                })
                break;
            default:
                console.log(`Unhandled event: ${event}`);
                break;
        }
    }
    res.status(200).send();

})


export default router