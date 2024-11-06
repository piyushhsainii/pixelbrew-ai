
import { Request, Router } from "express";
import Razorpay from "razorpay";
import prisma from "../db";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

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
        }
    } catch (error) {
        console.log(error)
        return res.json({
            mmessage: "Error occured while fetching payments",
            error: error
        }).status(400)
    }
})
router.post('/capturePayments', async (req: Request, res: any) => {
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
router.post('/verifySignature', async (req: Request, res: any) => {
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



export default router