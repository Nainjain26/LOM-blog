"use client";

import { FaRegClock, FaRegCalendarAlt } from "react-icons/fa";
import Link from "next/link";

interface Post {
  id: number;
  href: string;
  title: string;
  description?: string;
  image: string;
  date: string;
  readTime: string;
  badge?: string;
}

const SearchSection = () => {
  const posts: Post[] = [
    {
      id: 1,
      href: "/BlogPage",
      title: "X faces $1 billion fine from EU over DSA violations",
      description:
        "The action stems from an investigation launched in 2023 into X’s content moderation practices, particularly in relation to the spread of disinformation and illegal content on the platform.",
      image: "/blog.jpeg",
      date: "Apr 05, 2025",
      readTime: "1 Min read",
      badge: "Top Trending",
    },
    {
      id: 2,
      href: "/blog2",
      title: "Spotify debuts generative AI tools & new ad exchange platform",
      image: "/blog2.jpeg",
      date: "Apr 05, 2025",
      readTime: "1 Min read",
    },
    {
      id: 3,
      href: "/blog3",
      title: "Roblox launches new ad format, strengthens partnership with Google",
      image: "/blog.jpeg",
      date: "Apr 05, 2025",
      readTime: "1 Min read",
    },
  ];

  return (
    <main className="px-4 md:px-10 py-6 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left Big Card */}
        <Link
          href={posts[0].href}
          className="relative h-[500px] md:col-span-2 rounded-lg overflow-hidden group"
        >
          <img
            src={posts[0].image}
            alt={posts[0].title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          {/* Badge */}
          {posts[0].badge && (
            <div className="absolute top-3 left-1 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
              {posts[0].badge}
            </div>
          )}

          {/* Content */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-3">{posts[0].title}</h1>
            <p className="text-gray-200 text-sm mb-5">{posts[0].description}</p>
            <div className="flex items-center text-xs gap-4 text-gray-200">
              <div className="flex items-center gap-1">
                <FaRegCalendarAlt />
                <span>{posts[0].date}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaRegClock />
                <span>{posts[0].readTime}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Right Two Small Cards */}
        <div className="flex flex-col gap-6">
          {posts.slice(1).map((post) => (
            <Link
              key={post.id}
              href={post.href}
              className="relative h-[240px] rounded-lg overflow-hidden group"
            >
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>

              {/* Content */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                <div className="flex items-center text-xs gap-4 text-gray-200">
                  <div className="flex items-center gap-1">
                    <FaRegCalendarAlt />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaRegClock />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
};

export default SearchSection;
