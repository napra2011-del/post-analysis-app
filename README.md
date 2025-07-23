 Post Analysis App

A full-stack web application for analyzing blog post content using a C++ backend for word count and keyword frequency. The frontend is built with **Next.js 15**, and the backend is a **Dockerized C++ service**, with persistent data stored in **PostgreSQL** via **Prisma ORM**.

---

Features

-  View and create blog posts
-  Analyze word count and keyword frequency using C++
-  Save analysis results in PostgreSQL via Prisma
-  Frontend deployed on Vercel
-  C++ backend deployed via Docker on Render

---

 Tech Stack

- **Frontend**: Next.js (App Router, Server Actions, TypeScript)
- **Backend**: C++ (text analysis logic), exposed via REST API
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel (frontend), Render (backend), Railway (PostgreSQL)

---

Setup Instructions

1. Clone the repo


git clone https://github.com/napra2011-del/post-analysis-app
cd my-post-analysis-app

2. Install dependencies
npm install


3. Setup environment variables


DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza196dk1NMFI0MnJfdTZQUTJHU0hLb0QiLCJhcGlfa2V5IjoiMDFLMFJHUkQ0UVA4N1FBSlJDUTM0ODlSU0EiLCJ0ZW5hbnRfaWQiOiJlMGNkMGJhZDUyZGZlNmUwMDUwNGZiYTYwYWMwMmUxZmI2ZTZmNmY4NTg0N2NlYzY1ZDEwMzA0ZjU3Yjc3M2UzIiwiaW50ZXJuYWxfc2VjcmV0IjoiMmMzOTdiNmQtN2FkNC00MzNkLWE2MTctNjRjNDFlNDBmZTNjIn0.VGxITlhFWaGbNuVwm_-LxtHkQMe82el8RvoMgUC8Mxk"

4. Setup the database

npx prisma generate
npx prisma migrate dev --name init

 command that shows the database content:
npx prisma studio


5. Run the development server

npm run dev

Now you can click the link and verify via local host


6.C++ Backend (Dockerized)

Run C++ API Locally
Build and run using Docker:
docker build -t cpp-analyzer .
docker run -p 8000:8000 cpp-analyzer

7.C++ Analysis Logic
Your C++ service accepts POST requests with raw text and returns:

json

{
  "wordCount": 42,
  "keywordFrequency": {
    "example": 3,
    "analysis": 2,
    ...
  }
}

8.curl command can be used to verify the above
curl -X POST https://post-analysis-app-1.onrender.com/analyze -d "quia et suscipit suscipit recusandae..."




Deployment Summary
Part	   Platform   	URL / Command
Frontend	Vercel	    https://post-analysis-app-8qkf-mw4lkbuqk-napra2011-dels-projects.vercel.app/
Backend	    Render	    https://post-analysis-app-1.onrender.com/analyze
project     git         https://github.com/napra2011-del/post-analysis-app


Common Errors
❗ Vercel build error:
“params.id must be awaited”
→ Use generateStaticParams() in dynamic routes
→ Or convert to client-side fetching

❗ Render Docker error:
→ Ensure Dockerfile is present and default port is exposed

