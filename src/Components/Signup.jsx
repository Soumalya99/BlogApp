import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../Appwrite/auth_serv";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
import { login } from "../Store/authSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const create = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount(data);
      console.log(session);
      if (session) {
        const userData = await authService.currentUserStatus();
        if (userData) dispatch(login(userData));
        console.log(userData);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-stone-700 shadow-inner p-10 rounded-xl `}
      >
        <div className="mb-2 flex justify-center">
          <span className="w-full inline-block max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-xl font-bold leading-tight">
          Sign up to create Account
        </h2>
        <p className="text-center mt-2 text-base">
          Already have any account?&nbsp;
          <Link
            to="/login"
            className="font-medium transition-all duration-200  hover:underline"
          >
            SignIn
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-6">
            <Input
              label="Full name"
              type="text"
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="email"
              placeholder="Enter your email"
              type="email"
              /**Validating and registering form  */
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value.trim()) || "Please enter a valid email address"
                }
              })}
            />
            <Input
              label="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              {" "}
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
