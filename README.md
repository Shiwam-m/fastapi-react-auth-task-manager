# Full-Stack Task Orchestrator 🚀

A production-ready task management system built with a modular architecture. This project showcases secure user authentication, relational database management, and a modern responsive UI.

## 🛠️ Tech Stack
- **Backend:** FastAPI, SQLAlchemy (ORM), Pydantic (Validation), JWT (Auth)
- **Frontend:** React.js, Tailwind CSS, Axios
- **Database:** PostgreSQL / SQLite
- **DevOps:** Alembic (Migrations), Python-dotenv

## 🏗️ Project Architecture
The project follows a clean **Controller-Router-Model** pattern:
- `backend/src/user`: Handles JWT registration, login logic, and password hashing.
- `backend/src/tasks`: Manages CRUD operations with user-specific ownership logic.
- `backend/src/utils`: Database configuration and global dependency injections.

## 🔑 Key Features
- **Secure Authentication:** Password hashing using `pwdlib` and session management via JWT.
- **Data Integrity:** Cascading deletes and foreign key relationships between users and tasks.
- **Modular Routes:** Clean API structure with FastAPI `APIRouter`.
- **Responsive UI:** Fully interactive dashboard built with React and Tailwind.

## 🚀 Getting Started

### Backend Setup
1. `cd task_managemet_app`
2. `pip install -r requirements.txt`
3. Create a `.env` file with `SECRET_KEY`, `ALGORITHM`, and `DB_CONNECTION`.
4. `uvicorn main:app --reload`

### Frontend Setup
1. `cd task_manager_frontend`
2. `npm install`
3. `npm start`
