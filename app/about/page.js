// pages/about.js
import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex flex-col">
      
      {/* About Section */}
      <main className="flex-1 px-6 py-12 flex flex-col items-center text-center">
        <h2 className="text-5xl font-extrabold text-amber-900 mb-4">
          About Get Me a Chai ☕
        </h2>
        <p className="text-lg text-amber-700 max-w-2xl mb-8">
          At <span className="font-semibold">Get Me a Chai</span>, we’re brewing more than tea —
          we’re brewing connections. Whether you're a creator, a supporter, or
          simply someone who loves a good cup of chai, this is your place to
          connect, share, and grow.
        </p>

        {/* Illustration */}
        <div className="relative w-48 h-48 mb-10">
          <img
            src="/cup.gif"
            alt="Chai Cup"
            className="w-full h-full object-contain animate-bounce-slow"
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-t from-transparent to-amber-200 rounded-full blur-2xl opacity-50 animate-pulse"></div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-amber-800 mb-2">Our Mission</h3>
            <p className="text-amber-700">
              Empower creators by giving their supporters an easy way to say
              “thank you” with a warm cup of chai.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-amber-800 mb-2">Our Story</h3>
            <p className="text-amber-700">
              Born from late-night coding sessions and chai breaks, our
              platform blends creativity with generosity.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-amber-800 mb-2">Our Community</h3>
            <p className="text-amber-700">
              A growing family of creators and chai lovers who inspire each
              other every day.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;

export const metadata = {
  title: "More Than Tea — We’re Brewing Connections ☕"
}
