"use client"

import baseUrl from "@/service/axiosInstance";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function RestaurantDashboard() {

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <main className="flex-1 flex items-start justify-center p-6 pb-0">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Branding + CTA */}
          <aside className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center shadow-sm">
                <img src="/logo.jpeg" alt="BiteRush" className="object-contain w-full h-full" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-green-800">BiteRush</h2>
                <p className="text-sm text-gray-500">verified <span className="font-medium text-gray-800">genuine foood</span></p>
              </div>
            </div>

            <div className="rounded-xl p-4 bg-green-50 border border-green-100">
              <h3 className="text-lg font-medium text-green-800">Welcome</h3>
              <p className="text-sm text-gray-600 mt-2">You're signed in. Manage orders, update the menu, and view earnings from here.</p>
              <div className="mt-4 flex gap-3">
                <button className="flex-1 py-2 rounded-lg bg-green-700 text-white font-semibold shadow hover:shadow-md">Manage Orders</button>
                <button className="py-2 px-3 rounded-lg border border-green-200 text-green-700 bg-white hover:bg-green-50">View Menu</button>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-end">
              <div className="text-xs text-gray-500">Quick links</div>
              <ul className="mt-3 grid gap-2">
                <li className="text-sm text-gray-700">• How to get verified</li>
                <li className="text-sm text-gray-700">• Pricing & Plans</li>
                <li className="text-sm text-gray-700">• Support center</li>
              </ul>
            </div>
          </aside>

          {/* Main area - Dashboard */}
          <main className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Header card */}
            <div className="col-span-1 md:col-span-2 bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Restaurant Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">You're signed in as <span className="font-medium text-gray-700">BiteRush Restaurant</span>. Below are live previews of what you can do when logged in.</p>
                <p className="mt-2 text-sm text-gray-600">If you login you can: <span className="font-semibold text-gray-800">accept/reject orders, update item availability, view earnings & payouts, and manage restaurant profile.</span></p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="mt-1 inline-flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-green-500 shadow-sm" />
                    <span className="text-sm font-medium text-gray-700">Online</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3 6 4-12 3 6h4" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Orders Card - active data */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800">Orders</h3>
              <p className="text-sm text-gray-500 mt-2">Live orders coming to your restaurant. Click "Manage Orders" to open the orders panel.</p>

              <div className="mt-4 grid grid-cols-1 gap-3">
                <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600">New orders</div>
                      <div className="text-2xl font-bold text-gray-800">3</div>
                    </div>
                    <div className="text-xs text-green-600 font-medium">Accepting</div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600">Pending</div>
                      <div className="text-2xl font-bold text-gray-800">1</div>
                    </div>
                    <div className="text-xs text-yellow-600 font-medium">Preparing</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Earnings Card */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800">Earnings</h3>
              <p className="text-sm text-gray-500 mt-2">View payouts and earnings. Connect your bank account to enable payouts.</p>
              <div className="mt-6 flex items-center gap-6">
                <div className="flex-1">
                  <div className="text-sm text-gray-600">Today</div>
                  <div className="text-2xl font-bold mt-1">₹2,450</div>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-600">This week</div>
                  <div className="text-2xl font-bold mt-1">₹14,320</div>
                </div>
              </div>
            </div>

            {/* Menu Card */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800">Menu</h3>
              <p className="text-sm text-gray-500 mt-2">Add, edit, or hide items. Click "View Menu" to open the menu editor.</p>
              <div className="mt-4 space-y-3">
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-700">Paneer Butter Masala</div>
                    <div className="text-xs text-gray-400">Main Course · ₹220</div>
                  </div>
                  <div className="text-sm text-green-600 font-medium">Available</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-700">Veg Biryani</div>
                    <div className="text-xs text-gray-400">Rice · ₹180</div>
                  </div>
                  <div className="text-sm text-red-500 font-medium">Out of stock</div>
                </div>
              </div>
            </div>

            {/* Settings & verification */}
            <div className="col-span-1 md:col-span-2 bg-white rounded-2xl shadow p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Settings & verification</h3>
                <p className="text-sm text-gray-500 mt-1">Complete verification to unlock bank payouts and advanced analytics.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="py-2 px-4 rounded-lg border border-gray-200 text-gray-700 bg-white">Connect account</button>
                <button className="py-2 px-4 rounded-lg bg-green-700 text-white font-semibold">Verify now</button>
              </div>
            </div>

          </main>
        </div>
      </main>
    </div>
  );
}
