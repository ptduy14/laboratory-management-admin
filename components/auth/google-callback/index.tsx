"use client";

import jwtManager from "@/config/jwtManager";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const GoogleCallback = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  console.log(session);

  useEffect(() => {
    const accessToken = jwtManager.getToken(); 
    if (session && !accessToken) {
        jwtManager.setToken(session.user.access_token);
        update({ hasAccessTokenLocal: true });
        router.push("/");
        toast.success("Đăng nhập thành công");
      }
  }, [session])

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
    </div>
  );
};

export default GoogleCallback;
