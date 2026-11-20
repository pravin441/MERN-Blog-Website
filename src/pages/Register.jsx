import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Mail, User } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import PasswordInput from '../components/ui/PasswordInput'

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    // Temporary: simulates a server call. We replace this with a real API call in Module 02.
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Register form data:', data)
    toast.success('Form is valid! Backend registration comes in Module 02.')
  }

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-linear-to-br from-primary/10 via-white to-secondary/10 px-4 py-12 dark:from-primary/20 dark:via-navy dark:to-secondary/20">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-display text-4xl font-bold">Create your account</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Join BlogSphere and start publishing today.
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            <Input
              label="Full name"
              placeholder="Your full name"
              icon={User}
              error={errors.name?.message}
              {...register('name', {
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
                maxLength: {
                  value: 50,
                  message: 'Name must be under 50 characters',
                },
              })}
            />

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
              placeholder="At least 6 characters"
              error={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />

            <PasswordInput
              label="Confirm password"
              placeholder="Re-enter your password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === getValues('password') || 'Passwords do not match',
              })}
            />

            <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
              Create account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Log in
            </Link>
          </p>
        </Card>
      </div>
    </section>
  )
}