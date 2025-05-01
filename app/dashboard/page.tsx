import { BlogEditor } from "@/components/blog-editor"

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Blog Dashboard</h1>
        <p className="text-muted-foreground">Manage your blog posts, categories, and media.</p>
      </div>
      <BlogEditor />
    </div>
  )
}
