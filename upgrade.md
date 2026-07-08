# Portfolio — Required Changes

Nothing in your actual repo has been touched. This file documents exactly what to change, with copy-paste-ready code. Apply top to bottom.

---

## 1. Remove the fabricated IoT achievement

**Why:** Confirmed this was invented content, not something you actually did. It's now removed from the plan entirely — three files, three edits.

### `lib/data.ts`

**Delete this whole object from the `experiences` array:**
```ts
{
  role: "IoT System Developer (Exhibition)",
  organization: "Bangalore Institute of Technology",
  period: "2024",
  location: "Bangalore, Karnataka",
  bullets: [
    "Designed and engineered an automated solar panel cleaning mechanism using Arduino microcontrollers and dust feedback sensors.",
    "Programmed motor driver control loops to automatically trigger cleaning sweeps, increasing energy efficiency constraints.",
    "Awarded the Consolation Prize in the annual college-wide technical IoT Exhibition.",
  ],
  stack: ["C++", "Arduino IDE", "Embedded C", "Hardware Prototyping"],
},
```

**Delete this whole object from the `achievements` array:**
```ts
{
  title: "IoT Exhibition Consolation Prize",
  period: "2024",
  description: "Honored with a consolation prize for the automated solar panel dust-cleaning feedback loop system.",
  category: "award",
},
```

### `components/JourneyTimeline.tsx`

**Delete the entire IoT card block** (search for the comment `{/* IoT Exhibition */}` — delete from that comment down through its closing `</div>`, roughly 40 lines, right before the section wraps up).

**Then update the icon import at the top of the file** — `Award` is only used by that block, so once it's gone the import will fail lint (unused import) unless removed:
```ts
// before
import { Briefcase, GraduationCap, Award, Calendar, MapPin } from "lucide-react";
// after
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
```

### `lib/portfolio-context.md`

This file feeds your AI chatbot's context — if you don't fix it, the chatbot will keep telling site visitors about an award you didn't get. Find and delete this line:
```
- **IoT Exhibition — Consolation Prize** — built an automated solar panel cleaning system with Arduino, motor control, and dust-sensor feedback.
```

---

## 2. Fix the contact form (currently fake) and route mail to your Gmail

