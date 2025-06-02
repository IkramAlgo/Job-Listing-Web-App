```markdown
# Job Listing Application

This is a full-stack job listing application featuring a Flask backend API and a React frontend with a responsive UI. The app allows users to browse, filter, sort, add, and delete job listings.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Setup and Run Instructions](#setup-and-run-instructions)  
  - [Backend Setup](#backend-setup)  
  - [Frontend Setup](#frontend-setup)  
- [Project Structure](#project-structure)  
- [Technology Decisions](#technology-decisions)  
- [Assumptions and Shortcuts](#assumptions-and-shortcuts)  
- [Features](#features)  

---

## Project Overview

This application provides a job listing platform with:

- Job browsing with filters (location, job type, tags)
- Sorting options (date posted, company name)
- Pagination support
- Job creation and deletion functionality
- Responsive and user-friendly UI

---

## Setup and Run Instructions

### Backend Setup

1. **Prerequisites:**  
   - Python 3.8+  
   - PostgreSQL installed and running  
   - `pip` for package management

2. **Clone the repository and navigate to backend folder:**  
   ```
   git clone 
   cd backend
   ```

3. **Create and activate a virtual environment:**  
   ```
   conda create -m job-app -y
   conda activate job-app     # Windows
   ```

4. **Install dependencies:**  
   ```
   pip install -r requirements.txt
   ```

5. **Configure PostgreSQL database:**  
   - Create a database named `job_app_db` (or update config).  
   - Update database credentials in `app.py` if necessary.

6. **Run migrations and start the server:**  
   ```
   flask db init
   flask db migrate
   flask db upgrade
   flask run
   ```
   Backend API will run at `http://127.0.0.1:5000`.

---

### Frontend Setup

1. **Prerequisites:**  
   - Node.js and npm installed

2. **Navigate to frontend folder:**  
   ```
   cd frontend
   ```

3. **Install dependencies:**  
   ```
   npm install
   ```

4. **Start the React development server:**  
   ```
   npm start
   ```
   Frontend will be available at `http://localhost:3000`.

5. **API URL Configuration:**  
   - Ensure the frontend API calls point to the backend URL (`http://127.0.0.1:5000`).  
   - Adjust if backend runs on a different host or port.

---

## Project Structure

```
backend/
├── app.py                  # Flask backend application with API routes
├── requirements.txt        # Python dependencies
├── migrations/             # Database migration files

frontend/
├── public/
│   └── index.html          # React app root HTML
├── src/
│   ├── JobCard.tsx         # Reusable job card component
│   ├── JobsPage.tsx        # Main page with listing, filters, add & delete
│   ├── index.tsx           # React entry point
│   ├── index.css           # Global styles
│   └── ...                 # Other React files and assets
├── package.json            # npm dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build config
├── .gitignore              # Git ignore file
├── README.md               # Project documentation
```

---

## Technology Decisions

- **Backend:**  
  - Flask for lightweight REST API  
  - SQLAlchemy ORM with PostgreSQL database  
  - Flask-Migrate for database migrations  
  - Flask-CORS to allow frontend access

- **Frontend:**  
  - React with TypeScript for type safety  
  - React Bootstrap for responsive UI components  
  - Heroicons for consistent iconography  
  - Fetch API for backend communication

- **Styling:**  
  - Bootstrap grid and utilities for responsiveness  
  - Custom CSS for hover effects and icon sizing

---

## Assumptions and Shortcuts

- No user authentication implemented (open access for adding/deleting jobs)  
- Tags stored as JSON arrays in the database, filtering matches exact tags  
- Basic error handling and validation; can be extended  
- Backend and frontend run locally with CORS enabled  
- No scraper included in this setup (optional)

---

## Features

- **Job Listing:** Paginated, filterable, and sortable job listings  
- **Filters:** Location, job type, and tags (comma separated)  
- **Sorting:** By posting date (newest/oldest) and company name (A-Z, Z-A)  
- **Pagination:** Navigate through pages of job listings  
- **Add Job:** Form to create new job listings with validation  
- **Delete Job:** Remove jobs with confirmation  
- **Responsive UI:** Works well on desktop and mobile devices  
- **Loading and Error States:** User feedback during data fetch and errors

---

## How to Use

- Visit the frontend URL (`http://localhost:5173/`)  
- Use filters and sorting dropdown to browse jobs  
- Add a new job using the form at the bottom  
- Delete jobs using the red delete button on each job card  
- Navigate pages using Previous/Next buttons
