"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { useSession, signIn, signOut } from "next-auth/react";
import { fetchuser, fetchpayments, initiate } from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { useSearchParams, useRouter, notFound } from "next/navigation";

const PaymentPage = ({ username }) => {
    const { data: session, update } = useSession();
    const [paymentform, setpaymentform] = useState({
        name: "",
        message: "",
        amount: "",
    });
    const [currentUser, setcurrentUser] = useState({});
    const [payments, setPayments] = useState([]);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        getData();
        if (!session) {
            router.push("/login");
        }
    }, [router, session]);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (searchParams.get("paymentdone") === "true") {
            toast("Payment has been made", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        router.push(`/${username}`);
    }, []);

    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
    };

    const getData = async () => {
        try {
            let u = await fetchuser(username);
            setcurrentUser(u);
            let dbpayments = await fetchpayments(username);
            setPayments(dbpayments);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    const pay = async (amount) => {
        try {
            if (!paymentform.name || !paymentform.amount) {
                alert("Please fill in your name and amount");
                return;
            }

            if (!amount || isNaN(amount) || amount <= 0) {
                alert("Please enter a valid payment amount");
                return;
            }

            const orderResponse = await initiate(amount, username, paymentform);

            if (!orderResponse || !orderResponse.id) {
                alert("Unable to create payment order. Please try again.");
                return;
            }

            const options = {
                key: process.env.NEXT_PUBLIC_KEY || currentUser.razorpayid,
                amount: amount,
                currency: "INR",
                name: "Chai High",
                description:
                    "Elevate your day with every sip – handcrafted chai that warms your soul.",
                image: "https://example.com/your_logo",
                order_id: orderResponse.id,
                callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
                prefill: {
                    name: paymentform.name || "",
                    email: paymentform.email || "test@example.com",
                    contact: paymentform.contact || "9999999999",
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            if (!options.key) {
                alert("Payment key not configured. Please contact support.");
                return;
            }

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            alert("Payment failed. Check console for details.");
        }
    };

    return (
        <>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
            />

            <div className="bg-gradient-to-b from-black via-purple-900 to-black min-h-screen">
                {/* Cover image */}
                <div className="relative w-full">
                    <img
                        className="object-cover w-full h-[350px]"
                        src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/18.gif?token-hash=Mh-B5X0fAjX72C_3Ggf-nQMUUe4b4Os4Y0qll01wqq4%3D&amp;token-time=1756944000"
                        alt=""
                    />
                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 border-black border-2 rounded-full overflow-hidden w-24 h-24 sm:w-32 sm:h-32">
                        <img
                            className="object-cover w-full h-full"
                            src={currentUser.profilepic}
                            alt="profile"
                        />
                    </div>
                </div>

                {/* Info section */}
                <div className="flex flex-col items-center pt-24 pb-10 gap-2 text-white text-center px-4">
                    <span className="font-semibold">@{username}</span>
                    <div className="text-slate-400">
                        Let&apos;s help {username} get a chai
                    </div>
                    <div className="text-slate-400 text-sm sm:text-base">
                        {payments.length} Payments • {currentUser.name} is raising funds for
                        a chai. Let&apos;s help reach the goal!
                    </div>

                    {/* Payment and supporters */}
                    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mt-10 px-4">
                        {/* Supporters List */}
                        <div className="bg-slate-500 rounded-lg text-white p-6 flex-1 min-w-[280px]">
                            <h2 className="text-lg font-bold text-center mb-4">Supporters</h2>
                            <ul className="text-sm sm:text-base space-y-3">
                                {payments.length === 0 && <li>No payments yet</li>}
                                {payments.map((p, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <img
                                            width={33}
                                            height={22}
                                            src="/avatar.gif"
                                            alt="user avatar"
                                        />
                                        <span>
                                            {p.name} donated{" "}
                                            <span className="font-bold">₹{p.amount}</span> {p.message}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Payment Form */}
                        <div className="bg-slate-500 rounded-lg text-white p-6 flex-1 min-w-[280px]">
                            <h2 className="text-2xl font-bold mb-4">Make a Payment</h2>
                            <div className="flex flex-col gap-3">
                                <input
                                    onChange={handleChange}
                                    value={paymentform.name || ""}
                                    type="text"
                                    name="name"
                                    className="w-full p-3 rounded-lg bg-slate-800"
                                    placeholder="Enter name"
                                />
                                <input
                                    onChange={handleChange}
                                    name="message"
                                    value={paymentform.message || ""}
                                    type="text"
                                    className="w-full p-3 rounded-lg bg-slate-800"
                                    placeholder="Enter message"
                                />
                                <input
                                    onChange={handleChange}
                                    name="amount"
                                    value={paymentform.amount || ""}
                                    type="number"
                                    className="w-full p-3 rounded-lg bg-slate-800"
                                    placeholder="Enter amount"
                                />

                                <button
                                    onClick={() => pay(Number.parseInt(paymentform.amount))}
                                    type="button"
                                    className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5"
                                    disabled={
                                        paymentform.name?.length < 3 ||
                                        paymentform.message?.length < 4 ||
                                        paymentform.amount?.length < 1
                                    }
                                >
                                    Pay
                                </button>
                            </div>

                            {/* Quick amount buttons */}
                            <div className="flex flex-wrap gap-2 mt-5">
                                {[10, 20, 30].map((amt) => (
                                    <button
                                        key={amt}
                                        className="bg-slate-800 p-3 rounded-lg flex-1 min-w-[80px]"
                                        onClick={() => pay(amt)}
                                    >
                                        Pay -₹{amt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentPage;
