'use client'

import { signInWithPassword, signUpWithPassword, resetPassword } from "@/actions/auth"
import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useIsMobile } from "@/hooks/use-mobile"
import Logo from "@/icons/Logo"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const resetFormSchema = z.object({
  email: z.string().email(),
})

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isSignUp, setIsSignUp] = useState(false)
  const [resetDialogOpen, setResetDialogOpen] = useState(false)
  const [resetSuccess, setResetSuccess] = useState<string | null>(null)
  const [resetError, setResetError] = useState<string | null>(null)
  const isMobile = useIsMobile()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const resetForm = useForm<z.infer<typeof resetFormSchema>>({
    resolver: zodResolver(resetFormSchema),
    defaultValues: {
      email: "",
    },
  })

  const {
    formState: { isSubmitting },
  } = form

  const {
    formState: { isSubmitting: isResetSubmitting },
  } = resetForm
  const handleAuth = async (values: z.infer<typeof formSchema>) => {
    setError(null)
    const formData = new FormData()
    formData.append("email", values.email)
    formData.append("password", values.password)

    const result = isSignUp
      ? await signUpWithPassword(formData)
      : await signInWithPassword(formData)

    if (result?.error) {
      setError(result.error)
    }
  }

  const handleResetPassword = async (values: z.infer<typeof resetFormSchema>) => {
    setResetError(null)
    setResetSuccess(null)
    
    const formData = new FormData()
    formData.append("email", values.email)

    const result = await resetPassword(formData)

    if (result?.error) {
      setResetError(result.error)
    } else if (result?.success) {
      setResetSuccess(result.success)
      resetForm.reset()
      setTimeout(() => {
        setResetDialogOpen(false)
        setResetSuccess(null)
      }, 3000)
    }
  }

  const AuthForm = (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </Alert>
      )}

      <form onSubmit={form.handleSubmit(handleAuth)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            disabled={isSubmitting}
            {...form.register("email")}
          />
        </div>        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            required
            disabled={isSubmitting}
            minLength={6}
            {...form.register("password")}
          />
          {!isSignUp && (
            <div className="text-right">
              <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="link" className="p-0 h-auto text-xs text-muted-foreground hover:text-foreground">
                    Forgot password?
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Reset Password</DialogTitle>
                    <DialogDescription>
                      Enter your email address and we&apos;ll send you a link to reset your password.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    {resetError && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <span>{resetError}</span>
                      </Alert>
                    )}
                    {resetSuccess && (
                      <Alert>
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{resetSuccess}</span>
                      </Alert>
                    )}
                    <form onSubmit={resetForm.handleSubmit(handleResetPassword)} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="reset-email">Email</Label>
                        <Input
                          id="reset-email"
                          type="email"
                          placeholder="Enter your email address"
                          required
                          disabled={isResetSubmitting || resetSuccess !== null}
                          {...resetForm.register("email")}
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isResetSubmitting || resetSuccess !== null}
                      >
                        {isResetSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Send Reset Link
                      </Button>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
      </form>

      <div className="mt-4 text-center text-sm">
        {isSignUp ? (
          <>
            <span className="text-muted-foreground">Already have an account?</span>{" "}
            <Button
              variant="link"
              onClick={() => setIsSignUp(false)}
              className="p-0 h-0"
              disabled={isSubmitting}
            >
              Sign In
            </Button>
          </>
        ) : (
          <>
            <span className="text-muted-foreground">Don&apos;t have an account?</span>{" "}
            <Button
              variant="link"
              onClick={() => setIsSignUp(true)}
              className="p-0 h-0"
              disabled={isSubmitting}
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <div className="size-full bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="size-full bg-gradient-to-br from-background to-muted">
      <div className="size-full flex items-center justify-center flex-col space-y-8 p-4 md:p-0">
        <Logo />
        {isMobile ? (
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-1.5">
              <h1 className="text-2xl font-bold">
                {isSignUp ? "Create an Account" : "Welcome Back"}
              </h1>
              <p className="text-muted-foreground">
                {isSignUp
                  ? "Enter your details to create an account"
                  : "Sign in to manage your servers"}
              </p>
            </div>
            {AuthForm}
          </div>
        ) : (
          <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {isSignUp ? "Create an Account" : "Welcome Back"}
              </CardTitle>
              <CardDescription>
                {isSignUp
                  ? "Enter your details to create an account"
                  : "Sign in to manage your servers"}
              </CardDescription>
            </CardHeader>
            <CardContent>{AuthForm}</CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
