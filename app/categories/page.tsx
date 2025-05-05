"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Edit, Check, X, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Category {
  id: string
  name: string
  blogCount: number
  status: "published" | "draft"
}

export default function CategoryManagementPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Technology", blogCount: 12, status: "published" },
    { id: "2", name: "Marketing", blogCount: 8, status: "published" },
    { id: "3", name: "Design", blogCount: 5, status: "draft" },
    { id: "4", name: "Development", blogCount: 15, status: "published" },
    { id: "5", name: "Business", blogCount: 7, status: "published" },
  ])
  const [newCategory, setNewCategory] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([
        ...categories,
        {
          id: Date.now().toString(),
          name: newCategory.trim(),
          blogCount: 0,
          status: "draft",
        },
      ])
      setNewCategory("")
    }
  }

  const handleEdit = (category: Category) => {
    setEditingId(category.id)
    setEditValue(category.name)
  }

  const handleSaveEdit = (id: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, name: editValue.trim() } : cat
      )
    )
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  const toggleStatus = (id: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id
          ? {
              ...cat,
              status: cat.status === "published" ? "draft" : "published",
            }
          : cat
      )
    )
  }

  const handleSelectCategory = (categoryName: string) => {
    // This would typically set the category in your form state
    // For now, we'll just pass it back via URL
    router.push(`/dashboard/blog-editor?category=${encodeURIComponent(categoryName)}`)
  }

  return (
   // Wrap your main content in a responsive container
<div className="container mx-auto px-4 py-6 sm:py-8">
  <Card className="border-2 border-yellow-500 shadow-lg">
    <CardHeader className="bg-black text-yellow-500 px-4 py-3 sm:py-4 border-b-2 border-yellow-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <Link href="/dashboard" passHref>
          <Button variant="ghost" className="text-yellow-500 hover:bg-white text-sm sm:text-base">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Editor
          </Button>
        </Link>
        <CardTitle className="text-lg sm:text-xl text-center sm:text-left">Category Management</CardTitle>
        <div className="w-full sm:w-8" /> {/* spacer */}
      </div>
    </CardHeader>
    <CardContent className="p-4 sm:p-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Create New Category */}
        <div className="md:col-span-1">
          <Card className="border-2 border-black h-full">
            <CardHeader className="bg-yellow-50 px-4 py-3 border-b-2 border-black">
              <h3 className="font-bold text-base sm:text-lg">Create New Category</h3>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <Input
                  placeholder="Category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="border-2 border-black focus:border-yellow-500"
                />
                <Button
                  onClick={handleAddCategory}
                  className="w-full bg-black text-yellow-500 hover:bg-yellow-500 hover:text-black text-sm sm:text-base"
                  disabled={!newCategory.trim()}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All Categories List */}
        <div className="md:col-span-2">
          <Card className="border-2 border-black h-full">
            <CardHeader className="bg-yellow-50 px-4 py-3 border-b-2 border-black">
              <h3 className="font-bold text-base sm:text-lg">All Categories</h3>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {categories.length === 0 ? (
                  <p className="text-gray-500 text-center py-4 text-sm sm:text-base">
                    No categories found. Create your first category!
                  </p>
                ) : (
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border-2 border-black rounded-md hover:bg-yellow-50 gap-4"
                      >
                        <div className="flex flex-wrap items-center gap-3">
                          {editingId === category.id ? (
                            <Input
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="border-2 border-black focus:border-yellow-500 h-8"
                              autoFocus
                            />
                          ) : (
                            <span className="font-medium text-sm sm:text-base">{category.name}</span>
                          )}
                          <Badge
                            variant={category.status === "published" ? "default" : "secondary"}
                            className={`${
                              category.status === "published"
                                ? "bg-green-500 text-white"
                                : "bg-gray-300 text-black"
                            }`}
                          >
                            {category.status}
                          </Badge>
                          <Badge className="bg-yellow-500 text-black">
                            {category.blogCount} {category.blogCount === 1 ? "blog" : "blogs"}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {editingId === category.id ? (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleSaveEdit(category.id)}
                                className="h-8 w-8 text-green-600 hover:bg-green-100"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setEditingId(null)}
                                className="h-8 w-8 text-red-600 hover:bg-red-100"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(category)}
                                className="h-8 w-8 text-black hover:bg-yellow-100"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleStatus(category.id)}
                                className={`h-8 w-8 ${
                                  category.status === "published"
                                    ? "text-yellow-600 hover:bg-yellow-100"
                                    : "text-blue-600 hover:bg-blue-100"
                                }`}
                              >
                                <span className="text-xs sm:text-sm">
                                  {category.status === "published" ? "Draft" : "Publish"}
                                </span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(category.id)}
                                className="h-8 w-8 text-red-600 hover:bg-red-100"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSelectCategory(category.name)}
                                className="border-black text-black hover:bg-yellow-500 hover:text-black text-xs sm:text-sm"
                              >
                                Select
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CardContent>
  </Card>
</div>

  )
}