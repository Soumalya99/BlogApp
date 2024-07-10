import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../Store/authSlice";
import authService from "../Appwrite/auth_serv";
import { Button, Input, Logo } from "./index";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async(data) => {
    setError("")
    try {
      /** Initiating session */
      const session = await authService.login(data);
      console.log(session);
      if (session) {
        /** getting current user based on which we dispatch authLogin of userData */
        const userData = await authService.currentUserStatus();
        console.log(userData);
        if (userData) {
          dispatch(authLogin(userData));
          console.log("initiating login");
          navigate("/");
        }else{
          console.log('problem in login component')
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-stone-700 p-10 
      shadow-inner rounded-xl my-2`}
      >
        <div className="mb-2 flex justify-center">
          <span className="w-full inline-block max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-xl font-bold leading-tight">
          Sign in to your Account
        </h2>
        <p className="text-center mt-2 text-base">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium transition-all duration-200 hover:underline"
          >
            Signup
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-6">
            <Input
              label="email"
              placeholder="Enter your email"
              type="email"
              /**Validating and registering form  */
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Please enter a valid email address",
                },
              })}
            />

            <Input
              label="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
              })}
            />

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
