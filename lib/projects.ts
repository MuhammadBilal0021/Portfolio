export interface Project {
  slug: string;
  number: string;
  title: string;
  summary: string;
  problem: string;
  approach: string;
  result: string;
  stack: string[];
  github: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "secure-rag-agent",
    number: "01",
    title: "Secure RAG AI Agent",
    summary:
      "Production-ready retrieval-augmented generation agent with secure embedding pipeline and source-grounded answers.",
    problem:
      "Users needed to query large document sets (PDF, TXT) in natural language without exposing sensitive data to third-party services or getting hallucinated answers.",
    approach:
      "Built a local-first RAG pipeline with FAISS and ChromaDB vector stores for document embedding, LangChain for orchestration, and a secure ingestion pipeline that processes documents without external data leakage. FastAPI serves the agent with clean REST endpoints.",
    result:
      "Production-ready agent that handles PDF/TXT document ingestion, generates source-grounded answers with citation, and maintains zero data leakage through the entire pipeline.",
    stack: ["LangChain", "FAISS", "ChromaDB", "OpenAI", "Groq", "FastAPI"],
    github: "https://github.com/MuhammadBilal0021/rag-document-assistan",
  },
  {
    slug: "automl-platform",
    number: "02",
    title: "AutoML & Agentic LLM Platform",
    summary:
      "End-to-end ML automation platform with Llama 3.3 70B as an agentic decision layer. Churn AUC 0.94, Sentiment F1 0.89.",
    problem:
      "Data teams were spending weeks on repetitive ML workflows — dataset cleaning, feature engineering, model selection, and evaluation — for every new prediction task.",
    approach:
      "Designed a RESTful API platform that automates the full pipeline: dataset upload → preprocessing → model training → evaluation → prediction. Integrated Llama 3.3 70B via Groq as an agentic decision layer that autonomously selects preprocessing strategies and model architectures.",
    result:
      "Achieved Churn prediction AUC of 0.94 and Sentiment classification F1 of 0.89. Reduced the ML experiment cycle from days to minutes with full automation and an interactive Streamlit dashboard.",
    stack: ["FastAPI", "Streamlit", "Scikit-learn", "XGBoost", "Groq"],
    github: "https://github.com/MuhammadBilal0021/AUTO_ml_eda",
  },
  {
    slug: "conversational-data-agent",
    number: "03",
    title: "AI Conversational Data Agent",
    summary:
      "LLM-powered agentic system that translates natural language into SQL queries and returns summarized insights.",
    problem:
      "Non-technical stakeholders couldn't access structured database insights without writing SQL or waiting for analyst reports, creating bottlenecks in data-driven decision making.",
    approach:
      "Built a LangGraph-based state machine agent that interprets natural language questions, translates them into optimized SQL queries, executes them against live databases, and returns human-readable summarized insights. The multi-step reasoning pipeline handles ambiguous queries gracefully.",
    result:
      "Enabled non-technical users to query databases conversationally with accurate SQL generation and clear insight summaries, eliminating the analyst bottleneck for routine data questions.",
    stack: ["LangGraph", "LangChain", "SQL", "Python"],
    github: "https://github.com/MuhammadBilal0021/leadflow-ai",
  },
  {
    slug: "healthtailor",
    number: "04",
    title: "HealthTailor — Full-Stack AI App",
    summary:
      "Full-stack health recommendation app with Gemini API, Firebase, and automated email workflows. Distinction-level evaluation.",
    problem:
      "Users lacked personalized, AI-driven health recommendations that adapted to their individual profiles, and existing solutions didn't integrate seamlessly with authentication and notification systems.",
    approach:
      "Built a full-stack web application with Flask backend, Google Gemini API for AI-personalized health recommendations, Firebase Realtime Database for user data, session-based authentication, and automated email workflows via Yagmail for appointment reminders and health tips.",
    result:
      "Delivered a complete health platform with personalized AI recommendations, real-time data sync, and automated communication. Received distinction-level evaluation for the project.",
    stack: ["Flask", "Firebase", "Gemini API", "Jinja2", "REST APIs"],
    github: "https://github.com/MuhammadBilal0021/constructguard-ai",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
