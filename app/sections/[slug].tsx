// pages/sections/[slug].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  slug: string;
  mainImage?: string;
}

export default function sectionsPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 6;

  const fetchBlogs = async (pageNum: number, append = false) => {
    try {
      const res = await fetch(`/api/blogs?sectionss=${slug}&page=${pageNum}&limit=${LIMIT}`);
      const data = await res.json();
      if (data.length < LIMIT) setHasMore(false);
      if (append) {
        setBlogs((prev) => [...prev, ...data]);
      } else {
        setBlogs(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      setLoading(true);
      setPage(1);
      setHasMore(true);
      fetchBlogs(1);
    }
  }, [slug]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBlogs(nextPage, true);
  };

  const formatSlug = (s: string | string[] | undefined) => {
    if (!s) return "";
    return (Array.isArray(s) ? s[0] : s).replace(/-/g, " ");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold capitalize mb-6 text-yellow-500 border-b pb-2">
        {formatSlug(slug)}
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-gray-500">No blogs found in this section.</p>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Link
                href={`/blog/${blog.slug}`}
                key={blog._id}
                className="border rounded-lg shadow-md hover:shadow-xl transition duration-300 bg-white overflow-hidden group"
              >
                {blog.mainImage && (
                  <img
                    src={blog.mainImage}
                    alt={blog.title}
                    className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-black mb-1 group-hover:text-yellow-600">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3">{blog.description}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
