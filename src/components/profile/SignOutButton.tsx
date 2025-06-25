'use client'

import { signOut } from '@/actions/auth'
import { Button } from '@/components/ui/button'

export function SignOutButton() {
  return (
    <Button onClick={() => signOut()} variant="outline" className="flex-1">
      Sign Out
    </Button>
  )
}
