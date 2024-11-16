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
const cloudinary_1 = require("cloudinary");
const auth_1 = __importDefault(require("./auth"));
const db_1 = __importDefault(require("./db"));
const payment_1 = __importDefault(require("./api/payment"));
const model_1 = __importDefault(require("./api/model"));
const falAi_model_1 = __importDefault(require("./api/falAi_model"));
const multer = require('multer');
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const upload = multer({ dest: 'uploads/' });
app.use('/auth', auth_1.default); //handles the google auth
app.use('/', payment_1.default);
app.use('/', falAi_model_1.default);
app.use('/', model_1.default);
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
                trainingImages: [trainingImg],
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
app.post('/addTrainingImg', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const trainingImg = req.body.img;
    try {
        const updatedTrainingImg = yield db_1.default.user.update({
            where: {
                email: email
            },
            data: {
                trainingImg: trainingImg,
                trainingImages: {
                    push: [trainingImg]
                }
            }
        });
        return res.json(updatedTrainingImg).status(200);
    }
    catch (error) {
        return res.json(error).status(400);
    }
}));
app.post('/setActiveImage', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const trainingImg = req.body.img;
    try {
        const activeImg = yield db_1.default.user.update({
            where: { email: email },
            data: { trainingImg: trainingImg }
        });
        res.json(activeImg).status(200);
    }
    catch (error) {
        res.json(error).status(200);
    }
}));
app.post('/getUserDetails', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    try {
        const user = yield db_1.default.user.findFirst({
            where: { email: email },
            include: {
                Payments: true,
                Prompt: true,
                Reviews: true,
                Likes: {
                    select: { isLiked: true, postID: true, userEmail: true, url: true }
                }
            }
        });
        res.json({
            user
        }).status(200);
    }
    catch (error) {
        res.json(error).status(400);
    }
}));
app.post('/getAllImages', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    try {
        const AllImages = yield db_1.default.prompt.findMany({
            where: { isPublic: true },
            include: { user: true, likes: true },
            orderBy: { Likes: "desc" },
        });
        const userLikes = yield db_1.default.likes.findMany({
            where: {
                userEmail: email
            }
        });
        res.json({
            AllImages,
            userLikes
        }).status(200);
    }
    catch (error) {
        res.json(error).status(400);
    }
}));
app.post('/getPrompts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    try {
        const getPrompt = yield db_1.default.prompt.findFirst({
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
            orderBy: [{ isPublic: "asc" }]
        });
        res.json(getPrompt).status(200);
    }
    catch (error) {
        res.json(error).status(400);
    }
}));
app.post('/savePrompts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prompt = req.body.prompt;
    const ImageUrl = req.body.image;
    const userEmail = req.body.email;
    const model = req.body.model;
    try {
        const saveDataToPromptTable = yield db_1.default.prompt.create({
            data: {
                prompt: prompt,
                url: ImageUrl,
                model: model,
                user: { connect: { email: userEmail } }
            },
            include: { user: true },
        });
        res.json({
            saveDataToPromptTable
        }).status(200);
    }
    catch (error) {
        res.json(error).status(400);
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
            where: { email: email }
        });
        res.json({
            updateProfie
        }).status(200);
    }
    catch (error) {
        res.json({
            error
        }).status(400);
    }
}));
app.put('/updateLikes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const likes = req.body.likes;
    const liked = req.body.isLiked;
    const postID = req.body.postID;
    const userEmail = req.body.userEmail;
    const url = req.body.url;
    try {
        const userExist = yield db_1.default.user.findUnique({ where: { email: userEmail } });
        if (userExist == null) {
            res.status(402).json({ error: "Setup your profile first!" });
        }
        if (userExist !== null && liked == true) {
            yield db_1.default.likes.updateMany({
                where: { postID: postID },
                data: { isLiked: false }
            });
            yield db_1.default.prompt.update({ where: { id: postID }, data: { Likes: likes } });
            res.json({ success: true }).status(200);
        }
        if (userExist !== null && liked == false) {
            (yield db_1.default.likes.create({
                data: {
                    isLiked: true,
                    postID: postID,
                    url: url,
                    userEmail: userEmail
                }
            }));
            yield db_1.default.prompt.update({ where: { id: postID }, data: { Likes: likes } });
            res.json({ success: true }).status(200);
        }
    }
    catch (error) {
        res.json({ success: false, error }).status(400);
    }
}));
app.put('/deleteLikes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    try {
        const deleteLikes = yield db_1.default.likes.delete({ where: { id: id } });
        res.json({ deleteLikes }).status(200);
    }
    catch (error) {
        res.json({
            success: false,
            error
        }).status(400);
    }
}));
app.post('/switchVisibilityOfPrompts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const Visibility = req.body.switch;
    try {
        const switchVisibility = yield db_1.default.prompt.update({
            where: { id: id },
            data: { isPublic: Visibility }
        });
        res.json(switchVisibility).status(200);
    }
    catch (error) {
        res.json(error).status(400);
    }
}));
// review
app.post('/addReview', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const review = req.body.review;
    const review2 = req.body.review2;
    const userEmail = req.body.email;
    try {
        const Reviews = yield db_1.default.reviews.create({
            data: {
                userEmail: userEmail,
                review: review,
                Improvement: review2
            },
            include: { user: { select: { name: true } } }
        });
        res.json(Reviews).status(200);
    }
    catch (error) {
        res.json(error).status(400);
    }
}));
app.get('/getAllReviews', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield db_1.default.reviews.findMany({
            include: { user: { select: { name: true, avatar_url: true } } }
        });
        res.json(reviews).status(200);
    }
    catch (error) {
        res.json(error).status(400);
    }
}));
app.get('/getTopPosts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topPosts = yield db_1.default.prompt.findMany({
            include: { user: { select: { name: true, avatar_url: true } } },
            orderBy: {
                Likes: "asc"
            },
            where: {
                isPublic: true
            },
            take: 12
        });
        const recentPosts = yield db_1.default.prompt.findMany({
            include: { user: { select: { name: true, avatar_url: true } } },
            where: {
                isPublic: true
            },
            take: 12
        });
        res.json({ topPosts, recentPosts }).status(200);
    }
    catch (error) {
        res.json(error).status(400);
    }
}));
app.get("/", (req, res) => res.send("Congratulation 🎉🎉! Our Express server is Running on Vercel"));
app.listen(8000, () => {
    console.log("server started");
});
