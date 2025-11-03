"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Link from "next/link";
import baseUrl from "@/service/axiosInstance";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup"
import loginValidation from "@/schemas/restaurant/loginValidation";

function Login() {
    const router = useRouter();

    const {register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(loginValidation) });

    const [loggedIn, setIsLoggedin] = useState(false);
    useEffect(() => {
        const token = sessionStorage.getItem("accessToken")
        if (token) {
            setIsLoggedin(true);
        }
    }, [])

    if (loggedIn) {
        router.push("/restaurant/dashboard");
        router.refresh();
        return;
    }

    const onSubmit = async (data) => {
        const res = await baseUrl.post("/restaurant/login", data);
        if (res.data.success) {
            alert(res.data.message);
            sessionStorage.setItem("accessToken", res.data.accessToken);
            router.push("/restaurant/dashboard");
            
        } else {
            alert(res.data.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF9F3] p-6">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 border-t-4 border-[#E94E1B]">
                <div className="flex flex-col items-center gap-3 mb-4">
                    <div className="relative w-16 h-16">
                        <Image src="/logo.jpeg" alt="BiteRush" fill className="object-contain" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-[#2C7A47]">BiteRush</h1>
                    <p className="text-sm text-gray-500 text-center">
                        Sign in to manage your restaurant orders
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="sr-only" htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Enter restaurant e-mail"
                            {...register("email")}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E94E1B]"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="sr-only" htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            {...register("password")}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E94E1B]"
                        />
                        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-600">
                        <label className="flex items-center gap-2"></label>
                        <Link href="/forgot-password" className="text-[#E94E1B] hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-[#2C7A47] text-white font-semibold py-3 rounded-lg hover:bg-[#25643B] transition-colors disabled:opacity-60"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Don't have an account?{" "}
                    <Link href="/restaurant/signup" className="text-[#E94E1B] font-medium hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
