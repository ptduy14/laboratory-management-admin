import { userSelector } from "@/redux/selector"
import { useSelector } from "react-redux"

export const checkAuthenticate = () => {
    const user = useSelector(userSelector);

    if (Object.keys(user).length > 0) {
        return true
    } else {
        return false
    }
}