import { forwardRef, useState } from 'react'
import { Eye, EyeOff, Lock } from 'lucide-react'
import Input from './Input'

const PasswordInput = forwardRef(function PasswordInput(props, ref) {
  const [show, setShow] = useState(false)

  return (
    <Input
      ref={ref}
      type={show ? 'text' : 'password'}
      icon={Lock}
      rightElement={
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="cursor-pointer text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
        >
          {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      }
      {...props}
    />
  )
})

export default PasswordInput