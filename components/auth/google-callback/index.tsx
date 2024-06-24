"use client";
import { LoaderSpinner } from "@/components/loader/loader-spinner";
import tokenManager from "@/config/tokenManager";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const GoogleCallback = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    const accessToken = tokenManager.getAccessToken();
    if (session && !accessToken) {
        tokenManager.setTokens(session.user.access_token, session.user.refresh_token);
        localStorage.setItem("email", session.user.userInfo.email)
        update({ hasTokenLocal: true });
        router.push("/");
        toast.success("Đăng nhập thành công");
      }
  }, [session])

  return <LoaderSpinner />
};

export default GoogleCallback;
