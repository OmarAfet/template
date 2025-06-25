"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function signInWithPassword(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return {
            error: error.message,
        }
    }

    revalidatePath("/", "layout")
    redirect("/")
}

export async function signUpWithPassword(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        return {
            error: error.message,
        }
    }

    revalidatePath("/", "layout")
    redirect("/")
}

export async function resetPassword(formData: FormData) {
    const email = formData.get("email") as string
    const supabase = await createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
    })

    if (error) {
        return {
            error: error.message,
        }
    }

    return {
        success: "Check your email for a password reset link",
    }
}

export async function updatePassword(formData: FormData) {
    const password = formData.get("password") as string
    const supabase = await createClient()

    const { error } = await supabase.auth.updateUser({
        password: password,
    })

    if (error) {
        return {
            error: error.message,
        }
    }

    return {
        success: "Password updated successfully",
    }
}

export async function signOut() {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
        return {
            error: error.message,
        }
    }

    revalidatePath("/", "layout")
    redirect("/auth")
}
