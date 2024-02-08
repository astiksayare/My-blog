
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({children, authentication = true}) => {

    const [loading, setLoading] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    // useEffect Hook
    useEffect(() => {

        // If user not authenticate their accout or he didn't login then first login to the account
        if (authentication && authStatus !== authentication){
            navigate('/login');
        }
        // If user is already login then go the home page.
        else if(!authentication && authStatus !== authentication){
            navigate("/");
        }

        setLoading(false);

    }, [authStatus, navigate, authentication])


    return loading ? <h1>Loading...</h1> : <>{children}</>
}

export default AuthLayout;