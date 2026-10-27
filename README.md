# Smart Campus Management System

A local academic project based on the submitted synopsis and report: React + Vite frontend, Node.js + Express REST API, MySQL database, JWT login, and role-aware modules for students, courses, attendance, fees and notices.

## Requirements
- Node.js 18+ and npm
- MySQL 8+ (running locally)
- A browser

## Setup (Windows / VS Code)
1. Extract the ZIP.
2. Open MySQL Workbench or the MySQL command line and run `database/schema.sql`.
3. Open a terminal in `server` and run `npm install`.
4. Copy `server/.env.example` to `server/.env` and set your MySQL password. Keep the JWT secret private.
5. In `server`, run `npm run seed` once to create demo accounts and sample records.
6. In the same terminal run `npm run dev` (API runs on http://localhost:5000).
7. Open a second terminal in `client`, run `npm install`, then `npm run dev`.
8. Open the URL printed by Vite (normally http://localhost:5173).

## Demo accounts (local evaluation only)
- Admin: `admin@smartcampus.local` / `Admin@123`
- Teacher: `teacher@smartcampus.local` / `Teacher@123`
- Student: `student@smartcampus.local` / `Student@123`

Change demo passwords and secrets before any deployment. This is an academic prototype, not production-hardened software.

## Included modules
- JWT login and logout
- Dashboard counts and recent activity
- Student directory with search and add/edit/delete (admin only)
- Course listing and add course (admin only)
- Attendance listing and marking (admin/teacher)
- Fee records and summaries
- Notices listing and publishing (admin/teacher)
- Responsive layout, validation and API error messages

## Troubleshooting
- `Access denied for user`: check `DB_USER` and `DB_PASSWORD` in `server/.env`.
- `Unknown database`: run `database/schema.sql` in MySQL first.
- Port already in use: change `PORT` in `server/.env` or stop the other process.
- API not reachable: ensure the server terminal is running on port 5000.
