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
  problem?: string;
  solution?: string;
  challenges?: string;
  metrics?: string[];
  architecture?: string;
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

export interface Experience {
  role: string;
  organization: string;
  period: string;
  location: string;
  bullets: string[];
  stack?: string[];
}

export interface Achievement {
  title: string;
  period: string;
  description: string;
  category: "academic" | "leadership" | "award";
}

export interface FAQ {
  question: string;
  answer: string;
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
    problem: "Generic LLM code reviews often output unstructured, hallucinated suggestions and overlook project-specific security rules or static analysis findings.",
    solution: "We designed a modular multi-agent system where 4 specialized async agents run concurrently under isolated error boundaries, grounded by a secure-coding guidelines vector store.",
    challenges: "Handling concurrent execution crashes of separate agents without failing the entire request, and ensuring static security scanner findings (Bandit) merge cleanly into final LLM feedback.",
    metrics: [
      "87.5% Precision & 100% Recall achieved against a labeled pull request evaluation benchmark suite.",
      "Agent execution and validation pipeline runs concurrently in under 12 seconds for typical pull requests."
    ],
    bullets: [
      "Achieved 87.5% precision & 100% recall on a labeled PR benchmark — 4 async agents (Security, Quality, Performance, Test Coverage) complete a full review in under 12 seconds.",
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
    problem: "Most NL-to-SQL systems require heavy embedding models and vector databases (like ChromaDB), easily exceeding memory limits (e.g., Render's 512MB RAM free tier), and are prone to destructive SQL injections.",
    solution: "We replaced the database schema vector indexing with a zero-dependency token-matching algorithm and locked execution inside an isolated read-only DuckDB session container.",
    challenges: "Resolving race conditions on concurrent user database uploads without keeping databases in heap memory, and implementing robust AST parsing to block DDL/DML mutation queries.",
    metrics: [
      "Reduced system RAM footprint to only ~60MB RAM baseline, enabling successful free-tier deployments.",
      "Hardened execution safety via AST whitelisting and 5-second query timeouts."
    ],
    bullets: [
      "Reduced system RAM footprint to ~60 MB baseline (vs. 512 MB+ for typical NL-to-SQL stacks), enabling zero-cost free-tier deployment with hardened AST-whitelisted SQL execution.",
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
    problem: "Traditional screen-time trackers show raw numbers but fail to identify underlying psychological behavior profiles or segment high-risk profiles.",
    solution: "Built a complete machine learning pipeline that runs K-Means clustering over normalized multi-dimensional behavior features and generates interactive dashboards.",
    challenges: "Normalizing sparse, multi-modal data containing high variance and building low-latency endpoints for real-time risk profile scoring.",
    metrics: [
      "Achieved ~85% clustering consistency (silhouette score) across risk-profile groups.",
      "Feature engineering cut intra-cluster variance by ~30% and API endpoints average under 200ms latency."
    ],
    bullets: [
      "~85% clustering consistency (silhouette score) across 3 behavioral risk profiles on 10K+ records — feature engineering cut intra-cluster variance by ~30%, API latency under 200ms.",
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
    problem: "Standard ATS keyword matching is brittle, penalizing candidates who describe identical skills with slightly different terminology.",
    solution: "Utilized semantic similarity models (all-MiniLM-L6-v2) for context-aware resume grading alongside real-time job feed matches and LLM-powered bullet optimization.",
    challenges: "Handling real-time web scraping latency of job listings and optimizing the LLM bullet-rewriting chain to execute under 500ms.",
    metrics: [
      "Inference time of rewriting tools and semantic scorer optimized to under 500ms.",
      "ATS similarity matching aligns with human expert grading at ~90% consistency."
    ],
    bullets: [
      "~90% ATS-match consistency vs. human expert grading — semantic scorer (all-MiniLM-L6-v2) plus LLM bullet rewrites under 500ms, skill-gap ranking by role criticality.",
      "Added skill-gap analysis that ranks missing keywords by how critical they are to the target role.",
      "Built an AI career coach on Groq/Llama 3.3 — bullet rewriter, interview question generator, and LinkedIn summary writer, all under 500ms inference.",
      "Full-stack build: React + Vite frontend, FastAPI backend, Dockerized for deployment, with live job matches pulled from the JSearch API.",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["Python", "C++", "SQL"],
  },
  {
    category: "AI/ML & NLP",
    skills: ["scikit-learn", "K-Means", "Sentence Transformers", "Prompt Engineering"],
  },
  {
    category: "LLMs & Agentic Systems",
    skills: ["RAG", "Agentic AI"],
  },
  {
    category: "Backend & Databases",
    skills: ["FastAPI", "MongoDB", "MySQL", "DuckDB", "FAISS", "asyncio", "REST APIs"],
  },
  {
    category: "DevOps & Tools",
    skills: ["Git", "GitHub"],
  },
  {
    category: "Data & Visualization",
    skills: ["Pandas", "NumPy", "Plotly", "Power BI"],
  },
  {
    category: "Methodologies",
    skills: ["Agile/Scrum", "EDA"],
  },
];

// ─── Experiences ─────────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    role: "Core Technical Member",
    organization: "Google Developer Group (GDG) BIT",
    period: "2024 – Present",
    location: "Bangalore, Karnataka",
    bullets: [
      "Collaborated in a 5-member core team to architect, build, and deploy the official GDG BIT community platform.",
      "Spearheaded hands-on workshops and regional events, instructing 1000+ attendees in programming fundamentals, Python, and open-source practices.",
      "Mentored 10+ junior students in Data Structures, Algorithms, and Object-Oriented Programming (OOP) concepts.",
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
  },
  {
    role: "AI Study Jams Organizer & Mentor",
    organization: "GDG BIT",
    period: "2025",
    location: "Bangalore, Karnataka",
    bullets: [
      "Curated learning pathways and organized technical study jams on Artificial Intelligence & Machine Learning for 200+ students.",
      "Conducted interactive labs demonstrating model fine-tuning, prompt engineering, and basic neural network design.",
      "Organized amBITion 2.0 hackathon, leading coordination across logistics, prompt selection, and technical grading.",
    ],
    stack: ["Python", "scikit-learn", "Hugging Face", "Google Colab"],
  },
];


// ─── Achievements ────────────────────────────────────────────────────────────

export const achievements: Achievement[] = [
  {
    title: "Academic Excellence at BIT",
    period: "2023 – Present",
    description: "Maintained a top-tier CGPA of 9.45 in the B.Tech Computer Science (Data Science) branch.",
    category: "academic",
  },
  {
    title: "Google Developer Group Core Lead",
    period: "2024 – Present",
    description: "Elected as a Core Technical Lead, driving developer bootcamps and building community tech projects.",
    category: "leadership",
  },
];


// ─── Currently Exploring ─────────────────────────────────────────────────────

export const currentlyExploring = [
  {
    topic: "LLM Interpretability",
    description: "Understanding attention weight activation states and semantic mapping under the hood.",
    status: "Active",
  },
  {
    topic: "DSPy (Declarative Self-Improving Pipelines)",
    description: "Replacing traditional prompt engineering with programmatic model instruction optimization.",
    status: "Active",
  },
];

// ─── FAQs ────────────────────────────────────────────────────────────────────

export const faqs: FAQ[] = [
  {
    question: "Do you have commercial software experience?",
    answer: "No, I don't have professional work experience in a company yet. I lead with my projects (such as CodeVerdict and AskSQL) and academic excellence to prove my ability to ship production-ready, clean, and optimized software.",
  },
  {
    question: "What is your main focus as an AI/ML Engineer?",
    answer: "I bridge the gap between statistical ML models and deterministic software engineering. I focus on multi-agent workflows, optimized RAG pipelines, and latency reductions (targeting under 200ms API speeds).",
  },
  {
    question: "Are you open to relocation or remote work?",
    answer: "Yes, I am open to remote roles, as well as relocation to major tech hubs (including Bangalore, Hyderabad, Pune, and others) for internships or full-time roles starting in 2027.",
  },
];
