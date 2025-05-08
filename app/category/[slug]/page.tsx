import { notFound } from "next/navigation";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  description: string;
  createdAt: string;
}

interface CategoryPageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/category/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return notFound();
    }

    const data = await res.json();

    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 capitalize">
          Blogs in “{slug.replace(/-/g, " ")}”
        </h1>
        <div className="grid gap-6">
          {data.length === 0 ? (
            <p>No blogs found in this category.</p>
          ) : (
            data.map((blog: Blog) => (
              <div key={blog._id} className="border rounded-lg p-4 shadow hover:shadow-md transition">
                <Link href={`/blog/${blog.slug}`}>
                  <h2 className="text-xl font-semibold hover:text-yellow-500 transition">{blog.title}</h2>
                </Link>
                <p className="text-sm text-gray-600 mt-1">{new Date(blog.createdAt).toLocaleDateString()}</p>
                <p className="mt-2 text-gray-700">{blog.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch category blogs:", error);
    return notFound();
  }
}
