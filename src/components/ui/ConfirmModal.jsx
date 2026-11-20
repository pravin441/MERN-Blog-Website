import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import Button from './Button'

export default function ConfirmModal({
  open,
  title,
  message,
  confirmText = 'Confirm',
  onConfirm,
  onCancel,
}) {
  // Close with the Escape key
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => e.key === 'Escape' && onCancel()
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 px-4"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-navy-light"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300">
          <AlertTriangle className="h-6 w-6" />
        </span>
        <h2 id="modal-title" className="mt-4 font-display text-xl font-bold">
          {title}
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}