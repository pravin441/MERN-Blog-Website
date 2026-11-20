import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { formatDate } from '../../utils/formatDate'

export default function BlogCard({ blog }) {
  const { slug, title, description, category, author, date, readingTime, cover } = blog

  return (
    <Link
      to={`/blog/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-navy-light"
    >
      <div className={`h-44 w-full ${cover} transition-transform duration-500 group-hover:scale-105`} />

      <div className="flex flex-1 flex-col p-6">
        <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-blue-300">
          {category}
        </span>

        <h3 className="mt-3 font-display text-xl font-bold leading-snug transition-colors group-hover:text-primary">
          {title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-5 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br from-primary to-secondary text-xs font-bold text-white">
              {author.charAt(0)}
            </span>
            <div>
              <p className="font-medium text-slate-700 dark:text-slate-200">{author}</p>
              <p>{formatDate(date)}</p>
            </div>
          </div>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {readingTime} min read
          </span>
        </div>
      </div>
    </Link>
  )
}