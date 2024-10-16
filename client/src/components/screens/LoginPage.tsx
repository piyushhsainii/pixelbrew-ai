import { createClient } from '@supabase/supabase-js'

const LoginPage = () => {

    const supabase = createClient("https://fnjoaxjxnwdiiqiobgjy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuam9heGp4bndkaWlxaW9iZ2p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgyODcxOTcsImV4cCI6MjA0Mzg2MzE5N30.lkOR4zq7CelacThjS7xslB9ZsfbACB1MkKO90zLcmCo")

    return (
        <div className='flex justify-center items-center'>
            <button
                onClick={async () => {
                    await supabase.auth.signInWithOAuth({
                        provider: 'google',
                        options: {
                            redirectTo: `http://localhost:8000/auth/callback`,
                        },
                    })

                }}
            >LOG IN</button>
        </div>
    )
}

export default LoginPage