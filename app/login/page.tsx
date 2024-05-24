import { Login } from "@/components/login/login";
import { getServerSession } from "next-auth/next"
import authOptions from "@/lib/authOptions";
import { redirect } from 'next/navigation'

const login = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        redirect("/")
    }
    
    return <Login />
}

export default login;
