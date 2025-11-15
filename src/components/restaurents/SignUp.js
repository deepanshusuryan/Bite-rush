"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image';
import Link from 'next/link';
import baseUrl from '@/service/axiosInstance';
import { yupResolver } from "@hookform/resolvers/yup"
import signupValidation from '@/schemas/restaurant/signUpValidation';
import { useRouter } from 'next/navigation';

function SignUp() {
    const router=useRouter();

    const { register, reset, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(signupValidation) });

    const onSubmit = async (data) => {
        const res = await baseUrl.post("/restaurant/signup", data);
        console.log(data)
        console.log(res.data.success);
        console.log(res.data.message);

        if (res?.data?.success === true) {
            alert(res?.data?.message);
            reset();
            router.push("/restaurant/login");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF9F3] p-6">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                {/* Left / Branding */}
                <div className="hidden md:flex flex-col items-center justify-center gap-4 p-8 bg-gradient-to-b from-white to-[#FFF9F3] border-r">
                    <div className="flex items-center gap-3">
                        <div className="relative w-20 h-20">
                            <Image src="/logo.jpeg" alt="BiteRush Logo" layout="fill" objectFit="contain" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-[#2C7A47]">BiteRush</h2>
                    </div>
                    <p className="text-center text-sm text-gray-600 px-4">
                        Register your restaurant to receive orders instantly. Fast onboarding, easy dashboard and quick payouts.
                    </p>

                    <div className="mt-4 flex items-center gap-2">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#E94E1B] text-white">Fast Delivery</span>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#FFD54A] text-[#7A4B00]">Featured</span>
                    </div>
                </div>

                {/* Right / Form */}
                <div className="p-6 md:p-10">
                    <h3 className="text-2xl font-semibold text-[#E94E1B] text-center md:text-left">Restaurant Registration</h3>
                    <p className="text-sm text-gray-500 mt-1 mb-6 text-center md:text-left">
                        Sign up your restaurant and start receiving orders through BiteRush.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Enter restaurant name"
                                {...register("restaurantName")}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E94E1B]"
                            />
                            {errors.restaurantName && <p className="text-xs text-red-500 mt-1">{errors.restaurantName.message}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Enter restaurant owner name"
                                {...register("ownerName")}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E94E1B]"
                            />
                            {errors.ownerName && <p className="text-xs text-red-500 mt-1">{errors.ownerName.message}</p>}
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Enter restaurant e-mail"
                                {...register("email")}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E94E1B]"
                            />
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Enter restaurant contact number"
                                {...register("contactNumber")}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E94E1B]"
                            />
                            {errors.contactNumber && <p className="text-xs text-red-500 mt-1">{errors.contactNumber.message}</p>}
                        </div>

                        <div>
                            <select
                                {...register("city")}
                                className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E94E1B]"
                            >
                                <option value="" disabled>Select city</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Kolkata">Kolkata</option>
                                <option value="Chennai">Chennai</option>
                            </select>
                            {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Enter full address"
                                {...register("restaurantAddress", { required: "Address is required" })}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E94E1B]"
                            />
                            {errors.restaurantAddress && <p className="text-xs text-red-500 mt-1">{errors.restaurantAddress.message}</p>}
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Enter password"
                                {...register("password")}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E94E1B]"
                            />
                            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Confirm password"
                                {...register("confirmPassword")}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E94E1B]"
                            />
                            {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>}
                        </div>

                        <div>
                            <input
                                type="submit"
                                value="Register"
                                className="w-full bg-[#2C7A47] text-white font-semibold py-3 rounded-lg hover:bg-[#25643B] transition-colors cursor-pointer"
                            />
                        </div>
                    </form>

                    <p className="text-xs text-gray-500 mt-4 text-center md:text-left">
                        By registering you agree to our <span className="text-[#E94E1B] font-medium">terms & conditions</span>.
                    </p>
                    <p className="text-center text-sm text-gray-500 mt-4">
                        Already have an account?{" "}
                        <Link href="/restaurant/login" className="text-[#E94E1B] font-medium hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp