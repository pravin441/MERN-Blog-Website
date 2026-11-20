import { Link } from 'react-router-dom'
import { PenLine } from 'lucide-react'

const columns = [
  {
    title: 'Platform',
    links: [
      { label: 'Explore', to: '/explore' },
      { label: 'Categories', to: '/#categories' },
      { label: 'About', to: '/#about' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Log in', to: '/login' },
      { label: 'Register', to: '/register' },
      { label: 'Dashboard', to: '/dashboard' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-navy-light">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-secondary text-white">
              <PenLine className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold">BlogSphere</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-slate-500 dark:text-slate-400">
            A modern platform to write, publish and discover stories that matter.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              {column.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-500 transition hover:text-primary dark:text-slate-400 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 py-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        © {new Date().getFullYear()} BlogSphere. Built with the MERN stack.
      </div>
    </footer>
  )
}