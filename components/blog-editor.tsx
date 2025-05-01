"use client"

import { useState } from "react"
import { ImageUploader } from "@/components/image-uploader"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Plus, Trash2 } from "lucide-react"

const categories = [
  { id: "1", name: "Technology" },
  { id: "2", name: "Marketing" },
  { id: "3", name: "Design" },
  { id: "4", name: "Development" },
  { id: "5", name: "Business" },
]

const authors = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Alex Johnson" },
]

// Define a type for title-description pairs
interface TitleDescription {
  id: string
  title: string
  description: string
}

// Define a type for images
interface BlogImage {
  id: string
  url: string
}

const formSchema = z.object({
  mainTitle: z.string().min(5, {
    message: "Main title must be at least 5 characters.",
  }),
  metaTitle: z.string().min(5, {
    message: "Meta title must be at least 5 characters.",
  }),
  metaDescription: z.string().min(10, {
    message: "Meta description must be at least 10 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  author: z.string({
    required_error: "Please select an author.",
  }),
  content: z.string().min(20, {
    message: "Content must be at least 20 characters.",
  }),
})

export function BlogEditor() {
  // State for additional title-description pairs
  const [titleDescriptions, setTitleDescriptions] = useState<TitleDescription[]>([])

  // State for multiple images
  const [images, setImages] = useState<BlogImage[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mainTitle: "",
      metaTitle: "",
      metaDescription: "",
      category: "",
      author: "",
      content: "",
    },
  })

  // Add a new title-description pair
  const addTitleDescription = () => {
    setTitleDescriptions([...titleDescriptions, { id: `td-${Date.now()}`, title: "", description: "" }])
  }

  // Remove a title-description pair
  const removeTitleDescription = (id: string) => {
    setTitleDescriptions(titleDescriptions.filter((item) => item.id !== id))
  }

  // Update a title-description pair
  const updateTitleDescription = (id: string, field: "title" | "description", value: string) => {
    setTitleDescriptions(titleDescriptions.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  // Add a new image
  const addImage = (imageUrl: string) => {
    setImages([...images, { id: `img-${Date.now()}`, url: imageUrl }])
  }

  // Remove an image
  const removeImage = (id: string) => {
    setImages(images.filter((image) => image.id !== id))
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({
      ...values,
      additionalTitlesDescriptions: titleDescriptions,
      images: images,
    })
    // Here you would typically save the blog post
  }

  return (
    <div className="grid gap-6">
      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit">Edit Post</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <Card>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="mainTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Main Blog Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter main blog title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Additional Title-Description Sections */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium leading-none">Additional Titles & Descriptions</label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addTitleDescription}
                            className="h-8 gap-1"
                          >
                            <Plus className="h-3.5 w-3.5" />
                            <span>Add</span>
                          </Button>
                        </div>

                        {titleDescriptions.map((item) => (
                          <div key={item.id} className="space-y-3 p-3 border rounded-md relative">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeTitleDescription(item.id)}
                              className="h-6 w-6 absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>

                            <div>
                              <label className="text-sm font-medium leading-none block mb-2">Title</label>
                              <Input
                                placeholder="Enter title"
                                value={item.title}
                                onChange={(e) => updateTitleDescription(item.id, "title", e.target.value)}
                              />
                            </div>

                            <div>
                              <label className="text-sm font-medium leading-none block mb-2">Description</label>
                              <Textarea
                                placeholder="Enter description"
                                value={item.description}
                                onChange={(e) => updateTitleDescription(item.id, "description", e.target.value)}
                                className="resize-none"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <FormField
                        control={form.control}
                        name="metaTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter SEO meta title" {...field} />
                            </FormControl>
                            <FormDescription>Recommended length: 50-60 characters</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="metaDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Enter SEO meta description" className="resize-none" {...field} />
                            </FormControl>
                            <FormDescription>Recommended length: 150-160 characters</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id}>
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="author"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Author</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select author" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {authors.map((author) => (
                                    <SelectItem key={author.id} value={author.id}>
                                      {author.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Multiple Images Section */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium leading-none">Blog Images</label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const fileInput = document.createElement("input")
                              fileInput.type = "file"
                              fileInput.accept = "image/*"
                              fileInput.onchange = (e) => {
                                const file = (e.target as HTMLInputElement).files?.[0]
                                if (file) {
                                  const reader = new FileReader()
                                  reader.onload = (event) => {
                                    if (event.target?.result) {
                                      addImage(event.target.result as string)
                                    }
                                  }
                                  reader.readAsDataURL(file)
                                }
                              }
                              fileInput.click()
                            }}
                            className="h-8 gap-1"
                          >
                            <Plus className="h-3.5 w-3.5" />
                            <span>Add Image</span>
                          </Button>
                        </div>

                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                          {images.map((image) => (
                            <div key={image.id} className="relative border rounded-md overflow-hidden">
                              <img
                                src={image.url || "/placeholder.svg"}
                                alt="Blog image"
                                className="w-full h-40 object-cover"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => removeImage(image.id)}
                                className="absolute top-2 right-2 h-7 w-7 bg-white/80 hover:bg-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}

                          {/* Image Uploader for the first image if no images exist */}
                          {images.length === 0 && (
                            <div className="col-span-full">
                              <ImageUploader
                                image={null}
                                setImage={(url) => {
                                  if (url) addImage(url)
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Write your blog content here..."
                                className="min-h-[200px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Save Draft</Button>
                    <Button type="submit">Publish</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardContent className="pt-6">
              <div className="prose max-w-none dark:prose-invert">
                <h1>{form.watch("mainTitle") || "Blog Title"}</h1>

                {/* Display first image if available */}
                {images.length > 0 && (
                  <div className="my-6">
                    <img
                      src={images[0].url || "/placeholder.svg"}
                      alt={form.watch("mainTitle") || "Blog image"}
                      className="rounded-lg max-h-[400px] w-auto object-cover"
                    />
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                  <span>By {authors.find((a) => a.id === form.watch("author"))?.name || "Author"}</span>
                  <span>•</span>
                  <span>{categories.find((c) => c.id === form.watch("category"))?.name || "Category"}</span>
                  <span>•</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>

                <div>{form.watch("content") || "Your blog content will appear here..."}</div>

                {/* Display additional titles and descriptions */}
                {titleDescriptions.length > 0 && (
                  <div className="mt-8 space-y-6">
                    <h2>Additional Sections</h2>
                    {titleDescriptions.map((item) => (
                      <div key={item.id} className="space-y-2">
                        <h3>{item.title || "Section Title"}</h3>
                        <p>{item.description || "Section description..."}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Display additional images */}
                {images.length > 1 && (
                  <div className="mt-8">
                    <h2>Additional Images</h2>
                    <div className="grid gap-4 grid-cols-2 mt-4">
                      {images.slice(1).map((image) => (
                        <img
                          key={image.id}
                          src={image.url || "/placeholder.svg"}
                          alt="Additional blog image"
                          className="rounded-lg w-full h-auto object-cover"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
