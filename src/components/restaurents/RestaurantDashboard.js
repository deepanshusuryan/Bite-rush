"use client"
import baseUrl from "@/service/axiosInstance";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function RestaurantDashboard() {
    const [id, setRestaurantID] = useState();
    const [restaurantDetail, setRestaurantDetail] = useState({
        restaurantName: "",
        ownerName: ""
    });

    const restaurant = async () => {
        const res = await baseUrl.get("/restaurant/details");
        setRestaurantDetail(res.data.restaurant);
        setRestaurantID(res.data.restaurant._id);
    }
    useEffect(() => {
        restaurant();
    }, [])
    const stats = [
        { id: 1, title: "Total Orders", value: "1,248" },
        { id: 2, title: "Today's Revenue", value: "₹12,450" },
        { id: 3, title: "Active Items", value: "86" },
        { id: 4, title: "Rating", value: "4.6 ⭐" },
    ];

    const recentOrders = [
        { id: "ORD-1023", customer: "Aman", items: 3, total: "₹450", status: "Delivered" },
        { id: "ORD-1024", customer: "Priya", items: 1, total: "₹199", status: "On the way" },
        { id: "ORD-1025", customer: "Rahul", items: 2, total: "₹320", status: "Preparing" },
    ];
    const [foodItem, setFoodItem] = useState([]);

    const foodItems = async () => {
        if (!id) return;

        try {
            const response = await baseUrl.get(`/restaurant/food?restaurantID=${id}`);

            setFoodItem(response?.data?.food);

        } catch (error) {
            console.error('Error fetching foods:', error);
            setError(error.message);
        }
    };

    useEffect(() => {
        foodItems();
    }, [id]);
    const deleteFood = async (id) => {
        const res = await baseUrl.delete(`/restaurant/food/${id}`);
        if (res?.data?.success) {
            alert(res?.data?.message);
            foodItems();
        }
    }
    console.log("foodItem", foodItem)
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <div className="flex">
                {/* Sidebar */}
                <aside className="w-72 bg-white border-r border-gray-200 min-h-screen p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold">BR</div>
                        <div>
                            <h1 className="text-lg font-semibold">{restaurantDetail.restaurantName}</h1>
                            <p className="text-sm text-gray-500">by {restaurantDetail.ownerName}</p>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        <a href="#" className="block px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-900">Dashboard</a>
                        <a href="#" className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Orders</a>
                        <a href="#" className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Add Food</a>
                        <a href="#" className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Manage Food</a>
                        <a href="#" className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Menu</a>
                        <a href="#" className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Analytics</a>
                        <a href="#" className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Settings</a>
                        <a href="#" className="block px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50">Logout</a>
                    </nav>

                    <div className="mt-8 text-xs text-gray-500">
                        <p>Plan: <span className="font-medium text-gray-900">Standard</span></p>
                        <p className="mt-2">Open hours: <span className="font-medium">10:00 - 22:00</span></p>
                    </div>
                </aside>

                {/* Main content */}
                <main className="flex-1 p-8">
                    {/* Top bar */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-semibold">Hello, {restaurantDetail.ownerName}</h2>
                            <p className="text-sm text-gray-500">Here’s what’s happening with your restaurant today.</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <input placeholder="Search orders or items" className="w-80 rounded-lg border border-gray-200 px-4 py-2 text-sm bg-white" />
                                <div className="absolute right-3 top-2 text-gray-400 text-sm">⌕</div>
                            </div>

                            <button className="px-4 py-2 border rounded-lg text-sm">🔔</button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        {stats.map((s) => (
                            <div key={s.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                                <div className="text-xs text-gray-500">{s.title}</div>
                                <div className="mt-2 text-xl font-semibold">{s.value}</div>
                                <div className="mt-3 text-sm text-gray-400">Compared to last week</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recent Orders */}
                        <section className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Recent Orders</h3>
                                <a href="#" className="text-sm text-indigo-600">View all</a>
                            </div>

                            <div className="space-y-4">
                                {recentOrders.map((o) => (
                                    <div key={o.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                                        <div>
                                            <div className="text-sm font-medium">{o.id} • {o.customer}</div>
                                            <div className="text-xs text-gray-500">{o.items} items</div>
                                        </div>

                                        <div className="text-right">
                                            <div className="text-sm font-semibold">{o.total}</div>
                                            <div className="text-xs text-gray-500">{o.status}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Menu preview */}
                        <aside className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Menu Preview</h3>
                                <a href="#" className="text-sm text-indigo-600">Manage</a>
                            </div>

                            <div className="space-y-3">
                                {foodItem.map((m, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-sm">Img</div>
                                            <div>
                                                <div className="text-sm font-medium">{m.foodName}</div>
                                                <div className="text-xs text-gray-500">Category • 10-15 min</div>
                                            </div>
                                        </div>

                                        <div className="text-sm font-medium">₹{m.foodPrice}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6">
                                <h4 className="text-sm text-gray-500 mb-2">Featured</h4>
                                <div className="rounded-lg border border-gray-100 p-3 text-sm text-gray-700">Add promos, featured items or banners here (design placeholder)</div>
                            </div>
                        </aside>
                    </div>

                    {/* Food gallery / Manage Food visuals */}
                    <section className="mt-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Food Items</h3>
                            <div className="flex items-center gap-3">
                                <Link href="/restaurant/dashboard/addfood" className="px-4 py-2 bg-[#0b6b2d] text-white rounded-xl font-medium hover:bg-[#094b20] transition">Add Food Item</Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {foodItem.map((item) => (
                                <div key={item._id || item.foodName} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                                    {/* image wrapper: fixed height, hide overflow, center */}
                                    <div className="w-full h-36 rounded-lg bg-gray-100 flex items-center justify-center mb-3 overflow-hidden">
                                        <img
                                            src={item.foodImage || '/images/placeholder-food.png'}
                                            alt={item.foodName || 'food'}
                                            loading="lazy"
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/placeholder-food.png'; }}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">{item.foodName}</div>
                                            <div className="text-xs text-gray-500">Veg • 250 g</div>
                                        </div>
                                        <div className="text-sm font-semibold">₹{item.foodPrice}</div>
                                    </div>
                                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
                                        <button className="px-3 py-1 border rounded-full">Edit</button>
                                        <button onClick={() => deleteFood(item._id)} className="px-3 py-1 border rounded-full">Delete</button>
                                        <button className="px-3 py-1 border rounded-full">Toggle</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