**Why:** `ContactForm.tsx` currently does `await new Promise(resolve => setTimeout(resolve, 1500))` — a fake delay, no `fetch`, no API call. Every submission is silently discarded while the UI shows "sent." This replaces it with a real backend using **Resend** (free tier: 3,000 emails/month, 100/day, and — importantly — you don't need to verify a custom domain to send; Resend's shared `onboarding@resend.dev` address works for sending to any recipient, which is all you need here since it's just routing to your own inbox).

### Step 1 — Get a Resend API key
1. Sign up free at [resend.com](https://resend.com).
2. Dashboard → API Keys → Create API Key. Copy it.
3. No domain verification needed for this use case — you're sending *to* your Gmail, not sending marketing mail *from* a branded domain.

### Step 2 — Install the SDK
```bash
npm install resend
```

### Step 3 — Add the env var
In `.env.local` (and in Vercel → Project Settings → Environment Variables for production):
```
RESEND_API_KEY=re_your_key_here
CONTACT_TO_EMAIL=ayushbhadani0915@gmail.com
```

### Step 4 — New file: `app/api/contact/route.ts`
```ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !toEmail) {
      console.error("Contact route misconfigured: missing RESEND_API_KEY or CONTACT_TO_EMAIL");
      return NextResponse.json(
        { success: false, error: "Contact form is not configured yet. Please reach out via email directly." },
        { status: 500 }
      );
    }

    const body: ContactPayload = await request.json();
    const { name, email, subject, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject: subject?.trim() ? `[Portfolio] ${subject.trim()}` : `[Portfolio] New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <p><strong>From:</strong> ${name} (${email})</p>
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send message. Please try again or email directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
```

Note the `replyTo: email` — this means when you get the email in your Gmail and hit Reply, it goes straight to the person who contacted you, not back to `onboarding@resend.dev`.

### Step 5 — Replace `handleSubmit` in `components/ContactForm.tsx`

Replace the entire existing `handleSubmit` function with this (keep everything else in the file — state, JSX, styling — unchanged):

```ts
const [errorMessage, setErrorMessage] = useState<string | null>(null);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!name || !email || !message) return;

  setIsSubmitting(true);
  setErrorMessage(null);

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Failed to send message.");
    }

    setIsSuccess(true);
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  } catch (err) {
    setErrorMessage(
      err instanceof Error ? err.message : "Something went wrong. Please try again or email me directly."
    );
  } finally {
    setIsSubmitting(false);
  }
};
```

Add `errorMessage` to the top of the component alongside the existing `useState` declarations (already included above), and render it somewhere visible in the form JSX, e.g. right above the submit button:
```tsx
{errorMessage && (
  <p className="text-sm text-red-400 mb-3">{errorMessage}</p>
)}
```

### Step 6 — Verify
1. `npm run dev`, fill out the form locally, submit.
2. Check the Gmail inbox tied to `CONTACT_TO_EMAIL` — the message should land within seconds (check spam folder the first time, since it's sending from Resend's shared address rather than a verified domain).
3. Reply to that email directly and confirm it goes to the sender's address, not `onboarding@resend.dev`.
4. Once confirmed working locally, add the two env vars in Vercel and redeploy.

---

## 3. Project Index block — redesign options

You said the current block (the "01 / 02 / 03 / 04" list of buttons below the carousel in `components/ProjectsRail.tsx`) isn't landing. Since this is a style call rather than a bug, here are three concrete directions — pick whichever fits your taste, or tell me and I'll build it out fully:

**Option A — Dot/pill indicators only (minimal)**
Drop the text list entirely. Replace it with a row of small pill-shaped dots under the carousel (like Instagram Stories or a slideshow), active one wider/highlighted. Clicking a dot jumps to that project. Pairs well with the existing prev/next arrows — removes visual duplication since the project name/description already show in the text block beneath the carousel.

**Option B — Thumbnail filmstrip**
Replace the text-list grid with a horizontal row of small square/rounded thumbnails (mini versions of each project's screenshot) below the carousel. Clicking a thumbnail jumps to that project. More visual, reinforces the image-forward feel of the carousel itself, and scales cleanly to more projects later without the grid awkwardly wrapping.

**Option C — Tab pills with icons**
A single-row (not 2-column grid) of pill-shaped tabs, one per project, showing just the project name with a small tech-stack icon (e.g. Python/React logo) — no numbers, no "View" label, no description repeated. Closer to how modern SaaS landing pages do a features tab-switcher. Lowest visual weight, reads clean on both desktop and mobile without needing a grid-to-single-column breakpoint at all.

**My default recommendation:** Option A. It removes the redundant text (title/meta are already duplicated in both the index block and the text block below), fixes part of the mobile-overflow issue from the earlier audit for free (dots don't need a fixed pixel width the way the current button grid does), and is the lowest-code-risk change of the three.

---

## Summary checklist

- [ ] Remove IoT block from `lib/data.ts` (experiences + achievements)
- [ ] Remove IoT block from `components/JourneyTimeline.tsx` + clean up unused `Award` import
- [ ] Remove IoT line from `lib/portfolio-context.md`
- [ ] Sign up for Resend, get API key
- [ ] `npm install resend`
- [ ] Add `RESEND_API_KEY` + `CONTACT_TO_EMAIL` to `.env.local` and Vercel
- [ ] Add `app/api/contact/route.ts`
- [ ] Replace `handleSubmit` in `components/ContactForm.tsx`, add error state + error message UI
- [ ] Test locally, confirm email lands in Gmail, confirm Reply goes to sender
- [ ] Redeploy with env vars set in Vercel
- [ ] Pick a Project Index redesign option (A/B/C) and let me know if you want it built