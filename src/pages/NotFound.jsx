import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 text-center">
      <p className="font-display text-8xl font-bold text-primary">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold">Page not found</h1>
      <p className="mt-3 text-slate-500 dark:text-slate-400">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="mt-8 inline-block">
        <Button size="lg">Back to Home</Button>
      </Link>
    </div>
  )
}