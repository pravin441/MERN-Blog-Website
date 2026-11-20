import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, PenLine, X } from 'lucide-react'
import Button from '../ui/Button'
import ThemeToggle from '../ui/ThemeToggle'

const navLinks = [
  { label: 'Home', to: '/', end: true },
  { label: 'Explore', to: '/explore' },
  { label: 'Categories', to: '/#categories', hash: true },
  { label: 'About', to: '/#about', hash: true },
]

const baseLink =
  'rounded-lg px-3 py-2 text-sm font-medium transition-colors'
const idleLink =
  'text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white'
const activeLink = 'text-primary dark:text-white'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-lg dark:border-slate-800 dark:bg-navy/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-secondary text-white shadow-md shadow-primary/30">
            <PenLine className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-bold">BlogSphere</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) =>
            link.hash ? (
              <Link key={link.label} to={link.to} className={`${baseLink} ${idleLink}`}>
                {link.label}
              </Link>
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? activeLink : idleLink}`
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link to="/register">
            <Button>Get started</Button>
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="cursor-pointer rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-navy md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={closeMenu}
                className={`${baseLink} ${idleLink} text-base`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link to="/login" onClick={closeMenu}>
              <Button variant="secondary" className="w-full">Log in</Button>
            </Link>
            <Link to="/register" onClick={closeMenu}>
              <Button className="w-full">Get started</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}