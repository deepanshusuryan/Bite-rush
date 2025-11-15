"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import baseUrl from "@/service/axiosInstance";


export default function Header() {

  const router = useRouter();

  const [IsLoggedin, setIsLoggedin] = useState(false);
  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      setIsLoggedin(true);
    }
  }, [])

  const logout = async () => {
    try {
      await baseUrl.get("/restaurant/logout", { withCredentials: true });
      Cookies.remove("accessToken", { path: "/" });
      setIsLoggedin(false);
      router.push("/restaurant/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <header className="w-full bg-[#fff9f5] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <Image src="/logo.jpeg" alt="BiteRush Logo" width={50} height={50} className="rounded-md" />
          <span className="text-2xl font-bold text-[#0b6b2d]">BiteRush</span>
        </div>

        {/* Center: Nav Links */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-[#0b6b2d] hover:text-[#f54703] font-medium transition">
            Home
          </Link>
          <Link href="/about" className="text-[#0b6b2d] hover:text-[#f54703] font-medium transition">
            About Us
          </Link>
          <Link href="/contact" className="text-[#0b6b2d] hover:text-[#f54703] font-medium transition">
            Contact
          </Link>
        </nav>

        {/* Right: Buttons */}
        {IsLoggedin ? (<div className="flex items-center space-x-4">
          <button
            onClick={logout}
            className="px-4 py-2 border border-[#f54703] text-[#f54703] rounded-xl font-medium hover:bg-[#f54703] hover:text-white transition"
          >
            Logout
          </button>
        </div>) : (<div className="flex items-center space-x-4">
          <Link
            href="/restaurant/signup"
            className="px-4 py-2 border border-[#f54703] text-[#f54703] rounded-xl font-medium hover:bg-[#f54703] hover:text-white transition"
          >
            Register
          </Link>
          <Link
            href="/restaurant/login"
            className="px-4 py-2 bg-[#0b6b2d] text-white rounded-xl font-medium hover:bg-[#094b20] transition"
          >
            Login
          </Link>
        </div>)}
      </div>
    </header>
  );
}