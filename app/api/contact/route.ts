import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/rate-limit";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "ayushbhadani0915@gmail.com";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  // Server-side rate limiting: 3 requests per 10 minutes per IP
  const rateLimit = checkRateLimit(request, {
    prefix: "contact",
    windowMs: 10 * 60 * 1000,
    maxRequests: 3,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many contact messages sent. Please try again in 10 minutes." },
      { status: 429 }
    );
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[contact] Missing RESEND_API_KEY environment variable.");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const body = await request.json();
    const { name, email, subject, message, website, company } = body as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
      website?: string;
      company?: string;
    };

    // Honeypot bot protection check
    if (website?.trim() || company?.trim()) {
      return NextResponse.json({ success: true });
    }

    // Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeSubject = subject?.trim() ? escapeHtml(subject.trim()) : "";
    const safeMessage = escapeHtml(message.trim());

    const emailSubject = subject?.trim()
      ? `Portfolio contact: ${subject.trim()}`
      : `Portfolio contact from ${name.trim()}`;

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: email.trim(),
      subject: emailSubject,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="margin-bottom: 4px; font-size: 18px;">New message from your portfolio</h2>
          <p style="margin: 0 0 20px; font-size: 13px; color: #666;">Sent via ayushkr-bhadani.vercel.app/contact</p>
          <table style="width:100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 12px; background: #f5f5f5; font-weight: 600; width: 90px; border-radius: 4px 0 0 4px;">Name</td>
              <td style="padding: 8px 12px; background: #fafafa; border-radius: 0 4px 4px 0;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f5f5f5; font-weight: 600; border-radius: 4px 0 0 4px;">Email</td>
              <td style="padding: 8px 12px; background: #fafafa; border-radius: 0 4px 4px 0;"><a href="mailto:${safeEmail}" style="color: #4f46e5;">${safeEmail}</a></td>
            </tr>
            ${
              safeSubject
                ? `<tr>
              <td style="padding: 8px 12px; background: #f5f5f5; font-weight: 600; border-radius: 4px 0 0 4px;">Subject</td>
              <td style="padding: 8px 12px; background: #fafafa; border-radius: 0 4px 4px 0;">${safeSubject}</td>
            </tr>`
                : ""
            }
          </table>
          <div style="background: #f9f9f9; border-left: 3px solid #4f46e5; padding: 16px 20px; border-radius: 0 6px 6px 0; font-size: 14px; line-height: 1.65; white-space: pre-wrap;">${safeMessage}</div>
          <p style="margin-top: 24px; font-size: 12px; color: #999;">Reply to this email to respond directly to ${safeName}.</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
