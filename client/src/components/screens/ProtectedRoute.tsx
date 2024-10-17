import { useRecoilState } from "recoil"
import { supabase } from "../../lib/supabase"
import { authUser } from "../../atoms/atoms"
import { useEffect, useState } from "react"
import { Outlet, Navigate } from "react-router-dom"
import Loader from "../Loader"

const ProtectedRoute = () => {
    const [user, setUser] = useRecoilState(authUser)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getSession() {
            const { data, error } = await supabase.auth.getSession()
            if (error) {
                console.error("Error fetching session:", error)
                setUser(null)
            } else if (data.session) {
                setUser(data.session.user)
            } else {
                setUser(null)
            }
            setLoading(false)
        }
        getSession()
    }, [setUser])

    if (loading) {
        return <Loader /> // Or any loading indicator
    }

    return user ? <Outlet /> : <Navigate to="/" replace />
}

export default ProtectedRoute