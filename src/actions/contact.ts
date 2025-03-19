"use server"

import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2).max(64),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
})

export async function sendContactForm(_prevState: ActionResponse | null, formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    }

    const validatedData = contactSchema.safeParse(rawData)

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Please fix the errors in the form',
        errors: validatedData.error.flatten().fieldErrors,
      }
    }

    console.log("Sending message: \n\n", validatedData.data)

    // Send to Discord webhook if URL is available
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        const { name, email, message } = validatedData.data;
        
        // Format the message for Discord
        const discordMessage = {
          embeds: [
            {
              title: "New Contact Form Submission",
              color: 3447003, // Blue color
              fields: [
                {
                  name: "Name",
                  value: name,
                  inline: true
                },
                {
                  name: "Email",
                  value: email,
                  inline: true
                },
                {
                  name: "Message",
                  value: message
                }
              ],
            }
          ]
        };

        const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(discordMessage),
        });

        if (!response.ok) {
          console.error("Error sending to Discord:", await response.text());
        }
      } catch (error) {
        console.error("Discord webhook error:", error);
      }
    } else {
      console.log("Discord webhook URL not configured. Skipping notification.");
    }

    return {
      success: true,
      message: "Your message has been sent",
    }
  } catch {
    return {
      success: false,
      message: "An error occurred while sending your message",
    }
  }
}