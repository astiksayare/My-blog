

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import {Button, Input, Logo} from "./index";


const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("");

    // This funtion is word when you click to the sign up button.
    const login = async (data) => {

        setError("");

        try {

            const session = await authService.login(data);

            if (session){
                const userData = await authService.getCurrentUser();

                if (userData) dispatch(authLogin(userData));

                // Once condition will true it will redirect user to the home page.
                navigate("/");
            }
            
        } catch (error) {
            setError(error.message);
        }

    }


    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

            <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
            </span>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form
                onSubmit={handleSubmit(login)}
                className="mt-8" 
                >
                    <div className="space-y-5">

                        {/* Input Component For the Email */}
                        <Input 
                        label="Email: "
                        type="email"
                        placeholder="Enter the email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            
                            }
                        })}
                        />

                        {/* Second Input Component for the Password */}
                        <Input 
                        label="Password: "
                        type="password"
                        placeholder='Enter the password'
                        
                        {...register("password", {
                            required: true
                        })}
                        />

                        {/* Button */}
                        <Button
                        type="submit"
                        className="w-full"
                        >
                        Login
                        </Button>

                    </div>

                </form>
            </div>

        </div>
    )
}

export default Login;