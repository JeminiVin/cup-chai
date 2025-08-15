import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-white h-auto min-h-[45vh] px-5 text-center py-10">
        <div className="font-bold flex flex-col md:flex-row gap-2 text-3xl md:text-5xl items-center">
          Buy me a chai
          <span>
            <Image src="/logo2.gif" alt="logo" width={88} height={88} />
          </span>
        </div>
        <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed">
          From masala chai to tandoori vibes, from cutting chai to elaichi elegance —
          we've got a cup for every mood and every moment.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Link href={"/login"}>
            <button className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-6 py-2.5">
              Start Here
            </button>
          </Link>
          <Link href={"/about"}>
            <button className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-6 py-2.5">
              Read More
            </button>
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="bg-white h-1 opacity-10"></div>

      {/* Milestone Tracker */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 py-16 text-white px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Help Us Brew Our Next Milestone ☕
        </h1>
        <div className="max-w-lg mx-auto">
          <div className="bg-white/20 p-4 rounded-lg shadow-md">
            <p className="mb-2">🔥 Goal: 100 Cups of Chai</p>
            <div className="w-full bg-white/30 rounded-full h-4">
              <div
                className="bg-white h-4 rounded-full"
                style={{ width: "65%" }}
              ></div>
            </div>
            <p className="mt-2">65/100 cups raised</p>
          </div>
          <div className="mt-6 flex justify-center">
            <button className="px-6 py-2 bg-white text-amber-700 font-bold rounded-lg shadow hover:bg-amber-100">
              Buy a Cup
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="bg-white h-1 opacity-10"></div>

      {/* Timeline */}
      <div className="text-white container mx-auto px-4 pb-32 pt-14">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-14">
          Our Journey ☕
        </h1>
        <ol className="relative border-l border-amber-400 max-w-2xl mx-auto">
          {[
            {
              year: "2023",
              title: "Idea Brewing",
              desc: "Late-night coding + chai breaks = the birth of our platform.",
            },
            {
              year: "2024",
              title: "Community Growth",
              desc: "Creators and chai lovers from around the world joined us.",
            },
            {
              year: "2025",
              title: "Bigger Dreams",
              desc: "Now brewing new features to connect people over chai.",
            },
          ].map((item, idx) => (
            <li key={idx} className="mb-10 ml-6">
              <div className="absolute w-3 h-3 bg-amber-400 rounded-full mt-1.5 -left-1.5"></div>
              <time className="mb-1 text-sm font-normal leading-none text-amber-200">
                {item.year}
              </time>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-base font-normal text-amber-100">{item.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
