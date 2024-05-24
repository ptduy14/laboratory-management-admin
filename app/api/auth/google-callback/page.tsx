import React from "react";
import GoogleCallback from "@/components/auth/google-callback";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { redirect } from 'next/navigation'

const googleCallback = async () => {  
    const session = await getServerSession(authOptions);
    if (session?.user.hasAccessTokenLocal) {
        redirect("/")
    }

    return <GoogleCallback />
}

export default googleCallback;