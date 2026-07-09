"use client";

import Image from "next/image";
import { skillGroups } from "@/lib/data";

// ─── CDN icon URLs ────────────────────────────────────────────────────────────
const ICONS: Record<string, string> = {
  Python:       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "C++":        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  C:            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
  Java:         "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  Dart:         "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg",
  JavaScript:   "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  TypeScript:   "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  SQL:          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg",
  "HTML/CSS":   "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  Flutter:          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
  React:            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "React Native":   "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "Next.js":        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  FastAPI:          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
  "Express.js":     "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  "Node.js":        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  PySpark:          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original.svg",
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  MySQL:      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  MongoDB:    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  Neo4j:      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/neo4j/neo4j-original.svg",
  Supabase:   "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
  "AWS (Amplify, S3, Lambda)": "https://cdn.simpleicons.org/amazonaws/FF9900",
  "Azure DevOps":              "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  Docker:                      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "CI/CD Pipelines":           "https://cdn.simpleicons.org/githubactions/2088FF",
  Git:            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  GitHub:         "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  "VS Code":      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  Tableau:        "https://cdn.simpleicons.org/tableau",
  "Power BI":     "https://cdn.simpleicons.org/powerbi",
  "OAuth 2.0":    "https://cdn.simpleicons.org/auth0/EB5424",
  "RESTful APIs": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
  "OpenAI API":   "https://cdn.simpleicons.org/openai/ffffff",
  ElevenLabs:     "https://cdn.simpleicons.org/elevenlabs/ffffff",
  Gemini:         "https://cdn.simpleicons.org/googlegemini/8E75B2",
  "Hugging Face": "https://cdn.simpleicons.org/huggingface/FFD21E",
  Pipecat:        "https://cdn.simpleicons.org/python/3776AB",
  "Google Vision":"https://cdn.simpleicons.org/googlecloud/4285F4",
  OCR:            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg",
  "scikit-learn": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
  Pandas:         "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
  NumPy:          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
  Matplotlib:     "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg",
  Plotly:         "https://cdn.simpleicons.org/plotly/3F4F75",
  Streamlit:      "https://cdn.simpleicons.org/streamlit/FF4B4B",
  PyTorch:        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
  TensorFlow:     "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-line.svg",
  Transformers:   "https://cdn.simpleicons.org/huggingface",
  LLMs:           "https://cdn.simpleicons.org/openai",
  LangChain:      "https://cdn.simpleicons.org/langchain",
  LlamaIndex:     "https://cdn.simpleicons.org/llamaindex",
  Go:             "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
  R:              "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg",
  Flask:          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg",
  Redis:          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
  Seaborn:        "https://cdn.simpleicons.org/seaborn/3776AB",
  Kubernetes:     "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg",
  Linux:          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
  AWS:            "https://cdn.simpleicons.org/amazonaws/FF9900",
  "CI/CD":        "https://cdn.simpleicons.org/githubactions/2088FF",
  "K-Means":      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
  "Agentic AI":   "https://cdn.simpleicons.org/deepmind/0070f3",
  RAG:            "https://cdn.simpleicons.org/weaviate/ffffff",
};

export default function SkillsOrbit() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {skillGroups.map((group) => (
        <div
          key={group.category}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6 backdrop-blur-sm transition-all hover:border-indigo-500/20"
        >
          <h2
            className="mb-6 text-xs font-bold uppercase tracking-[0.24em] text-indigo-400"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            {group.category}
          </h2>

          <div className="flex flex-wrap gap-x-4 gap-y-6">
            {group.skills.map((skill) => (
              <div
                key={skill}
                className="flex flex-col items-center gap-2 cursor-default group w-[72px]"
              >
                {/* Badge Circle */}
                <div className="w-12 h-12 rounded-full bg-zinc-950 border border-zinc-800/80 shadow-md flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-indigo-500/60 group-hover:shadow-indigo-500/10 group-hover:shadow-lg p-2.5">
                  {ICONS[skill] ? (
                    <Image
                      src={ICONS[skill]}
                      alt={skill}
                      width={28}
                      height={28}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-zinc-400 text-[9px] font-bold text-center leading-tight">
                      {skill.slice(0, 3).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Skill Name Label */}
                <span className="text-[10px] font-medium text-zinc-400 text-center leading-tight max-w-[80px] group-hover:text-zinc-200 transition-colors">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
