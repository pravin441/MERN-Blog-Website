import { forwardRef } from 'react'

const Input = forwardRef(function Input(
  { label, error, icon: Icon, rightElement, id, className = '', ...props },
  ref
) {
  const inputId = id || props.name

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
        )}

        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? 'true' : 'false'}
          className={`w-full rounded-xl border bg-white py-2.5 text-sm text-navy placeholder:text-slate-400 transition focus:outline-none focus:ring-2 dark:bg-navy-light dark:text-slate-100 ${
            Icon ? 'pl-10' : 'pl-4'
          } ${rightElement ? 'pr-11' : 'pr-4'} ${
            error
              ? 'border-red-400 focus:ring-red-200 dark:focus:ring-red-900'
              : 'border-slate-300 focus:border-primary focus:ring-primary/20 dark:border-slate-600'
          } ${className}`}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>

      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  )
})

export default Input