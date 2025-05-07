import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface Blog {
  _id: string
  mainTitle: string
  metaTitle: string
  metaDescription: string
  category: string
  author: string
  content: string
  additionalTitlesDescriptions: { id: string; title: string; description: string }[]
  images: { id: string; url: string }[]
  tags: string[]
  publishedAt: string
}

export default function CategoryPage() {
  const router = useRouter()
  const { category } = router.query
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (category) {
      async function fetchBlogs() {
        try {
          const response = await fetch(`/api/blogs?category=${category}`)
          const data = await response.json()
          setBlogs(data)
        } catch (error) {
          console.error("Failed to fetch blogs:", error)
        } finally {
          setLoading(false)
        }
      }
      fetchBlogs()
    }
  }, [category])

  if (loading) {
    return <div className="text-center py-10">Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{category} Blogs</h1>
      {blogs.length === 0 ? (
        <p>No blogs found in this category.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Card key={blog._id} className="border-2 border-yellow-500">
              <CardHeader>
                <CardTitle>{blog.mainTitle}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Badge className="bg-yellow-500 text-black">{blog.category}</Badge>
                  <span>By {blog.author}</span>
                  <span>•</span>
                  <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                </div>
              </CardHeader>
              <CardContent>
                {blog.images[0] && (
                  <Image
                    src={blog.images[0].url}
                    alt={blog.mainTitle}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                )}
                <p className="text-gray-700 line-clamp-3">{blog.metaDescription}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {blog.tags.map((tag) => (
                    <Badge key={tag} className="bg-black text-yellow-500">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}