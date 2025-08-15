"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, updateProfile } from "@/actions/useractions";

const Dashboard = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({});

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      getData();
    }
  }, [session]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    let u = await fetchuser(session.user.name);
    setForm(u);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    update();
    await updateProfile(e, session.user.name);
    alert("Profile updated");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <h1 className="text-center my-5 text-2xl sm:text-3xl font-bold">
        Dashboard
      </h1>

      <form
        className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8"
        onSubmit={handleSubmit}
      >
        {[
          { label: "Name", name: "name", placeholder: "Enter your name" },
          { label: "Email", name: "email", placeholder: "Enter your email" },
          {
            label: "Username",
            name: "username",
            placeholder: "Enter your username",
          },
          {
            label: "Profile Picture",
            name: "profilepic",
            placeholder: "Place your profile photo",
          },
          {
            label: "Cover Picture",
            name: "coverpic",
            placeholder: "Place your cover photo",
          },
          {
            label: "Razorpay ID",
            name: "razorpayid",
            placeholder: "Razorpay credentials",
          },
          {
            label: "Razorpay Secret",
            name: "razorpaysecret",
            placeholder: "Razorpay credentials",
          },
        ].map((field) => (
          <div className="my-3" key={field.name}>
            <label
              htmlFor={field.name}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {field.label}
            </label>
            <input
              value={form[field.name] || ""}
              onChange={handleChange}
              type="text"
              name={field.name}
              id={field.name}
              className="block w-full p-2 sm:p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm 
                focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={field.placeholder}
            />
          </div>
        ))}

        <div className="my-6">
          <button
            type="submit"
            className="block w-full p-2 sm:p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 
              focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm sm:text-base"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
