"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full bg-[#fff9f5] shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                {/* Left: Logo */}
                <div className="flex items-center space-x-2">
                    <Image
                        src="/logo.jpeg" // rename your uploaded logo to public/biterush-logo.jpeg
                        alt="BiteRush Logo"
                        width={50}
                        height={50}
                        className="rounded-md"
                    />
                    <span className="text-2xl font-bold text-[#0b6b2d]">BiteRush</span>
                </div>

                {/* Center: Nav Links */}
                <nav className="hidden md:flex space-x-8">
                    <Link
                        href="/"
                        className="text-[#0b6b2d] hover:text-[#f54703] font-medium transition"
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className="text-[#0b6b2d] hover:text-[#f54703] font-medium transition"
                    >
                        About Us
                    </Link>
                    <Link
                        href="/contact"
                        className="text-[#0b6b2d] hover:text-[#f54703] font-medium transition"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Right: Buttons */}
                <div className="flex items-center space-x-4">
                    <Link
                        href="/register"
                        className="px-4 py-2 border border-[#f54703] text-[#f54703] rounded-xl font-medium hover:bg-[#f54703] hover:text-white transition"
                    >
                        Register
                    </Link>
                    <Link
                        href="/login"
                        className="px-4 py-2 bg-[#0b6b2d] text-white rounded-xl font-medium hover:bg-[#094b20] transition"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </header>
    );
}

