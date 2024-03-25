"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  loginFormValidation,
  errorsType,
} from "@/validations/loginFormvalidation";

export interface UserInputType {
  email: string;
  password: string;
}

const initUserInput: UserInputType = {
  email: "",
  password: "",
};

export const Login = () => {
  const router = useRouter();
  const [userInput, setUserInput] = useState<UserInputType>(initUserInput);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<errorsType>({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    setErrors(loginFormValidation(userInput));

    console.log(errors);

    if (errors.email || errors.password) {
      return;
    }

    setLoading(true);

    const result = await signIn("credentials", {
      email: userInput.email,
      password: userInput.password,
      redirect: false,
    });

    console.log("waiting for server...");

    if (result?.ok) {
      router.push("/");
      toast.success("Đăng nhập thành công !!");
    } else {
      toast.error("Sai thông tin đăng nhập !!");
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Logo_ctuet.png"
              className="w-32 mx-auto"
            />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
            <div className="w-full flex-1 mt-8">
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign up with e-mail
                </div>
              </div>

              <div className="mx-auto max-w-xs">
                <input
                  className={`w-full px-8 py-4 rounded-lg font-medium  ${
                    errors.email
                      ? "border-red-500 bg-red-100 focus:border-red-400"
                      : "bg-gray-100 border-gray-200 focus:border-gray-400"
                  } border placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
                  type="email"
                  placeholder="Email"
                  value={userInput.email}
                  onChange={(e) => {
                    setUserInput((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  disabled={loading}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
                <input
                  className={`w-full px-8 py-4 rounded-lg font-medium  ${
                    errors.password
                      ? "border-red-500 bg-red-100 focus:border-red-400"
                      : "bg-gray-100 border-gray-200 focus:border-gray-400"
                  } border placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
                  type="password"
                  placeholder="Password"
                  value={userInput.password}
                  onChange={(e) => {
                    setUserInput((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                    setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  disabled={loading}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password}
                  </span>
                )}
                <button
                  onClick={handleLogin}
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  disabled={loading}
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign Up</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
