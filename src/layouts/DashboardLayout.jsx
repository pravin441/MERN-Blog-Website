import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, FileText, FileEdit, Plus } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { myBlogs, mockUser } from '../utils/mockDashboard'
import { formatDate } from '../utils/formatDate'

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <Card hover className="flex items-center gap-4">
      <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </Card>
  )
}

function StatusBadge({ status }) {
  const styles =
    status === 'published'
      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'

  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${styles}`}>
      {status}
    </span>
  )
}

export default function Dashboard() {
  const total = myBlogs.length
  const published = myBlogs.filter((b) => b.status === 'published').length
  const drafts = myBlogs.filter((b) => b.status === 'draft').length
  const recent = [...myBlogs].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4)

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">
            Welcome back, {mockUser.name.split(' ')[0]}
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Here's what's happening with your blog.
          </p>
        </div>
        <Link to="/dashboard/create">
          <Button size="lg">
            <Plus className="h-4 w-4" /> Create New Blog
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total blogs"
          value={total}
          icon={FileText}
          color="bg-primary/10 text-primary dark:bg-primary/20"
        />
        <StatCard
          label="Published"
          value={published}
          icon={CheckCircle2}
          color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300"
        />
        <StatCard
          label="Drafts"
          value={drafts}
          icon={FileEdit}
          color="bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent posts */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Recent posts</h2>
            <Link
              to="/dashboard/blogs"
              className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              Manage all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="mt-4 divide-y divide-slate-200 dark:divide-slate-700">
            {recent.map((blog) => (
              <li
                key={blog.id}
                className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{blog.title}</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {blog.category} · {formatDate(blog.date)} · {blog.readingTime} min read
                  </p>
                </div>
                <StatusBadge status={blog.status} />
              </li>
            ))}
          </ul>
        </Card>

        {/* Profile card */}
        <Card className="text-center">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-primary to-secondary text-3xl font-bold text-white shadow-lg shadow-primary/30">
            {mockUser.name.charAt(0)}
          </span>
          <h2 className="mt-4 font-display text-xl font-bold">{mockUser.name}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{mockUser.email}</p>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{mockUser.bio}</p>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            Member since {formatDate(mockUser.joined)}
          </p>
          <Link to="/dashboard/profile" className="mt-5 block">
            <Button variant="secondary" className="w-full">Edit profile</Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}