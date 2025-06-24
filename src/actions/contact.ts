"use server"

export async function sendContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    // Basic validation for presence
    if (!name || !email || !message) {
      return { error: "Please fill out all fields." }
    }

    console.log("Sending message: \n\n", { name, email, message })

    // Send to Discord webhook if URL is available
    if (process.env.DISCORD_CONTACT_WEBHOOK_URL) {
      try {
        const discordMessage = {
          embeds: [
            {
              title: "New Contact Form Submission",
              color: 3447003, // Blue color
              fields: [
                { name: "Name", value: name, inline: true },
                { name: "Email", value: email, inline: true },
                { name: "Message", value: message },
              ],
            },
          ],
        }

        const response = await fetch(
          process.env.DISCORD_CONTACT_WEBHOOK_URL,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(discordMessage),
          }
        )

        if (!response.ok) {
          console.error("Error sending to Discord:", await response.text())
          return { error: "An error occurred while sending your message." }
        }
      } catch (error) {
        console.error("Discord webhook error:", error)
        return { error: "An error occurred while sending your message." }
      }
    } else {
      console.log("Discord webhook URL not configured. Skipping notification.")
    }

    return { message: "Your message has been sent successfully!" }
  } catch {
    return { error: "An error occurred while sending your message." }
  }
}