import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Mail } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import PasswordInput from '../components/ui/PasswordInput'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    // Temporary: simulates a server call. We replace this with a real API call in Module 02.
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Login form data:', data)
    toast.success('Form is valid! Backend login comes in Module 02.')
  }

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-linear-to-br from-primary/10 via-white to-secondary/10 px-4 py-12 dark:from-primary/20 dark:via-navy dark:to-secondary/20">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-display text-4xl font-bold">Welcome back</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Log in to manage your stories.
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Enter a valid email address',
                },
              })}
            />

            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />

            <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
              Log in
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-primary hover:underline">
              Create one
            </Link>
          </p>
        </Card>
      </div>
    </section>
  )
}