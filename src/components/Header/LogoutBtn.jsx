
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

const LogoutBtn = ({children}) => {

    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        })
    }

    return (
        <button
        onClick={logoutHandler}
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        >{children}</button>
    )
}

export default LogoutBtn;