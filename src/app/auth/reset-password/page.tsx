'use client'

import { updatePassword } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useIsMobile } from "@/hooks/use-mobile"
import Logo from "@/icons/Logo"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useIsMobile()
  const router = useRouter()
  const searchParams = useSearchParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const {
    formState: { isSubmitting, errors },
  } = form

  useEffect(() => {
    const accessToken = searchParams.get("access_token")
    const refreshToken = searchParams.get("refresh_token")
    
    if (!accessToken || !refreshToken) {
      toast.error("Invalid or expired reset link. Please request a new password reset.")
      setIsLoading(false)
      return
    }
    
    setIsLoading(false)
  }, [searchParams])

  const handleUpdatePassword = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData()
    formData.append("password", values.password)

    const result = await updatePassword(formData)

    if (result?.error) {
      toast.error(result.error)
    } else if (result?.success) {
      toast.success(`${result.success}. Redirecting to login...`)
      form.reset()
      setTimeout(() => {
        router.push("/auth")
      }, 3000)
    }
  }

  if (isLoading) {
    return (
      <div className="size-full bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  const ResetForm = (
    <div className="space-y-4">
      <form onSubmit={form.handleSubmit(handleUpdatePassword)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your new password"
            required
            disabled={isSubmitting}
            minLength={6}
            {...form.register("password")}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
            required
            disabled={isSubmitting}
            minLength={6}
            {...form.register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update Password
        </Button>
      </form>

      <div className="text-center">
        <Link 
          href="/auth" 
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Back to Login
        </Link>
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
              <h1 className="text-2xl font-bold">Reset Your Password</h1>
              <p className="text-muted-foreground">
                Enter your new password below
              </p>
            </div>
            {ResetForm}
          </div>
        ) : (
          <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Reset Your Password</CardTitle>
              <CardDescription>
                Enter your new password below
              </CardDescription>
            </CardHeader>
            <CardContent>{ResetForm}</CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="size-full bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  )
}
