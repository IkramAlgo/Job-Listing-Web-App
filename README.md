
# 💼 Job Listing Web App

A **full-stack job listing platform** built with a **Flask backend** and a **React + TypeScript frontend**. Users can browse, filter, and add job listings.

---
## 🎥 Project Demo

Watch the demo video [here](https://drive.google.com/file/d/1sFBnU_AAR5NvQigo0HPzHOfb2628wSdM/view?usp=sharing).

## 📌 Table of Contents

1. [Project Overview](#project-overview)
2. [Setup Instructions](#setup-instructions)  
   - [Backend Setup](#backend-setup)  
   - [Frontend Setup](#frontend-setup)
3. [Project Structure](#project-structure)
4. [Technology Stack](#technology-stack)
5. [Assumptions & Shortcuts](#assumptions--shortcuts)
6. [Features](#features)
7. [How to Use](#how-to-use)

---

## 📁 Project Overview

A web application that allows users to:

- View job listings
- Filter by location, type, and tags
- Add and delete job entries
- This project includes a web scraper that efficiently extracts up to 100 job listings from the source website, handling pagination and dynamic content loading.
---

## 🔧 Setup Instructions

### 🔙 Backend Setup

1. **Create and activate virtual environment:**

```bash
conda create --name job-app python=3.8 -y
conda activate job-app
```

2. **Install dependencies:**

```bash
pip install -r requirements.txt
```

3. **Configure PostgreSQL:**

- Create a database named `job_app_db`
- Update credentials in `app.py`

4. **Run migrations & start server:**

```bash
flask db init
flask db migrate
flask db upgrade
flask run
```

API will be available at `http://127.0.0.1:5000`

---

### 💻 Frontend Setup

1. **Navigate to frontend folder:**

```bash
cd frontend
```

2. **Install frontend dependencies:**

```bash
npm install
```

3. **Start development server:**

```bash
npm run dev
```

Frontend will be available at `http://localhost:5173`

4. **Check API URL Configuration:**  
Ensure frontend uses the correct backend URL (`http://127.0.0.1:5000`)

---

## 🧱 Project Structure

```
backend/
├── app.py
├── scraper.py (By using Python Scarper.py you can scarpe 100 jobs)
├── chromedriver.exe 
├── requirements.txt
├── migrations/


frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── JobCard.tsx
│   ├── JobsPage.tsx
│   ├── index.css
|   ├── main.tsx
│   └── ...
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
```

---

## 🛠️ Technology Stack

**Backend:**

- Flask + Flask-CORS
- SQLAlchemy + PostgreSQL
- Flask-Migrate

**Frontend:**

- React + TypeScript
- React Bootstrap
- Heroicons
- Vite

---

## ⚠️ Assumptions & Shortcuts

- No authentication (open access to add/delete)
- Tags are stored as JSON arrays
- Minimal error handling
- Backend and frontend run locally

---

## 🚀 Features

- Filter jobs by **location, job type, tags**
- Sort by **date posted** or **company name**
- Add/Delete job listings
- Pagination support
- Responsive design for mobile/desktop
- Visual feedback on loading/error states

---

## 📘 How to Use

1. Run backend (`http://127.0.0.1:5000`)
2. Run frontend (`http://localhost:5173`)
3. Use UI to:
   - Browse, filter, and sort jobs
   - Add a new job using the form
   - Delete jobs with the delete button
   - Use pagination to navigate pages

---

