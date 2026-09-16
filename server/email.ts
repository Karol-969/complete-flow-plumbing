import nodemailer, { type Transporter } from "nodemailer";

// Gmail SMTP credentials come from environment variables so no secret lives in
// the repo. Set these in Render → Environment:
//   MAIL_USER = completeflowplumbing@gmail.com
//   MAIL_PASS = <Gmail App Password (NOT your normal password)>
// Website leads are always delivered to the client-requested business inbox.
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;
// info@ auto-forwards to sam@ and david@ (configured in Google Admin), so
// it is the single distribution point for leads. IMPORTANT: MAIL_USER must
// NOT be sam@ or david@ — Gmail suppresses the forwarded copy of a message
// the same account sent (files it under Sent only), so that person would
// never see leads in their inbox. Use a dedicated sender like website@.
const WEBSITE_LEAD_RECIPIENT = "info@completeflowplumbing.com.au";
// Leads appear to come from the business domain. Note: Gmail only honours
// this From address if the authenticated MAIL_USER account has it verified
// under Settings → Accounts → "Send mail as"; otherwise Gmail rewrites the
// From back to MAIL_USER.
const WEBSITE_SENDER = "website@completeflowplumbing.com.au";

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (!MAIL_USER || !MAIL_PASS) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: MAIL_USER, pass: MAIL_PASS },
    });
  }
  return transporter;
}

/**
 * Emails a website lead (quote/contact) to the business inbox via Gmail.
 * Returns whether SMTP accepted the message so the form can show an honest
 * success or failure state to the customer.
 */
export async function sendLeadEmail(
  subject: string,
  fields: Record<string, string>,
): Promise<boolean> {
  const t = getTransporter();
  if (!t) {
    console.log(
      "[email] MAIL_USER/MAIL_PASS not set — skipping email. Lead:",
      JSON.stringify(fields),
    );
    return false;
  }

  const text = Object.entries(fields)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px">
      <h2 style="color:#0a66c2;margin:0 0 12px">${subject}</h2>
      <table style="border-collapse:collapse;width:100%">
        ${Object.entries(fields)
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 14px 6px 0;font-weight:bold;color:#0b1220;vertical-align:top">${k}</td><td style="padding:6px 0;color:#333">${v}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin-top:16px;color:#888;font-size:12px">Sent from completeflowplumbing.com.au</p>
    </div>`;

  const replyTo =
    fields.Email && fields.Email !== "(not provided)" ? fields.Email : undefined;

  try {
    await t.sendMail({
      from: `"Complete Flow Plumbing Website" <${WEBSITE_SENDER}>`,
      to: WEBSITE_LEAD_RECIPIENT,
      replyTo,
      subject,
      text,
      html,
    });
    console.log("[email] sent:", subject);
    return true;
  } catch (err) {
    console.error("[email] send failed:", err);
    return false;
  }
}
