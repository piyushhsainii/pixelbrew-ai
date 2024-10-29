"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const replicate_1 = __importDefault(require("replicate"));
const cloudinary_1 = require("cloudinary");
const auth_1 = __importDefault(require("./auth"));
const db_1 = __importDefault(require("./db"));
const razorpay_1 = __importDefault(require("razorpay"));
const razorpay_utils_1 = require("razorpay/dist/utils/razorpay-utils");
const multer = require('multer');
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const replicate = new replicate_1.default({
    auth: process.env.REPLICATION_TOKEN,
});
const RazorpayInstance = new razorpay_1.default({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});
const upload = multer({ dest: 'uploads/' });
app.use('/auth', auth_1.default); //handles the google auth
app.post('/generate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const input = body.input;
        const aspect_ratio = body.aspect_ratio;
        const model_version = body.model_version;
        const style_type = body.style_type;
        const image_url = body.face_swap;
        const magic_Prompt = body.magic_prompt; //enum - ON | OFF | AUTO
        const email = body.email;
        const userDetail = yield db_1.default.user.findUnique({
            where: {
                email: email
            }
        });
        if (userDetail == null) {
            return res.json({
                error: "Failed to fetch user"
            }).status(400);
        }
        if (userDetail.balance == 0) {
            return res.json({
                error: "Please buy credits to generate Images"
            }).status(400);
        }
        const response = yield fetch("https://api.ideogram.ai/generate", {
            method: "POST",
            headers: {
                "Api-Key": process.env.API_KEY,
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
        const result = yield response.json();
        if (result.data && result.data.length > 0) {
            try {
                const output = yield replicate.run("cdingram/face-swap:d1d6ea8c8be89d664a07a457526f7128109dee7030fdac424788d762c71ed111", {
                    input: {
                        swap_image: image_url,
                        input_image: result.data[0].url
                    }
                });
                result.data[0].url = output;
                console.log(output, "replicate response");
            }
            catch (error) {
                console.log(error);
            }
            const updateBalance = yield db_1.default.user.update({
                where: {
                    email: email
                },
                data: {
                    balance: userDetail.balance - 1
                }
            });
            return res.json({
                result,
                balance: updateBalance.balance
            });
        }
    }
    catch (error) {
        console.error(error);
        return res.json(error).status(400);
    }
}));
app.post('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const output = yield replicate.run("cdingram/face-swap:d1d6ea8c8be89d664a07a457526f7128109dee7030fdac424788d762c71ed111", {
        input: {
            swap_image: process.env.HARKIRAT_IMG_URL,
            input_image: "https://replicate.delivery/pbxt/LPsGWYhFW03GN2y21RDRlat7YBCVPupkwyEg3Ca0YxcFWYNE/images.jpeg"
        }
    });
    console.log(output);
    return res.json({
        output
    });
}));
app.post('/uploadToCloud', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary_1.v2.uploader
            .upload("my_image.jpg");
        return res.json({
            result
        }).status(200);
    }
    catch (error) {
        return res.json({ error }).status(400);
    }
}));
app.post('/file', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.file);
    return res.json({
        success: "success"
    });
}));
app.post('/setupProfile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const email = req.body.email;
    const about = req.body.about;
    const trainingImg = req.body.trainingImg;
    const avatar_url = req.body.avatar_url;
    const provider = req.body.provider;
    try {
        const response = yield db_1.default.user.create({
            data: {
                name,
                email,
                about,
                trainingImg,
                avatar_url,
                provider,
            }
        });
        return res.json({
            success: true,
            response
        }).status(200);
    }
    catch (error) {
        return res.json({ error }).status(400);
    }
}));
app.post('/getUserDetails', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    try {
        const user = yield db_1.default.user.findFirst({
            where: {
                email: email
            }
        });
        return res.json({
            user
        }).status(200);
    }
    catch (error) {
        return res.json(error).status(400);
    }
}));
app.post('/savePrompts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prompt = req.body.prompt;
    const ImageUrl = req.body.image;
    const userEmail = req.body.email;
    try {
        const saveDataToPromptTable = yield db_1.default.prompt.create({
            data: {
                prompt: prompt,
                url: ImageUrl,
                user: {
                    connect: { email: userEmail }
                }
            },
            include: { user: true },
        });
        return res.json({
            saveDataToPromptTable
        }).status(200);
    }
    catch (error) {
        return res.json(error).status(400);
    }
}));
app.post('/updateProfile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const username = req.body.username;
    const about = req.body.about;
    const trainingImg = req.body.trainingImg;
    try {
        const updateProfie = yield db_1.default.user.update({
            data: {
                name: username,
                about: about,
                trainingImg: trainingImg
            },
            where: {
                email: email
            }
        });
        return res.json({
            updateProfie
        }).status(200);
    }
    catch (error) {
        return res.json({
            error
        }).status(400);
    }
}));
app.post('/getPrompts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    try {
        const getPrompt = yield db_1.default.prompt.findFirst({
            where: {
                user: {
                    email: email
                }
            },
            include: {
                user: {
                    select: {
                        trainingImg: true,
                        Prompt: true
                    }
                }
            },
            orderBy: [
                {
                    prompt: "asc"
                }
            ]
        });
        return res.json(getPrompt).status(200);
    }
    catch (error) {
        return res.json(error).status(400);
    }
}));
app.post('/purchaseTokens', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Creating the order
    const amount = req.body.amount;
    try {
        const response = yield RazorpayInstance.orders.create({
            amount: `${amount}00`,
            currency: "INR",
            receipt: "reciept1"
        });
        return res.json({
            response
        }).status(200);
    }
    catch (error) {
        console.log(error);
        return res.json({
            error
        }).status(400);
    }
}));
app.post('/verifyOrder', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Creating the order
    const orderId = req.body.orderId;
    try {
        const response = yield RazorpayInstance.orders.fetch(orderId);
        return res.json({
            success: true,
            response
        }).status(200);
    }
    catch (error) {
        console.log(error);
        return res.json({
            mmessage: "Something went wrong",
            error: error
        }).status(400);
    }
}));
app.post('/fetchPayments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Creating the order
    const orderId = req.body.orderId;
    try {
        const response = yield RazorpayInstance.payments.fetch('pay_PEqvBtVk3juSim');
        return res.json({
            success: true,
            response
        }).status(200);
    }
    catch (error) {
        console.log(error);
        return res.json({
            mmessage: "Error occured while fetching payments",
            error: error
        }).status(400);
    }
}));
app.post('/capturePayments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Creating the order
    const paymentID = req.body.paymentID;
    const amount = req.body.amount;
    const currency = req.body.currency;
    try {
        const response = yield RazorpayInstance.payments.capture(paymentID, amount, currency);
        return res.json({
            success: true,
            response
        }).status(200);
    }
    catch (error) {
        console.log(error);
        return res.json({
            mmessage: "Something went wrong",
            error: error
        }).status(400);
    }
}));
app.post('/verifySignature', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderID = req.body.orderID;
    const paymentId = req.body.paymentId;
    const signature = req.body.signature;
    const secret = process.env.KEY_SECRET;
    try {
        const isVerified = (0, razorpay_utils_1.validatePaymentVerification)({ order_id: orderID, payment_id: paymentId }, signature, secret);
        return res.json({
            isVerified
        }).status(200);
    }
    catch (error) {
        return res.json({
            message: "Something went wrong",
            error
        }).status(400);
    }
}));
app.get("/", (req, res) => res.send("Congratulation 🎉🎉! Our Express server is Running on Vercel"));
app.listen(8000, () => {
    console.log("server started");
});
