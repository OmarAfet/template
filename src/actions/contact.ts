"use server";

import { formSchema } from "@/schemas";
import { z } from "zod";

export async function sendContact(
  formData: z.infer<typeof formSchema>,
): Promise<ContactResponse> {
  const payload = {
    embeds: [
      {
        title: formData.subject,
        description: formData.message,
      },
    ],
    username: formData.email,
  };

  const response = await fetch(
    process.env.DISCORD_CONTACT_WEBHOOK_URL as string,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (response.ok) {
    return { status: true, message: "Message sent successfully" };
  } else {
    return { status: false, message: "Failed to send message" };
  }
}
