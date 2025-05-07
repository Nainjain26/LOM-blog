"use client"

import { useState } from "react"
import { ImageUploader } from "@/components/image-uploader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Plus, Trash2, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Define categories array
const categories = [
  { id: "1", name: "Technology" },
  { id: "2", name: "Marketing" },
  { id: "3", name: "Design" },
  { id: "4", name: "Development" },
  { id: "5", name: "Business" },
  
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
  author: z.string().min(2, {
    message: "Author name must be at least 2 characters.",
  }),
  content: z.string().min(20, {
    message: "Content must be at least 20 characters.",
  }),
})

export function BlogEditor() {
  const [titleDescriptions, setTitleDescriptions] = useState<TitleDescription[]>([])
  const [images, setImages] = useState<BlogImage[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")

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

  // Add a new tag
  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  // Remove a tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({
      ...values,
      additionalTitlesDescriptions: titleDescriptions,
      images: images,
      tags: tags,
    })
    // Here you would typically save the blog post
  }

  return (
    <div className="grid gap-6">
      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="grid w-full grid-cols-2 ">
          <TabsTrigger value="edit" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
            Edit Post
          </TabsTrigger>
          <TabsTrigger value="preview" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
            Preview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <Card className="border-2 border-yellow-500 shadow-lg">
            <CardHeader className=" text-yellow-500 p-4 border-b-2 border-yellow-500">
              <CardTitle>Blog Editor</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 bg-white">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="mainTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black font-semibold">Main Blog Title</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter main blog title" 
                                {...field} 
                                className="border-2 border-gray-400  "
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black font-semibold">Author Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter author name"
                                {...field}
                                className="border-2 border-gray-400 "
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />

                      {/* Additional Title-Description Sections */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-semibold leading-none text-black">
                            Additional Titles & Descriptions
                          </label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addTitleDescription}
                            className="h-8 gap-1 border-gray-400 text-black hover:bg-yellow-500 hover:text-black"
                          >
                            <Plus className="h-3.5 w-3.5" />
                            <span>Add</span>
                          </Button>
                        </div>

                        {titleDescriptions.map((item) => (
                          <div key={item.id} className="space-y-3 p-3 border-2 border-gray-400 rounded-md relative bg-white">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeTitleDescription(item.id)}
                              className="h-6 w-6 absolute top-2 right-2 text-black hover:text-red-500 hover:bg-transparent"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>

                            <div>
                              <label className="text-sm font-semibold leading-none block mb-2 text-black">Title</label>
                              <Input
                                placeholder="Enter title"
                                value={item.title}
                                onChange={(e) => updateTitleDescription(item.id, "title", e.target.value)}
                                className="border-2 border-gray-400 "
                              />
                            </div>

                            <div>
                              <label className="text-sm font-semibold leading-none block mb-2 text-black">
                                Description
                              </label>
                              <Textarea
                                placeholder="Enter description"
                                value={item.description}
                                onChange={(e) => updateTitleDescription(item.id, "description", e.target.value)}
                                className="resize-none border-2 border-gray-400 "
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black font-semibold">Content</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Write your blog content here..."
                                className="min-h-[200px] border-2 border-gray-400 "
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black font-semibold">Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-2 border-gray-400">
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.id} value={category.name}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-6">
                      {/* Multiple Images Section */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-semibold leading-none text-black">Blog Images</label>
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
                            className="h-8 gap-1 border-gray-400 text-black hover:bg-yellow-500 hover:text-black"
                          >
                            <Plus className="h-3.5 w-3.5" />
                            <span>Add Image</span>
                          </Button>
                        </div>

                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                          {images.map((image) => (
                            <div key={image.id} className="relative border-2 border-gray-400 rounded-md overflow-hidden group">
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
                                className="absolute top-2 right-2 h-7 w-7 bg-white/80 hover:bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}

                          {images.length === 0 && (
                            <div className="col-span-full">
                             <div className="border-2 border-dashed border-gray-400 hover:border-yellow-500">
                                <ImageUploader
                                  image={null}
                                  setImage={(url) => {
                                    if (url) addImage(url)
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-4 bg-yellow-50 border-2 border-yellow-500 rounded-md">
                        <FormField
                          control={form.control}
                          name="metaTitle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-black font-semibold">Meta Title</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter SEO meta title" 
                                  {...field} 
                                  className="border-2 border-gray-400 "
                                />
                              </FormControl>
                              <FormDescription className="text-gray-600">
                                Recommended length: 50-60 characters
                              </FormDescription>
                              <FormMessage className="text-red-500" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="metaDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-black font-semibold">Meta Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Enter SEO meta description" 
                                  className="resize-none border-2 border-gray-400 " 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription className="text-gray-600">
                                Recommended length: 150-160 characters
                              </FormDescription>
                              <FormMessage className="text-red-500" />
                            </FormItem>
                          )}
                        />

                        {/* Meta Tags Section */}
                        <FormItem className="mt-4">
                          <FormLabel className="text-black font-semibold">Meta Tags</FormLabel>
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-2 mb-2">
                              {tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  className="bg-black text-yellow-500 px-3 py-1 text-sm font-medium flex items-center gap-1"
                                >
                                  {tag}
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeTag(tag)}
                                    className="h-4 w-4 text-yellow-500 hover:text-white hover:bg-transparent"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Input
                                placeholder="Add a tag (press Enter)"
                                value={currentTag}
                                onChange={(e) => setCurrentTag(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault()
                                    addTag()
                                  }
                                }}
                                className="border-2 border-gray-400 "
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={addTag}
                                className="border-gray-400 text-black hover:bg-yellow-500 hover:text-black"
                                disabled={!currentTag.trim()}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <FormDescription className="text-gray-600">
                            Add relevant tags to help with SEO (e.g., "web-development", "design-tips")
                          </FormDescription>
                        </FormItem>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      className="border-gray-400 text-black hover:bg-yellow-500 hover:text-black"
                    >
                      Save Draft
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-black text-yellow-500 hover:bg-yellow-500 hover:text-black"
                    >
                      Publish
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card className="border-2 border-yellow-500 shadow-lg">
            <CardHeader className=" text-yellow-500 p-4 border-b-2 border-yellow-500">
              <CardTitle>Blog Preview</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 bg-white">
              <div className="prose max-w-none dark:prose-invert">
                <h1 className="text-3xl font-bold text-black mb-4">
                  {form.watch("mainTitle") || "Blog Title"}
                </h1>

                {images.length > 0 && (
                  <div className="my-6">
                    <img
                      src={images[0].url || "/placeholder.svg"}
                      alt={form.watch("mainTitle") || "Blog image"}
                      className="rounded-lg max-h-[400px] w-auto object-cover border-2 border-gray-400"
                    />
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                  <Badge className="bg-yellow-500 text-black">
                    {form.watch("category") || "Category"}
                  </Badge>
                  <span>By {form.watch("author") || "Author"}</span>
                  <span>•</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag) => (
                      <Badge key={tag} className="bg-black text-yellow-500">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="text-gray-800 leading-relaxed">
                  {form.watch("content") || "Your blog content will appear here..."}
                </div>

                {titleDescriptions.length > 0 && (
                  <div className="mt-8 space-y-6">
                    <h2 className="text-2xl font-bold text-black border-b-2 border-yellow-500 pb-2">
                      Additional Sections
                    </h2>
                    {titleDescriptions.map((item) => (
                      <div key={item.id} className="space-y-2">
                        <h3 className="text-xl font-semibold text-black">{item.title || "Section Title"}</h3>
                        <p className="text-gray-700">{item.description || "Section description..."}</p>
                      </div>
                    ))}
                  </div>
                )}

                {images.length > 1 && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold text-black border-b-2 border-yellow-500 pb-2">
                      Gallery
                    </h2>
                    <div className="grid gap-4 grid-cols-2 mt-4">
                      {images.slice(1).map((image) => (
                        <img
                          key={image.id}
                          src={image.url || "/placeholder.svg"}
                          alt="Additional blog image"
                          className="rounded-lg w-full h-auto object-cover border-2 border-gray-400"
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