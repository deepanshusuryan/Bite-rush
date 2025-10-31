import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0b6b2d] text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
        {/* Logo & About */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Image
              src="/logo.jpeg"
              alt="BiteRush Logo"
              width={40}
              height={40}
              className="rounded-md"
            />
            <span className="text-2xl font-bold text-[#facc15]">BiteRush</span>
          </div>
          <p className="text-sm text-gray-200 leading-6">
            BiteRush delivers your favorite meals hot and fresh, right to your
            doorstep. Fast, reliable, and delicious — every time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#facc15]">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-200">
            <li><Link href="/" className="hover:text-[#f54703]">Home</Link></li>
            <li><Link href="/about" className="hover:text-[#f54703]">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-[#f54703]">Contact</Link></li>
            <li><Link href="/restaurants" className="hover:text-[#f54703]">Restaurants</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#facc15]">
            Support
          </h3>
          <ul className="space-y-2 text-gray-200">
            <li><Link href="/help" className="hover:text-[#f54703]">Help Center</Link></li>
            <li><Link href="/terms" className="hover:text-[#f54703]">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-[#f54703]">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#facc15]">
            Contact Us
          </h3>
          <div className="flex items-center space-x-3 mb-2">
            <Image src="/footer-icons/location.png" alt="Location" width={20} height={20} />
            <p className="text-gray-200 text-sm">New Delhi, India</p>
          </div>
          <div className="flex items-center space-x-3 mb-2">
            <Image src="/footer-icons/phone.png" alt="Phone" width={20} height={20} />
            <p className="text-gray-200 text-sm">+91 11111 00000</p>
          </div>
          <div className="flex items-center space-x-3">
            <Image src="/footer-icons/email.png" alt="Email" width={20} height={20} />
            <p className="text-gray-200 text-sm">support@biterush.com</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#facc15]/30 py-4 text-center text-sm text-gray-200">
        © {new Date().getFullYear()}{" "}
        <span className="text-[#facc15] font-semibold">BiteRush</span>. All rights reserved.
      </div>
    </footer>
  );
}

