"use client";

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

// Define types for post data
interface Post {
  title: string;
  image: string;
  date: string;
  readTime: string;
  tag: string;
  tag2: string;
}

// Example post data
const postsData: Post[] = [
  {
    title: "Spotify debuts generative AI tools & new ad exchange platform",
    image: "/s3.jpeg",
    date: "Apr 25, 2025",
    readTime: "5 min read",
    tag: "Beverage",
    tag2: "features",
  },
  {
    title: "Roblox launches new ad format, strengthens partnership with Google",
    image: "/s6.jpeg",
    date: "Apr 26, 2025",
    readTime: "4 min read",
    tag: "Gaming",
    tag2: "features",
  },
  {
    "title": "Burger King revamps visual identity to appeal to younger consumers",
    "image": "/s5.jpeg",
    "date": "Apr 24, 2025",
    "readTime": "3 min read",
    "tag": "Food",
    "tag2": "features"
  },
  {
    "title": "Meta showcases mixed-reality experiences in latest campaign",
    "image": "/s2.jpeg",
    "date": "Apr 23, 2025",
    "readTime": "4 min read",
    "tag": "Tech","tag2": "features"
  },
  {
    "title": "Nike partners with athletes to drive engagement via short-form content",
    "image": "/s7.jpeg",
    "date": "Apr 22, 2025",
    "readTime": "2 min read",
    "tag": "Fashion","tag2": "features"
  },
  {
    "title": "YouTube expands ad solutions for creators and brands",
    "image": "/s4.jpeg",
    "date": "Apr 21, 2025",
    "readTime": "3 min read",
    "tag": "Video","tag2": "features"
  },
  {
    "title": "Starbucks uses storytelling in short-form digital campaigns",
    "image": "/s6.jpeg",
    "date": "Apr 20, 2025",
    "readTime": "3 min read",
    "tag": "Beverage","tag2": "features"
  },
  {
    "title": "Meta showcases mixed-reality experiences in latest campaign",
    "image": "/s1.jpeg",
    "date": "Apr 23, 2025",
    "readTime": "4 min read",
    "tag": "Tech","tag2": "features"
  },
  {
    "title": "Nike partners with athletes to drive engagement via short-form content",
    "image": "/s4.jpeg",
    "date": "Apr 22, 2025",
    "readTime": "2 min read",
    "tag": "Fashion","tag2": "features"
  },
  {
    "title": "YouTube expands ad solutions for creators and brands",
    "image": "/s3.jpeg",
    "date": "Apr 21, 2025",
    "readTime": "3 min read",
    "tag": "Video","tag2": "features"
  },
  {
    "title": "Starbucks uses storytelling in short-form digital campaigns",
    "image": "/s7.jpeg",
    "date": "Apr 20, 2025",
    "readTime": "3 min read",
    "tag": "Beverage","tag2": "features"
  },
  {
    "title": "Meta showcases mixed-reality experiences in latest campaign",
    "image": "/s5.jpeg",
    "date": "Apr 23, 2025",
    "readTime": "4 min read",
    "tag": "Tech","tag2": "features"
  },
  {
    "title": "Nike partners with athletes to drive engagement via short-form content",
    "image": "/s1.jpeg",
    "date": "Apr 22, 2025",
    "readTime": "2 min read",
    "tag": "Fashion","tag2": "features"
  },
  {
    "title": "YouTube expands ad solutions for creators and brands",
    "image": "/s5.jpeg",
    "date": "Apr 21, 2025",
    "readTime": "3 min read",
    "tag": "Video","tag2": "features"
  },
  {
    "title": "Starbucks uses storytelling in short-form digital campaigns",
    "image": "https://via.placeholder.com/300x200?text=Starbucks",
    "date": "Apr 20, 2025",
    "readTime": "3 min read",
    "tag": "Beverage","tag2": "features"
  },
  {
    "title": "Meta showcases mixed-reality experiences in latest campaign",
    "image": "https://via.placeholder.com/300x200?text=Meta",
    "date": "Apr 23, 2025",
    "readTime": "4 min read",
    "tag": "Tech","tag2": "features"
  },
  {
    "title": "Nike partners with athletes to drive engagement via short-form content",
    "image": "https://via.placeholder.com/300x200?text=Nike",
    "date": "Apr 22, 2025",
    "readTime": "2 min read",
    "tag": "Fashion","tag2": "features"
  },
  {
    "title": "YouTube expands ad solutions for creators and brands",
    "image": "https://via.placeholder.com/300x200?text=YouTube",
    "date": "Apr 21, 2025",
    "readTime": "3 min read",
    "tag": "Video","tag2": "features"
  },
  {
    "title": "Starbucks uses storytelling in short-form digital campaigns",
    "image": "https://via.placeholder.com/300x200?text=Starbucks",
    "date": "Apr 20, 2025",
    "readTime": "3 min read",
    "tag": "Beverage",
    "tag2": "features"
  },
  {
    "title": "Netflix launches teaser-heavy global campaign for new season",
    "image": "https://via.placeholder.com/300x200?text=Netflix",
    "date": "Apr 19, 2025",
    "readTime": "4 min read",
    "tag": "Entertainment","tag2": "features"
  },
  {
    "title": "L’Oréal leverages AR to enhance digital try-on experience",
    "image": "https://via.placeholder.com/300x200?text=L%E2%80%99Or%C3%A9al",
    "date": "Apr 18, 2025",
    "readTime": "2 min read",
    "tag": "Beauty","tag2": "features"
  },
  {
    "title": "Apple’s Earth Day campaign highlights sustainability progress",
    "image": "https://via.placeholder.com/300x200?text=Apple",
    "date": "Apr 17, 2025",
    "readTime": "3 min read",
    "tag": "Tech","tag2": "features"
  }
];

const CampaignUpdates: React.FC = () => {
  const [visiblePosts, setVisiblePosts] = useState(18);

  const loadMorePosts = () => {
    setVisiblePosts((prev) => prev + 4);
  };

  const featuredPosts = postsData.slice(0, 2);
  const otherPosts = postsData.slice(2, visiblePosts);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <Helmet>
        <title>Campaign Updates - Brand Strategies & Ad Trends</title>
        <meta
          name="description"
          content="Discover the latest brand campaigns, creative strategies, and advertising trends across various industries."
        />
      </Helmet>

      <h1 className="text-3xl font-bold text-center mt-6 mb-2">Campaign Updates</h1>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Discover the latest brand campaigns, creative strategies, and marketing trends making waves across industries.
      </p>

      {/* Featured Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {featuredPosts.map((post, idx) => (
          <div key={idx} className="relative rounded-xl overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4">
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-sm">{post.date} • {post.readTime}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {otherPosts.map((post, idx) => (
          <div key={idx} className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition">
            <img src={post.image} alt={post.title} className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300" />
            <div className="p-3">
              <span className="bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">
                {post.tag}
              </span>
              <span className="bg-yellow-400 ml-2 text-black text-xs font-semibold px-2 py-1 rounded">
                {post.tag2}
              </span>
              <h3 className="mt-2 text-sm font-bold leading-tight line-clamp-2">{post.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{post.date} • {post.readTime}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visiblePosts < postsData.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={loadMorePosts}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CampaignUpdates;
