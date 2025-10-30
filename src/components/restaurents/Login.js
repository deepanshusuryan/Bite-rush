"use client"
import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Link from "next/link";

function Login({ onSubmit: externalSubmit } = {}) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = (data) => {
        if (externalSubmit) return externalSubmit(data);
        console.log("Login payload:", data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF9F3] p-6">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 border-t-4 border-[#E94E1B]">
                <div className="flex flex-col items-center gap-3 mb-4">
                    <div className="relative w-16 h-16">
                        <Image src="/logo.jpeg" alt="BiteRush" layout="fill" objectFit="contain" />
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
                            id="email"
                            type="email"
                            placeholder="Enter restaurant e-mail"
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
                            })}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E94E1B]"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="sr-only" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E94E1B]"
                        />
                        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-600">
                        <label className="flex items-center gap-2">
                            {/* <input type="checkbox" className="h-4 w-4 rounded border-gray-300" {...register("remember")} />
              <span>Remember me</span> */}
                        </label>
                        <a href="/forgot-password" className="text-[#E94E1B] hover:underline">Forgot password?</a>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#2C7A47] text-white font-semibold py-3 rounded-lg hover:bg-[#25643B] transition-colors disabled:opacity-60"
                        >
                            {isSubmitting ? "Signing in..." : "Sign In"}
                        </button>
                    </div>
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Don't have an account?{" "}
                    <Link href="/restaurent/signup" className="text-[#E94E1B] font-medium hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;