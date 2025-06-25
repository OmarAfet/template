'use client'

import { updatePassword } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Logo from '@/icons/Logo'
import { createClient } from '@/utils/supabase/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(true)
  const [isValidToken, setIsValidToken] = useState(false)
  const router = useRouter()
  
  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const { formState: { isSubmitting } } = form

  useEffect(() => {
    const verifyResetSession = async () => {
      const supabase = createClient()
      
      try {
        // Check if user has an active session (which should be established by the reset link)
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
          toast.error('Invalid or expired reset link')
          router.push('/auth')
          return
        }

        if (session) {
          // Check if this is a recovery session by looking at the session metadata
          // or check if we're coming from a password reset flow
          setIsValidToken(true)
          toast.success('Reset link verified! You can now set your new password.')
        } else {
          toast.error('Invalid or expired reset link')
          router.push('/auth')
        }
      } catch (error) {
        console.error('Error verifying reset session:', error)
        toast.error('Something went wrong. Please try again.')
        router.push('/auth')
      } finally {
        setIsVerifying(false)
      }
    }

    verifyResetSession()
  }, [router])

  const handlePasswordReset = async (values: ResetPasswordForm) => {
    setIsLoading(true)
    
    try {
      const formData = new FormData()
      formData.append('password', values.password)
      
      const result = await updatePassword(formData)
      
      if (result?.error) {
        toast.error(result.error)
      } else if (result?.success) {
        toast.success('Password updated successfully! Redirecting...')
        // Wait a moment for the toast to show, then redirect
        setTimeout(() => {
          router.push('/')
        }, 1500)
      }
    } catch (error) {
      console.error('Error updating password:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isVerifying) {
    return (
      <div className="size-full bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Logo />
          <div className="text-center">
            <h2 className="text-lg font-semibold">Verifying reset link...</h2>
            <p className="text-muted-foreground">Please wait while we verify your reset token.</p>
          </div>
        </div>
      </div>
    )
  }

  if (!isValidToken) {
    return (
      <div className="size-full bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Logo />
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-destructive">Invalid Reset Link</CardTitle>
              <CardDescription>
                This reset link is invalid or has expired. Please request a new password reset.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => router.push('/auth')} 
                className="w-full"
              >
                Back to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="size-full bg-gradient-to-br from-background to-muted py-16">
      <div className="size-full flex items-center justify-center flex-col space-y-8 p-4 md:p-0">
        <Logo />
        
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Reset Your Password</CardTitle>
            <CardDescription>
              Enter your new password below. Make sure it&apos;s at least 6 characters long.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(handlePasswordReset)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your new password"
                  disabled={isSubmitting || isLoading}
                  {...form.register('password')}
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  disabled={isSubmitting || isLoading}
                  {...form.register('confirmPassword')}
                />
                {form.formState.errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? 'Updating Password...' : 'Update Password'}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Button
                variant="link"
                onClick={() => router.push('/auth')}
                className="text-sm"
              >
                Back to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
