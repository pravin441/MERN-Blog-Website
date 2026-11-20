import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Camera, LogOut, User } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import { mockUser, myBlogs } from '../utils/mockDashboard'
import { formatDate } from '../utils/formatDate'

const MAX_IMAGE_MB = 2

export default function Profile() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [saved, setSaved] = useState({ name: mockUser.name, bio: mockUser.bio })
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({ defaultValues: { name: mockUser.name, bio: mockUser.bio } })

  const bio = watch('bio') || ''
  const published = myBlogs.filter((b) => b.status === 'published')

  // Free the temporary image URL when it changes or the page closes
  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview)
    }
  }, [avatarPreview])

  const handleAvatar = (e) => {
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

    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  const onSubmit = async (data) => {
    // Temporary: simulates a server call. The real update comes in Module 05.
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('PROFILE UPDATE', { ...data, avatar: avatarFile })
    setSaved({ name: data.name, bio: data.bio })
    reset(data) // the saved values become the new baseline, so the form is "clean" again
    setAvatarFile(null)
    toast.success('Profile updated')
  }

  const handleLogout = () => {
    // Temporary: real logout (clearing the token) comes in Module 05
    toast.success('Logged out')
    navigate('/login')
  }

  const canSave = isDirty || Boolean(avatarFile)

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-3xl font-bold">Profile</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">
        Manage your personal information and see your published work.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* ---------- Summary card ---------- */}
        <Card className="h-fit text-center">
          <div className="relative mx-auto h-28 w-28">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Profile preview"
                className="h-28 w-28 rounded-full object-cover shadow-lg shadow-primary/30"
              />
            ) : (
              <span className="flex h-28 w-28 items-center justify-center rounded-full bg-linear-to-br from-primary to-secondary text-4xl font-bold text-white shadow-lg shadow-primary/30">
                {saved.name.charAt(0)}
              </span>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Change profile photo"
              className="absolute bottom-0 right-0 cursor-pointer rounded-full border-2 border-white bg-primary p-2 text-white transition hover:bg-secondary dark:border-navy-light"
            >
              <Camera className="h-4 w-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatar}
              className="hidden"
            />
          </div>

          <h2 className="mt-4 font-display text-xl font-bold">{saved.name}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{mockUser.email}</p>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{saved.bio}</p>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            Member since {formatDate(mockUser.joined)}
          </p>

          <Button variant="secondary" onClick={handleLogout} className="mt-6 w-full">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </Card>

        {/* ---------- Edit form ---------- */}
        <Card className="lg:col-span-2">
          <h2 className="font-display text-xl font-bold">Edit profile</h2>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-5 space-y-5">
            <Input
              label="Full name"
              placeholder="Your full name"
              icon={User}
              error={errors.name?.message}
              {...register('name', {
                required: 'Full name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' },
                maxLength: { value: 50, message: 'Name must be under 50 characters' },
              })}
            />

            <Input
              label="Email"
              value={mockUser.email}
              readOnly
              disabled
              className="cursor-not-allowed opacity-70"
            />

            <div>
              <label
                htmlFor="bio"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Bio
              </label>
              <textarea
                id="bio"
                rows={4}
                placeholder="Tell readers a little about yourself"
                className={`w-full resize-none rounded-xl border bg-white px-4 py-2.5 text-sm text-navy placeholder:text-slate-400 transition focus:outline-none focus:ring-2 dark:bg-navy-light dark:text-slate-100 ${
                  errors.bio
                    ? 'border-red-400 focus:ring-red-200 dark:focus:ring-red-900'
                    : 'border-slate-300 focus:border-primary focus:ring-primary/20 dark:border-slate-600'
                }`}
                {...register('bio', {
                  maxLength: { value: 200, message: 'Bio must be under 200 characters' },
                })}
              />
              <div className="mt-1.5 flex justify-between text-sm">
                <span className="text-red-500">{errors.bio?.message}</span>
                <span className={bio.length > 200 ? 'text-red-500' : 'text-slate-400'}>
                  {bio.length}/200
                </span>
              </div>
            </div>

            <Button type="submit" size="lg" loading={isSubmitting} disabled={!canSave}>
              Save changes
            </Button>
          </form>
        </Card>
      </div>

      {/* ---------- Published articles ---------- */}
      <Card className="mt-6">
        <h2 className="font-display text-xl font-bold">
          Your published articles ({published.length})
        </h2>

        {published.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            You haven't published anything yet.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-slate-200 dark:divide-slate-700">
            {published.map((blog) => (
              <li key={blog.id} className="py-4 first:pt-0 last:pb-0">
                <p className="font-medium">{blog.title}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {blog.category} · {formatDate(blog.date)} · {blog.readingTime} min read
                </p>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}