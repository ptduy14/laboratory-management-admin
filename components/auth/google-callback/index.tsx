"use client";

import { LoaderSpinner } from "@/components/loader/loader-spinner";
import jwtManager from "@/config/jwtManager";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const GoogleCallback = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    const accessToken = jwtManager.getToken(); 
    if (session && !accessToken) {
        jwtManager.setToken(session.user.access_token);
        update({ hasAccessTokenLocal: true });
        router.push("/");
        toast.success("Đăng nhập thành công");
      }
  }, [session])

  return <LoaderSpinner />
};

export default GoogleCallback;
