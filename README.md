````markdown
# 💼 Job Listing Web App

A **full-stack job listing platform** built with a **Flask backend** and a **React + TypeScript frontend**. Users can browse, filter, sort, add, and delete job listings through a clean and responsive UI.

---

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

## 📃 Project Overview

This application allows users to:

- Browse job listings with filters (location, type, tags)
- Sort jobs by date and company name
- Paginate through jobs
- Add and delete job listings
- Use a mobile-responsive, user-friendly interface

---

## ⚙️ Setup Instructions

### 🔧 Backend Setup

**Prerequisites:**
- Python 3.8+
- PostgreSQL
- `pip` or `conda` for package management

1. **Clone the repo and navigate to the backend:**
   ```bash
   git clone https://github.com/IkramAlgo/Job-Listing-Web-App.git
   cd Job-Listing-Web-App/backend
````

2. **Create and activate a virtual environment:**

   ```bash
   conda create --name job-app python=3.8 -y
   conda activate job-app
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set up the PostgreSQL database:**

   * Create a database named `job_app_db`
   * Update credentials in `app.py` if needed

5. **Run migrations and start the server:**

   ```bash
   flask db init
   flask db migrate
   flask db upgrade
   flask run
   ```

   Backend will run at: `http://127.0.0.1:5000`

---

### 🖥️ Frontend Setup

**Prerequisites:**

* Node.js & npm

1. **Navigate to the frontend:**

   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the React development server:**

   ```bash
   npm run dev
   ```

   Frontend will run at: `http://localhost:5173`

4. **API Configuration:**

   * Ensure API requests in frontend point to `http://127.0.0.1:5000`

---

## 📁 Project Structure

```
Job-Listing-Web-App/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── migrations/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── JobCard.tsx
│   │   ├── JobsPage.tsx
│   │   └── ...
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── index.html
└── README.md
```

---

## 🛠️ Technology Stack

### 🔙 Backend

* **Flask** (Python)
* **SQLAlchemy + PostgreSQL**
* **Flask-Migrate** for database migrations
* **Flask-CORS** for cross-origin access

### 🔜 Frontend

* **React** with **TypeScript**
* **React Bootstrap** for responsive components
* **Heroicons** for icons
* **Vite** for fast build tooling
* **Fetch API** for communication

---

## ⚡ Assumptions & Shortcuts

* No user authentication (open job add/delete)
* Tags are stored as arrays and filtered by exact match
* Basic error handling and validations
* Frontend and backend must run locally
* No job scraper included (can be added later)

---

## ✨ Features

* **Job Listing:** Paginated and filterable list of jobs
* **Filters:** Filter jobs by location, job type, and tags
* **Sorting:** Sort by post date or company name
* **Pagination:** Navigate jobs using previous/next buttons
* **Add Job:** Create new listings through a form
* **Delete Job:** Remove jobs with confirmation
* **Responsive UI:** Works across mobile and desktop
* **Error States:** Handles loading and network errors

---

## 🧪 How to Use

1. Start both frontend and backend servers
2. Open `http://localhost:5173` in your browser
3. Use filters to search for specific jobs
4. Add new jobs via the form at the bottom
5. Delete jobs with the red button
6. Use pagination to view more listings

---

### 📫 Contact

Feel free to connect or reach out:
**Ikram Khan**
[GitHub Profile](https://github.com/IkramAlgo)
