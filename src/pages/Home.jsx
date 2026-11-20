import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ArrowRight, Clock, Mail, PenLine, Search, Sparkles, Users, Zap } from 'lucide-react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import BlogCard from '../components/blog/BlogCard'
import { categories, mockBlogs } from '../utils/mockData'
import { formatDate } from '../utils/formatDate'

export default function Home() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [email, setEmail] = useState('')

  const featured = mockBlogs.find((blog) => blog.featured)
  const latest = mockBlogs.filter((blog) => !blog.featured).slice(0, 3)

  const handleSearch = (e) => {
    e.preventDefault()
    const term = query.trim()
    navigate(term ? `/explore?search=${encodeURIComponent(term)}` : '/explore')
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }
    toast.success('Thanks for subscribing!')
    setEmail('')
  }

  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary/10 via-white to-secondary/10 dark:from-primary/20 dark:via-navy dark:to-secondary/20">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur dark:bg-navy-light/70 dark:text-blue-300">
            <Sparkles className="h-4 w-4" />
            A home for writers and curious readers
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight sm:text-6xl">
            Write your story.{' '}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Share it with the world.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            BlogSphere is a modern publishing platform where ideas find their audience.
            Create, publish and discover articles on technology, design, business and more.
          </p>

          <form onSubmit={handleSearch} className="mx-auto mt-8 flex max-w-xl gap-2">
            <div className="flex-1">
              <Input
                name="search"
                placeholder="Search articles by title..."
                icon={Search}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="py-3"
              />
            </div>
            <Button type="submit" size="lg">Search</Button>
          </form>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/register">
              <Button size="lg">
                Start writing <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/explore">
              <Button size="lg" variant="secondary">Explore articles</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- FEATURED ---------- */}
      {featured && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold">Featured story</h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Hand-picked by our editors.</p>

          <Link
            to={`/blog/${featured.slug}`}
            className="group mt-8 grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-slate-700 dark:bg-navy-light md:grid-cols-2"
          >
            <div className={`min-h-64 ${featured.cover}`} />
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-blue-300">
                {featured.category}
              </span>
              <h3 className="mt-4 font-display text-3xl font-bold leading-snug transition-colors group-hover:text-primary">
                {featured.title}
              </h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300">{featured.description}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
                <span className="font-medium text-slate-700 dark:text-slate-200">{featured.author}</span>
                <span>{formatDate(featured.date)}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {featured.readingTime} min read
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ---------- LATEST ---------- */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold">Latest articles</h2>
            <p className="mt-1 text-slate-500 dark:text-slate-400">Fresh ideas from our writers.</p>
          </div>
          <Link
            to="/explore"
            className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>

      {/* ---------- CATEGORIES ---------- */}
      <section id="categories" className="scroll-mt-20 bg-slate-100 py-16 dark:bg-navy-light/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold">Browse by category</h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Find stories on the topics you love.</p>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.map(({ name, icon: Icon, count }) => (
              <Link
                key={name}
                to={`/explore?category=${encodeURIComponent(name)}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg dark:border-slate-700 dark:bg-navy-light"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white dark:bg-primary/20">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="mt-3 font-semibold">{name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{count} articles</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- NEWSLETTER ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-linear-to-br from-navy via-navy-light to-primary/80 px-6 py-14 text-center text-white sm:px-12">
          <h2 className="font-display text-3xl font-bold">Never miss a story</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Join our newsletter and get the best articles delivered to your inbox every week.
          </p>
          <form onSubmit={handleSubscribe} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <div className="flex-1 text-left">
              <Input
                type="email"
                name="newsletter"
                placeholder="you@example.com"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg">Subscribe</Button>
          </form>
        </div>
      </section>

      {/* ---------- ABOUT ---------- */}
      <section id="about" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold">About BlogSphere</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            We believe everyone has something worth sharing. BlogSphere gives writers a clean,
            distraction-free place to publish, and readers a better way to discover great content.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { icon: PenLine, title: 'Write freely', text: 'A clean editor with drafts, tags and cover images.' },
            { icon: Zap, title: 'Publish instantly', text: 'Go live in one click and reach readers right away.' },
            { icon: Users, title: 'Grow your audience', text: 'Get discovered through categories, tags and search.' },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-navy-light"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary to-secondary text-white">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}