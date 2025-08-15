"use client";
import { signIn, useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-950 text-white px-4 md:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <Link
          href={"/"}
          className="logo font-bold text-lg flex items-center gap-2"
        >
          <img
            src="/logo2.gif"
            alt="Logo"
            width={60}
            height={60}
            className="h-12 w-auto"
          />
          <span className="hidden sm:inline">ChaiThirst!</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {session && (
            <>
              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  onBlur={() =>
                    setTimeout(() => {
                      setShowDropdown(false);
                    }, 100)
                  }
                  className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 inline-flex items-center gap-2"
                >
                  Welcome {session.user.email}
                  <svg
                    className="w-2.5 h-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1 L5 5 L9 1"
                    />
                  </svg>
                </button>

                {/* Dropdown */}
                <div
                  className={`z-10 ${
                    showDropdown ? "" : "hidden"
                  } absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDividerButton"
                  >
                    <li>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${session.user.name}`}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Your Page
                      </Link>
                    </li>
                  </ul>
                  <div className="py-2">
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <button
                type="button"
                onClick={() => signOut()}
                className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Logout
              </button>
            </>
          )}

          {!session && (
            <Link href={"/login"}>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md focus:outline-none"
          >
            {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col gap-2 pb-4">
          {session && (
            <>
              <Link
                href="/dashboard"
                className="block px-4 py-2 hover:bg-gray-800 rounded-md"
              >
                Dashboard
              </Link>
              <Link
                href={`/${session.user.name}`}
                className="block px-4 py-2 hover:bg-gray-800 rounded-md"
              >
                Your Page
              </Link>
              <button
                onClick={() => signOut()}
                className="text-left px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md"
              >
                Logout
              </button>
            </>
          )}
          {!session && (
            <Link href={"/login"}>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md">
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
