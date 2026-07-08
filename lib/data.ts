// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface Education {
  institution: string;
  degree: string;
  score: string;
  period: string;
  location: string;
  logo?: string; // place your logo in /public/logos/<filename>
  highlights?: string[];
}

export interface Project {
  name: string;
  slug: string;
  stack: string[];
  bullets: string[];
  imageSrc?: string;
  href?: string;
  githubUrl?: string;
  meta?: string;
  description?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface ContactInfo {
  name: string;
  github: string;
  githubUrl: string;
  linkedin?: string;
  linkedinUrl?: string;
  email: string;
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export const contact: ContactInfo = {
  name: "Ayush Kumar Bhadani",
  github: "Ayush0915",
  githubUrl: "https://github.com/Ayush0915",
  linkedin: "Ayush Kumar Bhadani",
  linkedinUrl: "https://www.linkedin.com/in/ayush-kumar-bhadani-78558a21a/",
  email: "ayushbhadani0915@gmail.com",
};

// ─── Education ────────────────────────────────────────────────────────────────

export const education: Education[] = [
  {
    institution: "Bangalore Institute of Technology",
    degree: "B.Tech, Computer Science & Engineering (Data Science)",
    score: "CGPA: 9.45",
    period: "2023 – 2027",
    location: "Bangalore, Karnataka",
    highlights: [
      "Coursework: DSA, OOP, DBMS, OS, Computer Networks, Machine Learning",
    ],
  },
  {
    institution: "Delhi Public School",
    degree: "Senior Secondary — Science (PCM)",
    score: "87.2%",
    period: "2022",
    location: "Ranchi, Jharkhand",
  },
  {
    institution: "St. Michael's School",
    degree: "Secondary Education",
    score: "95.6%",
    period: "2020",
    location: "Ranchi, Jharkhand",
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    name: "CodeVerdict",
    slug: "codeverdict",
    stack: ["Python", "FastAPI", "Groq / Llama 3", "FAISS", "RAG", "Agentic AI"],
    href: "https://code-verdictt.vercel.app/",
    githubUrl: "https://github.com/Ayush0915/CodeVerdict",
    imageSrc: "/projects/codeverdict_v3.png",
    meta: "Multi-agent AI code review system",
    description:
      "A multi-agent AI system that reviews pull requests the way a team of specialists would — one agent for security, one for quality, one for performance, one for test coverage — running concurrently and merging their findings into one verdict.",
    bullets: [
      "Built a multi-agent workflow with 4 specialized async agents (Security, Quality, Performance, Test Coverage) using Python asyncio, with isolated error handling per agent.",
      "Built a RAG pipeline with Sentence Transformer embeddings and FAISS vector search to ground agent outputs in secure-coding reference docs.",
      "Wired Bandit static analysis into the Security agent's pipeline with a deterministic merge-verification step, so findings never get silently dropped.",
      "Ran a precision/recall evaluation suite against a labeled PR benchmark — 87.5% precision, 100% recall — with a documented failure-mode analysis.",
    ],
  },
  {
    name: "AskSQL",
    slug: "asksql",
    stack: ["Python", "FastAPI", "DuckDB", "Groq / Llama 3.3", "React", "Tailwind CSS"],
    href: "https://askmysql.netlify.app",
    githubUrl: "https://github.com/Ayush0915/AskSQL",
    imageSrc: "/projects/asksql.png",
    meta: "English-to-SQL data assistant",
    description:
      "A memory-optimized full-stack app that turns plain-English questions into execution-safe SQL, runs them in an isolated DuckDB sandbox, and explains the result in human language.",
    bullets: [
      "Built a natural-language-to-SQL workflow that accepts plain-English prompts and generates safe SQL for structured datasets.",
      "Ran queries inside an isolated DuckDB sandbox, so results stay session-scoped and the execution surface stays tight.",
      "Added plain-English explanations plus tabular results to make the database output understandable for non-technical users.",
      "Shipped a lightweight React + FastAPI experience optimized for fast free-tier deployment and low memory usage.",
    ],
  },
  {
    name: "Digital Wellbeing Intelligence System",
    slug: "digital-wellbeing-intelligence",
    stack: ["Python", "scikit-learn", "Plotly", "FastAPI", "NLP"],
    githubUrl: "https://github.com/Ayush0915/Digital-Wellbeing-Intelligence",
    imageSrc: "/projects/digital_wellbeing_v2.png",
    meta: "ML pipeline for digital behavior insights",
    description:
      "An end-to-end ML system that turns raw digital-behavior data into actionable wellness insights — clustering users into risk profiles and visualizing patterns instead of just logging screen time.",
    bullets: [
      "Built an end-to-end ML pipeline — data prep, feature engineering, training, evaluation — using K-Means to segment users into 3 behavioral risk profiles (~85% consistency).",
      "Engineered 4 behavioral metrics from structured and unstructured data, cutting intra-cluster variance by ~30% through feature normalization.",
      "Cleaned and processed 10K+ behavioral records with Pandas/NumPy, and built automated Plotly dashboards (gauge charts, radar plots) to replace manual reporting.",
      "Shipped async REST APIs with FastAPI at ~200ms inference latency for the data pipeline.",
    ],
  },
  {
    name: "CareerIQ",
    slug: "careeriq",
    stack: ["FastAPI", "React", "Groq / Llama 3.3", "Sentence Transformers", "Docker"],
    githubUrl: "https://github.com/Ayush0915/CareerIQ",
    imageSrc: "/projects/careeriq_v2.png",
    meta: "AI resume intelligence platform",
    description:
      "An AI-powered resume coach — scores your resume against a job description, points out the exact gaps, and uses an LLM to rewrite weak bullets, generate interview questions, and draft a LinkedIn summary.",
    bullets: [
      "Built an ATS compatibility scorer using semantic similarity (all-MiniLM-L6-v2) instead of plain keyword matching, so it measures meaning, not just overlap.",
      "Added skill-gap analysis that ranks missing keywords by how critical they are to the target role.",
      "Built an AI career coach on Groq/Llama 3.3 — bullet rewriter, interview question generator, and LinkedIn summary writer, all under 500ms inference.",
      "Full-stack build: React + Vite frontend, FastAPI backend, Dockerized for deployment, with live job matches pulled from the JSearch API.",
    ],
  },
];

// ─── Skills ───────────────────────────────────────────────────────────────────

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["Python", "C++", "C", "SQL", "Java", "TypeScript", "JavaScript", "Go", "R"],
  },
  {
    category: "AI / ML & NLP",
    skills: ["PyTorch", "TensorFlow", "scikit-learn", "Transformers", "LLMs", "LangChain", "LlamaIndex", "RAG", "Agentic AI", "Deep Learning", "NLP", "Computer Vision", "Fine-tuning", "K-Means", "XGBoost", "Hugging Face"],
  },
  {
    category: "Backend & Databases",
    skills: ["FastAPI", "Flask", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "MySQL", "Redis", "Supabase", "Git", "GitHub"],
  },
  {
    category: "Data & Visualization",
    skills: ["Pandas", "NumPy", "Matplotlib", "Plotly", "Seaborn", "PySpark", "Power BI", "Tableau"],
  },
  {
    category: "Tools & Practices",
    skills: ["Docker", "Kubernetes", "Linux", "AWS", "CI/CD", "Streamlit", "VS Code", "SDLC", "Agile/Scrum", "EDA"],
  },
];
