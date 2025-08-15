'use client';
import React, { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  const providers = [
    {
      name: 'GitHub',
      color: 'bg-gray-900 hover:bg-black text-white',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 496 512">
          <path d="M165.9 397.4c0 2-2.3 3.7-5.2..."></path>
        </svg>
      ),
      onClick: () => signIn('github'),
    },
    {
      name: 'Google',
      color: 'bg-white/90 hover:bg-white text-black',
      icon: (
        <svg className="h-6 w-6" viewBox="-0.5 0 48 48">
          {/* Google icon paths */}
        </svg>
      ),
      onClick: () => signIn('google'),
    },
    {
      name: 'LinkedIn',
      color: 'bg-[#0077b5] hover:bg-[#005e93] text-white',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 448 512">
          {/* LinkedIn icon path */}
        </svg>
      ),
      onClick: () => signIn('linkedin'),
    },
    {
      name: 'Twitter',
      color: 'bg-[#1DA1F2] hover:bg-[#0d8ddb] text-white',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 512 512">
          {/* Twitter icon path */}
        </svg>
      ),
      onClick: () => signIn('twitter'),
    },
    {
      name: 'Facebook',
      color: 'bg-[#1877f2] hover:bg-[#145dbf] text-white',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 320 512">
          {/* Facebook icon path */}
        </svg>
      ),
      onClick: () => signIn('facebook'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f2937] via-[#111827] to-[#000000] flex items-center justify-center px-4 py-10 sm:py-16">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-xl border border-white/20 text-white">
        <h1 className="text-center text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8">
          Login
        </h1>

        <div className="flex flex-col gap-3 sm:gap-4">
          {providers.map((provider, index) => (
            <button
              key={index}
              className={`flex items-center justify-center gap-3 font-semibold py-2.5 sm:py-3 px-4 rounded-xl shadow transition-all duration-200 ${provider.color}`}
              onClick={provider.onClick}
            >
              {provider.icon}
              <span className="text-sm sm:text-base">
                Continue with {provider.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
