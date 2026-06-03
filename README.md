# 🚀 PathAI – AI-Powered Career Roadmap Architect

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google" alt="Gemini API" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

<br />

> **PathAI** is a decoupled, full-stack career growth platform that leverages Generative AI to analyze structural resume data and dynamically generate personalized, 12-week strategic learning paths to bridge professional skill gaps.

---

## 🎥 App Demo Video

Click on the image below to watch the full application demonstration on YouTube:

[![PathAI Project Demo](https://img.youtube.com/vi/_KqSvVEOey0/maxresdefault.jpg)](https://youtu.be/_KqSvVEOey0)

*(Or [click here](https://youtu.be/_KqSvVEOey0) to watch the video directly)*

---

## ✨ Key Features

* **Intelligent Roadmap Architect:** Automatically parses PDF resumes (using `PyMuPDF`) and leverages the Google Gemini API to generate a structured, 12-week strategic learning path tailored to a user's target job role.
* **Real-time AI Interview Coach:** An interactive mock interview simulator that maintains conversational state, analyzes candidate responses, and provides instant, actionable feedback.
* **Context-Aware Career Mentor:** A specialized AI chat assistant initialized with the user's parsed resume data, offering highly personalized career guidance.
* **Interactive Career Cockpit:** A premium, responsive dark-mode dashboard built with `Next.js 16`, `Framer Motion`, and `Recharts` for visualizing skill progression and industry readiness.
* **Secure Authentication:** Complete user identity management and session persistence using `NextAuth.js` and MongoDB.

---

## 🛠️ Technical Stack & Architecture

PathAI is built using a modern decoupled architecture, ensuring scalability, asynchronous processing, and high performance.

### Frontend
* **Framework:** Next.js 16 (App Router)
* **Language:** TypeScript
* **Styling & UI:** Tailwind CSS 4, Framer Motion, Lucide React
* **Data Visualization:** Recharts
* **Authentication:** NextAuth (Auth.js)

### Backend
* **Framework:** FastAPI (Python)
* **Database:** MongoDB Atlas
* **Async Driver:** Motor (Non-blocking I/O operations)
* **Data Validation:** Pydantic (Enforcing strict JSON schemas)
* **PDF Processing:** PyMuPDF & pdfplumber
* **AI Integration:** Google Gemini Pro API

---

## ⚙️ How It Works Under The Hood

1. **Concurrent Document Extraction:** When a user uploads a CV, the FastAPI backend uses asynchronous processing to parse the PDF without blocking the event loop.
2. **Schema Validation:** The raw text is passed to the Gemini LLM. Using strict Pydantic schemas, the backend forces the LLM to return structured JSON data, ensuring the frontend never crashes due to unpredictable AI text generation.
3. **Asynchronous Persistence:** Generated roadmaps, parsed skills, and interview chat histories are saved to MongoDB asynchronously using the `Motor` driver, resulting in lightning-fast API responses.

---

## 📁 Project Structure

```text
PathAI/
├── backend/                  # FastAPI Python Backend
│   ├── app/
│   │   ├── api/endpoints/    # REST API Routes (chat, interview, roadmap, resume)
│   │   ├── core/             # MongoDB Connection & Settings
│   │   ├── schemas/          # Pydantic Models for Data Validation
│   │   └── services/         # Gemini AI & PDF Processing Logic
│   ├── requirements.txt      # Python Dependencies
│   └── main.py               # FastAPI Entry Point
│
├── frontend/                 # Next.js 16 Frontend
│   ├── src/
│   │   ├── app/              # Next.js App Router (Pages, Layouts, Auth)
│   │   ├── components/       # Reusable UI Components
│   │   └── lib/              # Utility Functions & MongoDB Client
│   ├── tailwind.config.ts    # Tailwind CSS Configuration
│   └── package.json          # Node Dependencies
│
└── README.md                 # Project Documentation
```

---

## 🚀 Getting Started (Local Development)

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/mnmrukshan/PathAI.git
cd PathAI
```

### 2. Backend Setup (FastAPI)
```bash
cd backend
python -m venv .venv

# Activate virtual environment
# Windows: .venv\Scripts\activate
# Mac/Linux: source .venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
MONGODB_URL=your_mongodb_atlas_uri_here
SECRET_KEY=your_secret_key_here
```

Run the backend server:
```bash
uvicorn app.main:app --reload
```

### 3. Frontend Setup (Next.js)
Open a new terminal window:
```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:
```env
MONGODB_URI=your_mongodb_atlas_uri_here
AUTH_SECRET=your_nextauth_secret_here
```

Run the frontend development server:
```bash
npm run dev
```

The application will now be running at `http://localhost:3000`.

---

<div align="center">
  <i>Designed and Developed by <b>M.N.M Rukshan</b></i><br>
  <i>Sabaragamuwa University of Sri Lanka</i>
</div>
