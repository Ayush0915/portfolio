import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { checkRateLimit } from '@/lib/rate-limit';

// ─── Types ────────────────────────────────────────────────────────────────

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}


// ─── Portfolio Context Loader ─────────────────────────────────────────────

function loadPortfolioContext(): string {
  try {
    const contextPath = path.join(process.cwd(), 'lib', 'portfolio-context.md');
    const context = fs.readFileSync(contextPath, 'utf-8');
    return context;
  } catch (error) {
    console.error('Failed to load portfolio context:', error);
    throw new Error(
      'Portfolio context file not found. Ensure lib/portfolio-context.md exists.'
    );
  }
}

// ─── POST Handler ──────────────────────────────────────────────────────────

function generateMockChatbotResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase().trim();

  if (/^(hi+|hello|hey+|hola|greetings)\b/.test(msg)) {
    return `Hey there! 👋 How can I help you today? Feel free to ask me about Ayush's projects (like CodeVerdict, CareerIQ, or Digital Wellbeing), his skills, or education!`;
  }

  if (msg.includes("codeverdict") || msg.includes("review") || msg.includes("verdict")) {
    return `He built CodeVerdict as a multi-agent AI code review system to automate pull request analysis. Here's what makes it notable:
• Built a multi-agent workflow with 4 specialized async agents (Security, Quality, Performance, Test Coverage) using asyncio
• Grounded agent outputs in secure-coding reference docs using Sentence Transformers and FAISS vector search
• Integrated Bandit static analysis with a deterministic merge-verification step
• Achieved 87.5% precision and 100% recall against a labeled PR benchmark suite

Would you like to explore the GitHub repository or the technical stack of CodeVerdict?`;
  }

  if (msg.includes("wellbeing") || msg.includes("digital") || msg.includes("wellness")) {
    return `He built the Digital Wellbeing Intelligence System to turn raw digital behavior data into wellness insights. Highlights:
• Engineered 4 behavioral metrics and normalized features to cut intra-cluster variance by 30%
• Built the pipeline using K-Means to segment users into 3 risk profiles with 85% consistency
• Processed 10K+ records with Pandas and NumPy, and automated Plotly dashboards
• Exposed async REST APIs in FastAPI with 200ms inference latency

Would you like to know more about the FastAPI backend or the K-Means clustering?`;
  }

  if (msg.includes("careeriq") || msg.includes("resume") || msg.includes("ats")) {
    return `He built CareerIQ as an AI resume intelligence platform. Here's what makes it notable:
• Used semantic similarity (all-MiniLM-L6-v2) for ATS scoring instead of keyword matching
• Built a skill-gap analysis ranking missing keywords by role criticality
• Shipped an AI career coach on Groq/Llama 3.3 responding under 500ms
• Dockerized the full stack (React + Vite + FastAPI) with live job matches

What would you like to know about its ATS scoring or the career coach tools?`;
  }

  if (msg.includes("project")) {
    return `He has built several high-impact AI/ML and full-stack projects. Here are the key ones:
• CodeVerdict — a multi-agent AI pull request review system
• Digital Wellbeing — an end-to-end ML wellness insight pipeline
• CareerIQ — an ATS resume intelligence and career coaching platform

Which of these projects would you like to dive into first?`;
  }

  if (msg.includes("skill") || msg.includes("tech") || msg.includes("lang") || msg.includes("tool")) {
    return `He works primarily with Python, PyTorch, LangChain, and database/AI tools. His technical toolkit:
• Languages — Python, C++, C, SQL, Java
• AI/ML & NLP — PyTorch, TensorFlow, Transformers, LLMs, LangChain, LlamaIndex, RAG, Agentic AI, scikit-learn
• Backend & DBs — FastAPI, MongoDB, MySQL, Git, GitHub
• Tools & Data — Pandas, NumPy, Plotly, Streamlit, Docker, VS Code

What specific tech stack area would you like to explore?`;
  }

  if (msg.includes("cgpa") || msg.includes("gpa")) {
    return `Ayush Kumar Bhadani has an overall CGPA of 9.45 at Bangalore Institute of Technology.
• Current overall CGPA — 9.45
• Program — CSE (Data Science)
• Status — Final-year B.Tech student

Would you like to hear about his relevant coursework or projects?`;
  }

  if (msg.includes("education") || msg.includes("college") || msg.includes("vtu") || msg.includes("school") || msg.includes("bangalore")) {
    return `He is pursuing a B.Tech in CSE (Data Science) at Bangalore Institute of Technology. Highlights:
• Current overall CGPA of 9.45
• Coursework includes DSA, OOP, DBMS, OS, Networks, and ML
• Graduating class of 2027

Would you like to hear more about his academic background or college coursework?`;
  }

  if (msg.includes("contact") || msg.includes("email") || msg.includes("linkedin") || msg.includes("connect") || msg.includes("reach")) {
    return `You can get in touch with him directly using these details:
• Email — ayushbhadani0915@gmail.com
• GitHub — github.com/Ayush0915
• LinkedIn — linkedin.com/in/ayush-kumar-bhadani-78558a21a

Would you like to email him directly or connect on LinkedIn?`;
  }

  return `He is a final-year CS (Data Science) student who builds production-ready AI systems. Here's how you can learn more about him:
• Ask about his projects like CodeVerdict, CareerIQ, or Digital Wellbeing
• Ask about his technical skills in Python, ML, RAG, and FastAPI
• Ask about his education, achievements, or contact info

What specific topic can I help you explore?`;
}

