# Ayush Kumar Bhadani — Portfolio Context

## About & Background

I'm Ayush, a final-year B.Tech CSE (Data Science) student at Bangalore Institute of Technology (VTU), graduating 2027, with a 9.45 CGPA.

I build AI/ML systems that actually run in production — not just notebooks. I'm into multi-agent AI workflows, RAG pipelines, and applied machine learning. I like taking a messy real-world problem, building a working pipeline for it, and shipping something people can actually use.

I'm currently looking for internships and early-career roles in software/AI engineering.

---

## Education

### Bangalore Institute of Technology (2023–2027)
B.Tech, Computer Science & Engineering (Data Science) — CGPA: 9.45
- Coursework: Data Structures and Algorithms, OOP, DBMS, Operating Systems, Computer Networks, Machine Learning

### Delhi Public School, Ranchi (2022)
Senior Secondary — Science (PCM) — 87.2%

### St. Michael's School, Ranchi (2020)
Secondary Education — 95.6%

---

## Projects

### CodeVerdict — Multi-Agent AI Code Review System
Live: https://code-verdictt.vercel.app/ | GitHub: https://github.com/Ayush0915/CodeVerdict
Stack: Python, FastAPI, Groq/Llama 3, FAISS, RAG, Agentic AI

CodeVerdict reviews pull requests the way a team of specialists would, instead of routing everything through one generic prompt.

- Built a multi-agent workflow with 4 specialized async agents — Security, Quality, Performance, Test Coverage — using Python asyncio, each running concurrently with isolated error handling.
- Built a RAG system with Sentence Transformer embeddings and FAISS vector search to ground the agents' outputs in secure-coding reference docs instead of letting the LLM freestyle.
- Integrated Bandit static analysis into the Security agent's pipeline with a deterministic merge-verification step, so static findings can never get silently dropped from the final output.
- Ran a precision/recall evaluation suite against a labeled PR benchmark — 87.5% precision, 100% recall — with a documented failure-mode analysis and mitigation plan.

### Digital Wellbeing Intelligence System
GitHub: https://github.com/Ayush0915/Digital-Wellbeing-Intelligence
Stack: Python, scikit-learn, Plotly, FastAPI, NLP

An end-to-end ML pipeline that turns raw digital-behavior data into wellness insights instead of just tracking screen time.

- Built the full pipeline — data prep, feature engineering, model training, evaluation — using K-Means clustering to segment users into 3 behavioral risk profiles at ~85% consistency.
- Engineered 4 behavioral metrics from structured and unstructured data; feature normalization cut intra-cluster variance by ~30%.
- Cleaned and processed 10K+ behavioral records with Pandas/NumPy, and built automated Plotly dashboards (gauge charts, radar plots) that cut manual reporting effort by ~40%.
- Built async REST APIs in FastAPI with ~200ms inference latency.

### CareerIQ — AI Resume Intelligence Platform
GitHub: https://github.com/Ayush0915/CareerIQ
Stack: FastAPI, React, Groq/Llama 3.3, Sentence Transformers, Docker

An AI resume coach that scores your resume against a job description and tells you exactly what's missing.

- Built an ATS compatibility scorer using semantic similarity (all-MiniLM-L6-v2) rather than plain keyword matching, so it measures meaning, not just word overlap.
- Added skill-gap analysis that ranks missing keywords by how critical they are to the target role.
- Built an AI career coach on Groq/Llama 3.3 with three tools: a bullet rewriter, an interview-question generator, and a LinkedIn summary writer, all responding in under 500ms.
- Full-stack: React + Vite frontend, FastAPI backend, Dockerized, with live job listings pulled from the JSearch API.

---

## Technical Skills

### Programming Languages
Python, C++, C, SQL

### AI/ML & NLP
scikit-learn, TF-IDF, Sentence Transformers, K-Means, Logistic Regression, RAG, Agentic AI design

### Backend & Databases
FastAPI, MongoDB, MySQL, Git, GitHub

### Data & Visualization
Pandas, NumPy, Matplotlib, Plotly, Power BI, Tableau

### Tools & Practices
Streamlit, VS Code, SDLC, Agile/Scrum, EDA

### Soft Skills
Analytical thinking, problem solving, technical communication, leadership

---

## Achievements & Activities

- **Academic Excellence** — Maintained an overall CGPA of 9.45 in the CSE (Data Science) branch at BIT.
- **Core Technical Member, Google Developer Group (GDG)** — part of a 5-member team that built and shipped the official GDG website; ran 3+ workshops and 2+ regional events reaching 1000+ participants.
- **Leadership & Outreach** — organized amBITion 2.0 and AI Study Jams for 200+ participants, represented college at inter-college hackathons, and mentored 10+ junior students on DSA and Python fundamentals.

---

## Links
- **GitHub:** https://github.com/Ayush0915
- **LinkedIn:** https://www.linkedin.com/in/ayush-kumar-bhadani-78558a21a/
- **Email:** ayushbhadani0915@gmail.com
- **Live Projects:**
  - CodeVerdict: https://code-verdictt.vercel.app/

---

## Communication Style
Keep it light, friendly, and direct — I'm a student, not a corporate veteran, so skip the "5+ years enterprise-scale" tone entirely. Explain the "why" behind technical choices simply. Be honest that I don't have professional work experience yet — lead with projects and academics instead.

When answering questions about my work:
- Explain the reasoning behind design choices in plain language
- Highlight what makes each project technically interesting (multi-agent design, RAG grounding, evaluation rigor)
- If asked about work experience, say I don't have professional experience yet but point to the depth of the projects instead
- Focus on what was actually built and measured, not vague claims
