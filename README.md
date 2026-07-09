# Ayush Kumar Bhadani — Technical Portfolio

A premium, highly-optimized developer portfolio built with **Next.js 16 (App Router)** and **TypeScript**, showcasing data science, AI/ML engineering, and software development projects.

Live Version: [ayushkr-bhadani.vercel.app](https://ayushkr-bhadani.vercel.app)

---

## 🚀 Key Features

* **AI Chatbot Agent:** An interactive chat interface grounded in a structured Markdown context of the portfolio, utilizing the **OpenRouter API** to answer queries dynamically.
* **Interactive Projects Carousel:** A custom, responsive 3D-rail carousel built with **Framer Motion** that adapts card dimensions dynamically to eliminate clipping on mobile viewports.
* **Real Contact Form:** Backed by a secure Next.js API route (`/api/contact`) that integrates with the **Resend API** to deliver emails with direct reply-to support.
* **Full SEO Infrastructure:** Includes dynamically generated `sitemap.xml`, `robots.txt`, Web App manifest, JSON-LD Schema (Person structured data), and dynamic OpenGraph/Twitter social preview images (`ImageResponse`).
* **Visitor Count Tracker:** Integrates a live presence and session-based counter mechanism.
* **Static Skill Badge Tiers:** Displays technical skill categories grouped vertically with horizontal dividers. Icons are mapped for real-product tools, and conceptual techniques are presented in clean monospace text chips.

---

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router, Turbopack)
* **Language:** TypeScript
* **Styling:** Tailwind CSS, Lucide Icons, Custom CSS variables
* **Animations:** Framer Motion
* **Services:**
  * [OpenRouter](https://openrouter.ai) (LLM Chatbot)
  * [Resend](https://resend.com) (Email delivery backend)
  * [Ably](https://ably.com) (Real-time visitor presence)

---

## ⚙️ Environment Variables Configuration

To run the application locally or deploy it to production (e.g., Vercel), configure the following environment variables. A template is provided in `.env.example`:

```ini
# ─── AI Chatbot (OpenRouter) ───
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=openrouter/free # Or any slug from openrouter.ai/models

# ─── Live Visitor Presence (Ably) ───
ABLY_API_KEY=your_ably_api_key_here

# ─── GitHub Tokens (Optional, lifts API rate limits) ───
GITHUB_TOKEN=your_github_token_here

# ─── Contact Form (Resend) ───
RESEND_API_KEY=your_resend_api_key_here
CONTACT_TO_EMAIL=ayushbhadani0915@gmail.com
```

---

## 💻 Local Development

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Ayush0915/portfolio.git
   cd portfolio
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Local Environment:**
   Create a `.env.local` file by copying the template:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your API keys in `.env.local`.

4. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

5. **Build for Production:**
   ```bash
   npm run build
   ```
