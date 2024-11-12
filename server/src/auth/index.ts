import express, { Request, Response } from "express"
import dotenv from 'dotenv'
import { createServerClient } from '@supabase/ssr'
import cookieParser from 'cookie-parser'

dotenv.config()
const router = express.Router()

// Add cookie-parser middleware
router.use(cookieParser())

router.get('/callback', async (req: Request, res: Response) => {
    const code = req.query.code as string
    const next = (req.query.next as string) ?? "/"

    if (code) {
        const supabase = createServerClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get: (name: string) => req.cookies[name],
                    set: (name: string, value: string, options: any) => {
                        res.cookie(name, value, options)
                    },
                },
            }
        )
        console.log("auth")
        await supabase.auth.exchangeCodeForSession(code)
    }

    res.redirect('http://localhost:5173')
})

export default router