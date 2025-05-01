"use client";
import { useState } from "react";
import { FaRegClock, FaRegCalendarAlt } from "react-icons/fa";

interface Post {
  id: number;
  title: string;
  image: string;
  date: string;
  readTime: string;
}

interface TextPost {
  id: number;
  title: string;
  date: string;
  readTime: string;
}

interface FeaturedPost {
  title: string;
  description: string;
  image: string;
  badges: string[];
  date: string;
  readTime: string;
}

const BlogSection = () => {
  const featuredPost: FeaturedPost = {
    title: "Roblox launches new ad format, strengthens partnership with Google",
    description: "",
    image: "/v1.jpeg",
    badges: ["Marketing", "Feature"],
    date: "Apr 03, 2025",
    readTime: "1 Min read",
  };

  const initialSidePosts: Post[] = [
    {
      id: 1,
      title: "Roblox launches new ad format, strengthens partnership with google",
      image: "/v2.jpeg",
      date: "Apr 03, 2025",
      readTime: "1 Min read",
    },
    {
      id: 2,
      title: "Roblox launches new ad format, strengthens partnership with google",
      image: "/v3.jpeg",
      date: "Apr 03, 2025",
      readTime: "1 Min read",
    },
    {
      id: 3,
      title: "Roblox launches new ad format, strengthens partnership with google",
      image: "/v2.jpeg",
      date: "Apr 03, 2025",
      readTime: "1 Min read",
    },
    {
      id: 4,
      title: "Roblox launches new ad format, strengthens partnership with google",
      image: "/v1.jpeg",
      date: "Apr 03, 2025",
      readTime: "1 Min read",
    },
  ];

  const initialTextPosts: TextPost[] = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet consectetur. Dolor dolor sed consequat condimentum mi. Eu iaculis.",
      date: "Apr 03, 2025",
      readTime: "1 Min read",
    },
    {
      id: 2,
      title: "Pirate ipsum arrgh bounty warp jack. Nipper sloop pinnace locker execution gaff shrouds.",
      date: "Apr 03, 2025",
      readTime: "1 Min read",
    },
    {
      id: 3,
      title: "Pizza ipsum dolor meat lovers buffalo. Peppers and deep steak pizza meatball peppers roll.",
      date: "Apr 03, 2025",
      readTime: "1 Min read",
    },
    {
      id: 4,
      title: "Potter ipsum wand elf parchment wingardium. Half-blood patronus head house 20 plums.",
      date: "Apr 03, 2025",
      readTime: "1 Min read",
    },
    {
      id: 5,
      title: "Potter ipsum wand elf parchment wingardium. Veela for stand prefect's hunt polyjuice devil's.",
      date: "Apr 03, 2025",
      readTime: "1 Min read",
    },
  ];

  const [sidePosts, setSidePosts] = useState<Post[]>(initialSidePosts);
  const [textPosts, setTextPosts] = useState<TextPost[]>(initialTextPosts);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadMoreContent = () => {
    const newSidePosts: Post[] = [
      {
        id: 5,
        title: "New post about gaming industry trends.",
        image: "/v1.jpeg",
        date: "Apr 05, 2025",
        readTime: "2 Min read",
      },
      {
        id: 6,
        title: "Roblox partnership insights: What’s next for advertisers?",
        image: "/v2.jpeg",
        date: "Apr 06, 2025",
        readTime: "3 Min read",
      },
    ];

    const newTextPosts: TextPost[] = [
      {
        id: 6,
        title: "Exploring the future of Roblox ads in gaming.",
        date: "Apr 05, 2025",
        readTime: "2 Min read",
      },
      {
        id: 7,
        title: "The impact of new ad formats on the gaming community.",
        date: "Apr 06, 2025",
        readTime: "3 Min read",
      },
    ];

    setSidePosts([...sidePosts, ...newSidePosts]);
    setTextPosts([...textPosts, ...newTextPosts]);
    setHasMore(false);
  };

  return (
    <div className="bg-[#fafafa]">
      <section className="px-4 md:px-10 py-6 cursor-pointer max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-10 flex items-center gap-2">
          <span className="h-10 w-1 bg-yellow-500 inline-block"></span>
          Latest Blogs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Left Featured Blog */}
          <div className="flex flex-col overlay:hidden group">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex gap-2 mt-4">
              {featuredPost.badges.map((badge, idx) => (
                <span key={idx} className="bg-yellow-400 text-xs font-semibold px-2 py-1 rounded">
                  {badge}
                </span>
              ))}
            </div>
            <h3 className="text-lg md:text-xl font-semibold mt-3">{featuredPost.title}</h3>
            <div className="flex items-center gap-4 text-gray-500 text-sm mt-2">
              <div className="flex items-center gap-1">
                <FaRegCalendarAlt />
                <span>{featuredPost.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaRegClock />
                <span>{featuredPost.readTime}</span>
              </div>
            </div>
          </div>

          {/* Middle Image Blogs */}
          <div className="flex flex-col gap-6">
            {sidePosts.map((post) => (
              <div key={post.id} className="flex gap-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-44 h-20 rounded-lg object-cover"
                />
                <div className="flex flex-col justify-between">
                  <h4 className="text-sm font-semibold">{post.title}</h4>
                  <div className="flex items-center gap-2 text-gray-500 text-xs mt-2">
                    <FaRegCalendarAlt />
                    <span>{post.date}</span>
                    <FaRegClock />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Text Blogs */}
          <div className="flex flex-col gap-4">
            {textPosts.map((post) => (
              <div key={post.id} className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <img src="/l1.png" alt="" className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-semibold">{post.title}</h4>
                  <div className="flex items-center gap-2 text-gray-500 text-xs mt-2">
                    <FaRegCalendarAlt />
                    <span>{post.date}</span>
                    <FaRegClock />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* View All Button */}
        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={loadMoreContent}
              className="flex items-center gap-2 border border-black px-5 py-2 rounded hover:bg-black hover:text-white transition"
            >
              View all
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogSection;
