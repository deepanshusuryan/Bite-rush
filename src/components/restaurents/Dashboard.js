"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Dashboard() {
  const router=useRouter();
  
  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      router.push("/restaurant/login");
    }
  }, [router]);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Welcome to Restaurant Dashboard 🍴</h2>
      <p>Here you can manage your orders, menu, and profile.</p>
    </div>
  );
}

export default Dashboard;