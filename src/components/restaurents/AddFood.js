"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import baseUrl from "@/service/axiosInstance";

function AddFood() {
    const [restaurantID, setRestaurantID] = useState();

    const restaurant = async () => {
        const res = await baseUrl.get("/restaurant/details");
        setRestaurantID(res?.data?.restaurant?._id);
    };

    useEffect(() => {
        restaurant();
    }, []);

    const [addFood, setAddFood] = useState({
        foodName: "",
        foodPrice: "",
        foodImage: "",
    });

    const food = async () => {
        const payload = { ...addFood, restaurantID };
        const res = await baseUrl.post("/restaurant/food", payload);
        if (res?.data?.success) {
            alert(res?.data?.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        food();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fff9f4] p-6">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
                <h1 className="text-2xl font-bold text-[#0f6b3a] mb-6 text-center">
                    Add Food Item
                </h1>

                {/* AddFood Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <input
                            type="text"
                            placeholder="Enter food name"
                            value={addFood.foodName}
                            onChange={(e) =>
                                setAddFood({ ...addFood, foodName: e.target.value })
                            }
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#f54703] outline-none"
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Enter food price"
                            value={addFood.foodPrice}
                            onChange={(e) =>
                                setAddFood({ ...addFood, foodPrice: e.target.value })
                            }
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#f54703] outline-none"
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Enter image URL"
                            value={addFood.foodImage}
                            onChange={(e) =>
                                setAddFood({ ...addFood, foodImage: e.target.value })
                            }
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#f54703] outline-none"
                        />
                    </div>

                    <div>
                        <input
                            type="submit"
                            value="Add Food"
                            className="w-full bg-[#f54703] text-white rounded-lg p-2 cursor-pointer font-medium hover:bg-[#e03f00]"
                        />
                    </div>
                </form>

                {/* Link to Dashboard */}
                <div className="text-center mt-6">
                    <Link
                        href={`/restaurant/dashboard/${restaurantID}`}
                        className="text-[#0f6b3a] font-medium hover:underline"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AddFood;
