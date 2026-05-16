export const formEmailRecipient =
  process.env.NEXT_PUBLIC_FORM_EMAIL_RECIPIENT || "hopeinternationaltutoracademy@gmail.com";

const formEmailEndpoint = "https://flowform.to/submit";

type SendFormEmailOptions = {
  formName: string;
  subject: string;
  fields: Record<string, FormDataEntryValue>;
};

export async function sendFormEmail({ formName, subject, fields }: SendFormEmailOptions) {
  const emailData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    if (typeof value === "string") {
      emailData.append(key, value);
    }
  });

  const replyTo = fields.email;

  emailData.append("_to", formEmailRecipient);
  emailData.append("formType", formName);
  emailData.append("submittedAt", new Date().toISOString());
  emailData.append("_subject", subject);

  if (typeof replyTo === "string" && replyTo.trim()) {
    emailData.append("_replyto", replyTo);
  }

  const response = await fetch(formEmailEndpoint, {
    method: "POST",
    headers: {
      Accept: "application/json"
    },
    body: emailData
  });

  if (!response.ok) {
    throw new Error("Unable to send the email notification right now.");
  }
}
