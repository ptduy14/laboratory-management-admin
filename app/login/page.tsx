import { Login } from "@/components/login/login";
import { getServerSession } from "next-auth/next"
import authOptions from "@/lib/authOptions";
import { redirect } from 'next/navigation'
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: "Sign In",
   description: "Laboratory management for CTUT Lab",
}

const login = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        redirect("/")
    }
    
    return <Login />
}

export default login;
