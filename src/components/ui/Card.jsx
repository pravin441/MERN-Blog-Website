export default function Card({ children, hover = false, className = '', ...props }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-navy-light ${
        hover
          ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}