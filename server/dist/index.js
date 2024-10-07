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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const replicate_1 = __importDefault(require("replicate"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: (_a = process.env.FRONTEND_URL) !== null && _a !== void 0 ? _a : 'http://localhost:5173'
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const replicate = new replicate_1.default({
    auth: process.env.REPLICATION_TOKEN,
});
app.post('/generate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const input = body.input;
        const aspect_ratio = body.aspect_ratio;
        const model_version = body.model_version;
        const style_type = body.style_type;
        const response = yield fetch("https://api.ideogram.ai/generate", {
            method: "POST",
            headers: {
                "Api-Key": process.env.API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "image_request": {
                    "prompt": input,
                    "aspect_ratio": aspect_ratio,
                    "model": model_version,
                    "style_type": style_type,
                    "magic_prompt_option": "AUTO",
                }
            }),
        });
        const result = yield response.json();
        if (result.data && result.data.length > 0) {
            const output = yield replicate.run("cdingram/face-swap:d1d6ea8c8be89d664a07a457526f7128109dee7030fdac424788d762c71ed111", {
                input: {
                    swap_image: process.env.HARKIRAT_IMG_URL,
                    input_image: result.data[0].url
                }
            });
            result.data[0].url = output;
            return res.json(result);
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
app.listen(8000, () => {
    console.log("server started");
});