export async function POST(request: NextRequest) {
  // Server-side rate limiting: 5 requests per minute per IP
  const rateLimit = checkRateLimit(request, {
    prefix: 'chat',
    windowMs: 60 * 1000,
    maxRequests: 5,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many chat requests. Please wait a minute before trying again.' },
      { status: 429 }
    );
  }

  try {
    // Parse request body
    const { messages } = (await request.json().catch(() => ({}))) as { messages: ChatMessage[] };

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'No messages provided' },
        { status: 400 }
      );
    }

    const userQuery = messages[messages.length - 1]?.content || "";

    // Validate environment
    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL;

    if (!apiKey || !model) {
      console.warn("OpenRouter keys missing. Using local fallback chatbot response.");
      const responseText = generateMockChatbotResponse(userQuery);
      return NextResponse.json({
        success: true,
        message: responseText,
        isMock: true
      });
    }

    // Load portfolio context
    const portfolioContext = loadPortfolioContext();

    // Build system prompt with portfolio context
    const systemPrompt = `You are a helpful assistant representing Ayush Kumar Bhadani, a final-year CSE (Data Science) student (9.45 CGPA) and AI/ML builder.
You have access to their complete portfolio context below. Answer questions about their education,
projects, skills, and background based on this information. Be conversational, friendly, light in tone, and accurate.

CRITICAL INSTRUCTION FOR CGPA/GPA QUESTIONS:
- If the user asks about his CGPA, GPA, grade, or score, answer directly and concisely: "Ayush Kumar Bhadani has an overall CGPA of 9.45 at Bangalore Institute of Technology." followed by 2-3 short bullet points (e.g., Program: CSE Data Science, Status: Final-year). Do NOT write long paragraphs or extra fluff. Keep it extremely brief.

---

RESPONSE FORMAT (THIS IS MANDATORY FOR ALMOST ALL RESPONSES):
1. Start with 1-2 sentences setting context (conversational paragraph)
2. Add bullet points (•) for 2-4 key items/concepts
3. End with 1 sentence wrapping up or asking a follow-up question

THIS FORMAT IS YOUR DEFAULT. Use it for 90% of responses.

DETAILED FORMATTING GUIDELINES:

STRUCTURE:
- Opening: 1-2 sentences only. Set context naturally. Example: "He's got a diverse toolkit depending on what he's building."
- Blank line after opening
- Bullets: 2-4 bullets max, each on its own line
- Blank line after bullets
- Closing: 1 sentence. Ask a question or invite exploration. Example: "What area interests you most?"

BULLET POINT RULES:
- Use bullet symbol (•) with a space: "• Text here"
- One concept per bullet, never combine ideas
- Keep each bullet to 1 line maximum (10-15 words)
- No periods at end of bullets
- No parentheses or complex explanations
- Format: "• [Who/What] [Action] [Context]"

CORRECT BULLET EXAMPLES:
- "• Built a 4-agent async code review pipeline"
- "• Ran RAG over docs using FAISS and embeddings"
- "• Hit 87.5% precision on the benchmark suite"

INCORRECT BULLET EXAMPLES:
- "• Did many things including building services and integrating payments" (too long, combines too much)
- "• Services." (too vague)
- "• Complex microservices (which was really hard)" (unnecessary explanation)

SPACING & LAYOUT:
- One blank line between opening and bullets
- One blank line between bullets and closing
- No extra spacing within bullets
- Keep total response compact (~100-150 words max)

OPENING SENTENCE PATTERNS (use naturally):
- "He's got solid hands-on experience with..."
- "On [project name], he mainly focused on..."
- "On the [topic] side, he..."
- "That's a great question. He mainly..."
- "Definitely. He's known for..."

CLOSING SENTENCE PATTERNS (always ask something):
- "Want to know more about that?"
- "What interests you most about this?"
- "Any specific part you'd like to explore?"
- "How does that compare to what you expected?"
- "Which area resonates most?"

FORMATTING FOR DIFFERENT CONTENT:

For Projects:
"He built [project] to [solve problem]. Here's what made it notable:
• [Technical achievement]
• [User/impact metric]
• [Key technology]
What aspect interests you?"

For Education:
"He's currently pursuing [degree] at [institution]. Highlights:
• [Achievement 1]
• [Achievement 2]
• [Coursework/focus area]
Want to know more about that?"

For Skills/Tech:
"He works primarily with [main techs]. His toolkit:
• [Category] — [2-3 tech names]
• [Category] — [2-3 tech names]
• [Category] — [2-3 tech names]
What's your interest - [option 1], [option 2], or [option 3]?"

ABSOLUTE RULES:
- NO asterisks (*) for emphasis or lists
- NO hashes (#) for headers
- NO dashes (-) as bullet markers
- NO em-dashes (—) or double dashes (--)
- NO long paragraphs after bullets
- NO more than 4 bullets total
- NO backticks for tech names
- NO ALL CAPS emphasis

${portfolioContext}

---

Behavior Guidelines:
- CRITICAL: Keep responses to 2-3 key points MAXIMUM
- Write like you're having a conversation
- End with a question or invitation to explore more
- DO NOT enumerate everything. Be deliberately selective
- Skip project names unless directly relevant
- Skip dates and company names unless asked
- If asked about something not in context, say "I don't have that information"`;

    // Prepare messages for API
    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages,
    ];

    // Call OpenRouter API
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'HTTP-Referer': process.env.VERCEL_URL || 'http://localhost:3000',
          'X-Title': 'Ayush Bhadani Portfolio Chatbot',
        },
        body: JSON.stringify({
          model: model,
          messages: apiMessages,
          temperature: 0.7,
          max_tokens: 1024,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData?.error?.message || `API error: ${response.status}`;
      console.error('OpenRouter API error:', errorMessage);
      console.warn("Falling back to local chatbot responder.");
      const responseText = generateMockChatbotResponse(userQuery);
      return NextResponse.json({
        success: true,
        message: responseText,
        isMock: true,
        apiError: errorMessage
      });
    }

    const data: OpenRouterResponse = await response.json();

    if (
      !data.choices ||
      !data.choices[0] ||
      !data.choices[0].message ||
      !data.choices[0].message.content
    ) {
      return NextResponse.json(
        { error: 'Invalid response format from API' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: data.choices[0].message.content,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Chat API error:', errorMessage);
    
    // Attempt local fallback even in case of general try-catch crash
    try {
      const body = (await request.json().catch(() => ({}))) as { messages: ChatMessage[] };
      const query = body?.messages?.[body.messages.length - 1]?.content || "";
      const fallbackText = generateMockChatbotResponse(query);
      return NextResponse.json({
        success: true,
        message: fallbackText,
        isMock: true,
        crashError: errorMessage
      });
    } catch {
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }
  }
}
