"use client"

import { sendContactForm } from "@/actions/contact"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { useActionState } from "react"

const initialState: ActionResponse = {
  success: false,
  message: '',
}

export default function ContactPage() {
  const [state, action, isPending] = useActionState(
    sendContactForm,
    initialState
  )

  return (
    <Card className="max-w-md mx-auto p-6">
      <div>
        <h1 className="text-2xl font-bold">Contact Us</h1>
        <p className="text-muted-foreground text-sm mt-2">Feel free to reach out with questions or feedback using this contact form. <span className="text-[10px] italic">(it is real form)</span></p>
      </div>

      <form action={action} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your name"
            minLength={2}
            maxLength={64}
            required
          />
          {state?.errors?.name && (
            <p className="text-sm text-red-500">{state.errors.name[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
          {state?.errors?.email && (
            <p className="text-sm text-red-500">{state.errors.email[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Enter your message"
            minLength={10}
            maxLength={5000}
            rows={5}
            required
          />
          {state?.errors?.message && (
            <p className="text-sm text-red-500">{state.errors.message[0]}</p>
          )}
        </div>

        {state?.success && (
          <Alert variant="default">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        {state?.message && !state.success && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Card>
  )
}
