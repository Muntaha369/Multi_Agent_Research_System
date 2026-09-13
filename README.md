# 🔎 Research Point

**Research Point** is a multi-agent AI research system that automates the process of researching a topic, gathering relevant information from the web, extracting useful content, generating a research report, and evaluating the generated report.

The system uses multiple specialized AI agents, where each agent is responsible for a specific part of the research pipeline.

---

## ✨ Features

* 🤖 **Multi-Agent Research Pipeline**

  * Multiple specialized agents collaborate to produce the final research report.

* 🔍 **Web Search with Tavily**

  * Searches the web for recent and relevant information.
  * Identifies useful sources and returns relevant links and snippets.

* 🕷️ **Web Scraping with BeautifulSoup**

  * Extracts the actual content from selected web pages.
  * Converts web pages into usable research material.

* ✍️ **AI Writing Agents**

  * Uses scraped information to generate a structured research report.
  * Combines information from multiple sources into coherent content.

* 🧐 **Critic Agents**

  * Reviews the generated report.
  * Evaluates the quality, relevance, accuracy, and completeness of the research.
  * Provides feedback that can be used to improve the final report.

* ⚡ **FastAPI Backend**

  * Provides the backend API for the research system.
  * Handles communication between the frontend and the AI research pipeline.

* 💻 **Next.js Frontend**

  * Provides the user interface for interacting with Research Point.
  * Built with Next.js and Tailwind CSS.

---

## 🏗️ Architecture

Research Point follows a multi-stage research pipeline:

```text
                    ┌─────────────────┐
                    │      User       │
                    │ Research Topic  │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   Search Agent  │
                    │                 │
                    │     Tavily      │
                    └────────┬────────┘
                             │
                      Relevant URLs
                             │
                             ▼
                    ┌─────────────────┐
                    │ Scraping Agent  │
                    │                 │
                    │  BeautifulSoup  │
                    └────────┬────────┘
                             │
                       Web Content
                             │
                             ▼
                    ┌─────────────────┐
                    │ Writing Agents  │
                    │                 │
                    │ Research Report │
                    └────────┬────────┘
                             │
                       Draft Report
                             │
                             ▼
                    ┌─────────────────┐
                    │  Critic Agents  │
                    │                 │
                    │ Evaluate Report │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Final Research  │
                    │      Report     │
                    └─────────────────┘
```

---

## 🧠 How It Works

### 1. User submits a research topic

The user provides a topic that they want Research Point to investigate.

Example:

```text
"How is artificial intelligence changing software development?"
```

---

### 2. Search Agent

The **Search Agent** receives the research topic and uses **Tavily** to search the web.

It looks for:

* Relevant sources
* Recent information
* Reliable websites
* Useful articles and documentation
* Relevant URLs

The goal of this stage is to find the best sources rather than trying to generate the research report immediately.

---

### 3. Web Scraping

The relevant URLs found by the search agent are passed to the scraping stage.

Research Point uses **BeautifulSoup** to extract useful information from the web pages.

The scraping process attempts to:

```text
URL
 │
 ▼
Download webpage
 │
 ▼
Parse HTML
 │
 ▼
Extract useful content
 │
 ▼
Clean text
 │
 ▼
Research data
```

This allows the writing agents to work with the actual content of the sources instead of relying only on search-result snippets.

---

### 4. Writing Agents

The scraped information is passed to the **Writing Agents**.

These agents use the collected research material to generate a structured report.

The writing stage focuses on:

* Organizing information
* Combining information from different sources
* Creating readable explanations
* Maintaining relevance to the original research topic
* Producing a coherent research report

---

### 5. Critic Agents

After the report is generated, it is passed to the **Critic Agents**.

The critic agents evaluate the report and identify potential problems such as:

* Missing information
* Weak explanations
* Irrelevant content
* Unsupported claims
* Poor organization
* Incomplete research
* Potential factual issues

The critic stage acts as a quality-control layer before the research is considered complete.

---

## 🛠️ Tech Stack

### Backend

| Technology                | Purpose                               |
| ------------------------- | ------------------------------------- |
| **Python**                | Core backend and agent implementation |
| **FastAPI**               | REST API                              |
| **Tavily**                | Web search                            |
| **BeautifulSoup**         | Web scraping and HTML parsing         |
| **LangChain / LangGraph** | Agent orchestration                   |
| **LLM**                   | Research, writing and evaluation      |

### Frontend

| Technology       | Purpose                        |
| ---------------- | ------------------------------ |
| **Next.js**      | Frontend framework             |
| **React**        | UI components                  |
| **Tailwind CSS** | Styling                        |
| **TypeScript**   | Type-safe frontend development |

---

## 📁 Project Structure

A typical project structure looks like:

```text
research-point/
│
├── backend/
│   ├── agents/
│   │   ├── search_agent.py
│   │   ├── writer_agent.py
│   │   └── critic_agent.py
│   │
│   ├── scraping/
│   │   └── scraper.py
│   │
│   ├── api/
│   │   └── routes.py
│   │
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
```

> The exact structure may vary depending on the implementation.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Python 3.10+
* Node.js 18+
* npm / pnpm / yarn
* A Tavily API key
* An API key for the LLM provider being used

---

## ⚙️ Backend Setup

Clone the repository:

```bash
git clone <repository-url>

cd research-point
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate it.

### Linux / macOS

```bash
source venv/bin/activate
```

### Windows

```bash
venv\Scripts\activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file:

```env
TAVILY_API_KEY=your_tavily_api_key
OPENROUTER_API_KEY=your_llm_api_key
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend should now be available at:

```text
http://localhost:8000
```

FastAPI also provides interactive API documentation at:

```text
http://localhost:8000/docs
```

---

## 🎨 Frontend Setup

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend should now be available at:

```text
http://localhost:3000
```

---

## 🔄 Research Pipeline

The complete flow can be summarized as:

```text
User
  │
  ▼
Research Topic
  │
  ▼
Search Agent
  │
  ├── Tavily Search
  │
  ▼
Relevant Sources
  │
  ▼
Web Scraper
  │
  ├── BeautifulSoup
  │
  ▼
Scraped Research Data
  │
  ▼
Writing Agents
  │
  ▼
Generated Report
  │
  ▼
Critic Agents
  │
  ├── Evaluate
  ├── Find Issues
  └── Provide Feedback
  │
  ▼
Final Research Report
```

---

## 🎯 Why Multi-Agent?

Instead of asking a single AI agent to perform the entire research process, Research Point divides the task into specialized responsibilities.

For example:

```text
Search Agent
     ↓
"What information should we collect?"

Scraping System
     ↓
"What does the source actually say?"

Writing Agent
     ↓
"How should we organize this information?"

Critic Agent
     ↓
"Is this report good enough?"
```

This separation makes the research workflow easier to control, debug, and improve.

It also allows individual agents to be improved independently without redesigning the entire system.

---

## 🤝 Contributing

Contributions, ideas, and improvements are welcome.

If you would like to contribute:

```bash
git checkout -b feature/your-feature
```

Make your changes, commit them, and open a pull request.

---

## 📄 License

Add your preferred license here.

For example:

```text
MIT License
```

---

## ⭐ About

**Research Point** is an AI-powered multi-agent research system designed to automate the journey from:

**Research Topic → Web Search → Web Scraping → Report Generation → Report Evaluation**

The project demonstrates how specialized AI agents can work together to build a more structured and reliable research workflow.
