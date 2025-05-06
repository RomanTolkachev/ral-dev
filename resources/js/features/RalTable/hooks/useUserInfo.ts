import { AuthContext } from "@/app/providers/AuthProvider";
import { useContext } from "react";

export const useUserInfo = () => {
    const userContext = useContext(AuthContext);
    const user = userContext?.userInfo;
    const userId = user?.id;
    const isLoading = userContext?.isLoading ?? true;
    const loginStatus = userContext?.loginStatus
    const isUserChecked = !isLoading;
  
    return { userId, isUserChecked, loginStatus, user: userContext };
  };