import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { EyeOff, FileText, Pencil, Plus, Search, Send, Trash2 } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import ConfirmModal from '../components/ui/ConfirmModal'
import { myBlogs } from '../utils/mockDashboard'
import { formatDate } from '../utils/formatDate'

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

function IconButton({ label, onClick, danger = false, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`cursor-pointer rounded-lg p-2 transition ${
        danger
          ? 'text-slate-500 hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/40'
          : 'text-slate-500 hover:bg-slate-100 hover:text-primary dark:text-slate-400 dark:hover:bg-slate-800'
      }`}
    >
      {children}
    </button>
  )
}

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'published', label: 'Published' },
  { key: 'draft', label: 'Drafts' },
]

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState(myBlogs)
  const [tab, setTab] = useState('all')
  const [search, setSearch] = useState('')
  const [toDelete, setToDelete] = useState(null)

  const counts = {
    all: blogs.length,
    published: blogs.filter((b) => b.status === 'published').length,
    draft: blogs.filter((b) => b.status === 'draft').length,
  }

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase()
    return blogs
      .filter((b) => tab === 'all' || b.status === tab)
      .filter((b) => !term || b.title.toLowerCase().includes(term))
  }, [blogs, tab, search])

  const toggleStatus = (blog) => {
    const next = blog.status === 'published' ? 'draft' : 'published'
    setBlogs((prev) => prev.map((b) => (b.id === blog.id ? { ...b, status: next } : b)))
    toast.success(next === 'published' ? 'Blog published' : 'Blog moved to drafts')
  }

  const confirmDelete = () => {
    setBlogs((prev) => prev.filter((b) => b.id !== toDelete.id))
    toast.success('Blog deleted')
    setToDelete(null)
  }

  const handleEdit = () => {
    // The edit page is built in Module 04 (CRUD)
    toast('Editing will be available in Module 04', { icon: '🛠️' })
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Manage blogs</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Edit, publish or delete your articles.
          </p>
        </div>
        <Link to="/dashboard/create">
          <Button size="lg">
            <Plus className="h-4 w-4" /> Create New Blog
          </Button>
        </Link>
      </div>

      {/* Tabs and search */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition ${
                tab === key
                  ? 'bg-linear-to-r from-primary to-secondary text-white shadow-md shadow-primary/25'
                  : 'border border-slate-300 bg-white text-slate-600 hover:border-primary hover:text-primary dark:border-slate-600 dark:bg-navy-light dark:text-slate-300'
              }`}
            >
              {label} ({counts[key]})
            </button>
          ))}
        </div>

        <div className="w-full sm:max-w-xs">
          <Input
            name="search"
            placeholder="Search your blogs..."
            icon={Search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <Card className="mt-6 p-0">
        {visible.length === 0 ? (
          <div className="py-16 text-center">
            <FileText className="mx-auto h-12 w-12 text-slate-400" />
            <h2 className="mt-4 font-display text-2xl font-bold">
              {blogs.length === 0 ? 'No blogs yet' : 'No blogs found'}
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              {blogs.length === 0
                ? 'Write your first article to see it here.'
                : 'Try another tab or a different search term.'}
            </p>
            {blogs.length === 0 && (
              <Link to="/dashboard/create" className="mt-6 inline-block">
                <Button>Create your first blog</Button>
              </Link>
            )}
          </div>
        ) : (
          <ul className="divide-y divide-slate-200 dark:divide-slate-700">
            {visible.map((blog) => (
              <li
                key={blog.id}
                className="flex flex-wrap items-center justify-between gap-4 p-5"
              >
                <div className="min-w-0 flex-1 basis-64">
                  <p className="truncate font-semibold">{blog.title}</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {blog.category} · {formatDate(blog.date)} · {blog.readingTime} min read
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <StatusBadge status={blog.status} />
                  <IconButton
                    label={blog.status === 'published' ? 'Unpublish' : 'Publish'}
                    onClick={() => toggleStatus(blog)}
                  >
                    {blog.status === 'published' ? (
                      <EyeOff className="h-4.5 w-4.5" />
                    ) : (
                      <Send className="h-4.5 w-4.5" />
                    )}
                  </IconButton>
                  <IconButton label="Edit" onClick={handleEdit}>
                    <Pencil className="h-4.5 w-4.5" />
                  </IconButton>
                  <IconButton label="Delete" danger onClick={() => setToDelete(blog)}>
                    <Trash2 className="h-4.5 w-4.5" />
                  </IconButton>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <ConfirmModal
        open={Boolean(toDelete)}
        title="Delete this blog?"
        message={`"${toDelete?.title}" will be permanently removed. This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  )
}