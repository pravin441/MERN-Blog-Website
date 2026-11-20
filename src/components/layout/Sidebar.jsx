import { Link, NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FileText, Globe, LayoutDashboard, LogOut, PenLine, User, X } from 'lucide-react'

const links = [
  { label: 'Overview', to: '/dashboard', icon: LayoutDashboard, end: true },
  { label: 'Create Blog', to: '/dashboard/create', icon: PenLine },
  { label: 'Manage Blogs', to: '/dashboard/blogs', icon: FileText },
  { label: 'Profile', to: '/dashboard/profile', icon: User },
]

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Temporary: real logout (clearing the token) comes in Module 05
    toast.success('Logged out')
    onClose()
    navigate('/login')
  }

  return (
    <>
      {/* Dark overlay behind the drawer on mobile */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 dark:border-slate-800 dark:bg-navy-light lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-secondary text-white shadow-md shadow-primary/30">
              <PenLine className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold">BlogSphere</span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="cursor-pointer rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-5">
          {links.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-linear-to-r from-primary to-secondary text-white shadow-md shadow-primary/25'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="space-y-1 border-t border-slate-200 px-3 py-4 dark:border-slate-800">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Globe className="h-5 w-5" />
            Back to site
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}