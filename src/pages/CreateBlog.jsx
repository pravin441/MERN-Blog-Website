import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ImagePlus, Save, Send, Trash2, X } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Editor from '../components/blog/Editor'
import { categories } from '../utils/mockData'
import { calculateReadingTime, getWordCount } from '../utils/readingTime'

const MAX_TAGS = 5
const MAX_IMAGE_MB = 2

export default function CreateBlog() {
  const {
    register,
    handleSubmit,
    control,
    trigger,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { title: '', description: '', category: '', content: '' } })

  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState('')
  const fileInputRef = useRef(null)

  const description = watch('description') || ''
  const content = watch('content') || ''

  // Free the temporary image URL when the page closes
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  /* ---------- Image ---------- */
  const handleImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file')
      return
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      toast.error(`Image must be smaller than ${MAX_IMAGE_MB} MB`)
      return
    }

    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    setImageFile(null)
    setPreview('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  /* ---------- Tags ---------- */
  const addTag = () => {
    const tag = tagInput.trim().toLowerCase()
    if (!tag) return
    if (tags.includes(tag)) {
      toast.error('That tag is already added')
    } else if (tags.length >= MAX_TAGS) {
      toast.error(`You can add up to ${MAX_TAGS} tags`)
    } else {
      setTags([...tags, tag])
    }
    setTagInput('')
  }

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    }
  }

  const removeTag = (tag) => setTags(tags.filter((t) => t !== tag))

  /* ---------- Submit ---------- */
  // Temporary: both handlers only log the data. Real saving comes in Modules 02-04.
  const publish = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('PUBLISH', { ...data, tags, status: 'published', image: imageFile })
    toast.success('Blog is valid! Saving to the database comes in Module 03.')
  }

  const saveDraft = async () => {
    // A draft only needs a title
    const titleOk = await trigger('title')
    if (!titleOk) return
    console.log('DRAFT', { ...getValues(), tags, status: 'draft', image: imageFile })
    toast.success('Draft is valid! Saving comes in Module 03.')
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Create new blog</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Write your story, add a cover image and publish when you are ready.
        </p>
      </div>

      <form onSubmit={handleSubmit(publish)} noValidate className="grid gap-6 lg:grid-cols-3">
        {/* ---------- Left: writing area ---------- */}
        <div className="space-y-5 lg:col-span-2">
          <Card className="space-y-5">
            <Input
              label="Title"
              placeholder="A catchy title for your blog"
              error={errors.title?.message}
              {...register('title', {
                required: 'Title is required',
                minLength: { value: 5, message: 'Title must be at least 5 characters' },
                maxLength: { value: 120, message: 'Title must be under 120 characters' },
              })}
            />

            <div>
              <label
                htmlFor="description"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Short description
              </label>
              <textarea
                id="description"
                rows={3}
                placeholder="A one or two sentence summary shown on blog cards"
                className={`w-full resize-none rounded-xl border bg-white px-4 py-2.5 text-sm text-navy placeholder:text-slate-400 transition focus:outline-none focus:ring-2 dark:bg-navy-light dark:text-slate-100 ${
                  errors.description
                    ? 'border-red-400 focus:ring-red-200 dark:focus:ring-red-900'
                    : 'border-slate-300 focus:border-primary focus:ring-primary/20 dark:border-slate-600'
                }`}
                {...register('description', {
                  required: 'Description is required',
                  minLength: { value: 20, message: 'Description must be at least 20 characters' },
                  maxLength: { value: 200, message: 'Description must be under 200 characters' },
                })}
              />
              <div className="mt-1.5 flex justify-between text-sm">
                <span className="text-red-500">{errors.description?.message}</span>
                <span className={description.length > 200 ? 'text-red-500' : 'text-slate-400'}>
                  {description.length}/200
                </span>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Content
              </label>
              <Controller
                name="content"
                control={control}
                rules={{
                  validate: (html) => {
                    const words = getWordCount(html)
                    if (words === 0) return 'Content is required'
                    if (words < 30) return 'Content must be at least 30 words'
                    return true
                  },
                }}
                render={({ field }) => (
                  <Editor
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.content?.message}
                  />
                )}
              />
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                {getWordCount(content)} words · {calculateReadingTime(content)} min read
              </p>
            </div>
          </Card>
        </div>

        {/* ---------- Right: settings ---------- */}
        <div className="space-y-5">
          {/* Cover image */}
          <Card>
            <h2 className="font-display text-lg font-bold">Cover image</h2>

            {preview ? (
              <div className="relative mt-4 overflow-hidden rounded-xl">
                <img src={preview} alt="Cover preview" className="h-44 w-full object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
                  aria-label="Remove image"
                  className="absolute right-2 top-2 cursor-pointer rounded-full bg-black/60 p-1.5 text-white transition hover:bg-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="cover"
                className="mt-4 flex h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-center text-sm text-slate-500 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-400"
              >
                <ImagePlus className="mb-2 h-8 w-8" />
                <span className="font-medium">Click to upload</span>
                <span className="text-xs">PNG, JPG or WebP, up to {MAX_IMAGE_MB} MB</span>
              </label>
            )}

            <input
              ref={fileInputRef}
              id="cover"
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </Card>

          {/* Category and tags */}
          <Card className="space-y-5">
            <div>
              <label
                htmlFor="category"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Category
              </label>
              <select
                id="category"
                className={`w-full cursor-pointer rounded-xl border bg-white px-4 py-2.5 text-sm text-navy transition focus:outline-none focus:ring-2 dark:bg-navy-light dark:text-slate-100 ${
                  errors.category
                    ? 'border-red-400 focus:ring-red-200 dark:focus:ring-red-900'
                    : 'border-slate-300 focus:border-primary focus:ring-primary/20 dark:border-slate-600'
                }`}
                {...register('category', { required: 'Please select a category' })}
              >
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1.5 text-sm text-red-500">{errors.category.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="tags"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Tags
              </label>
              <Input
                id="tags"
                name="tags"
                placeholder="Type a tag and press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                maxLength={20}
              />
              <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                {tags.length}/{MAX_TAGS} tags
              </p>

              {tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-blue-300"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        aria-label={`Remove tag ${tag}`}
                        className="cursor-pointer rounded-full hover:text-red-500"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Actions */}
          <Card className="space-y-3">
            <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
              <Send className="h-4 w-4" /> Publish
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              disabled={isSubmitting}
              onClick={saveDraft}
              className="w-full"
            >
              <Save className="h-4 w-4" /> Save draft
            </Button>
          </Card>
        </div>
      </form>
    </div>
  )
}