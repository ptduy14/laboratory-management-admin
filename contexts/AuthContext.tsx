import React, { ReactNode, createContext, useContext } from "react";
import { AuthService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser, removeUser } from "@/redux/slice/userSlice";
import { toast } from "react-toastify";
import { JWTManager } from "@/libs/JWTManager";

interface UserType {
  email: string;
  password: string;
}

interface AuthContextType {
  login: (userData: UserType) => void;
  getMe: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch()

  const login = async (userData: UserType) => {
    try {
      const { data } = await AuthService.login(userData);
      JWTManager.setToken(data.access_token);
      let user = await AuthService.getMe()
      dispatch(setUser(user.data))
      router.push("/")
    } catch (error) {
      toast.error('Thông tin đăng nhập không chính xác');
      console.log(error);
    }
  };

  const getMe = async () => {
    const data = await AuthService.getMe()
    return data;
  };

  const logout = () => {};

  const AuthContextValue: AuthContextType = {
    login,
    getMe,
    logout,
  };

  return (
    <AuthContext.Provider value={AuthContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
