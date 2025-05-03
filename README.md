🧩 Task Management System
A feature-rich Task Management System built for small teams to collaborate efficiently. It provides secure authentication, robust task management, and collaborative features, all wrapped in a clean, modern interface.

🚀 Live Demo
🔗 [Visit the Live App](https://task-tango-k3c0rbbix-mayank-kumars-projects-be8f0a55.vercel.app/dashboard)
📂 [GitHub Repository](https://github.com/mayaank08/Task-Tango)

📌 Features

🧠 Task Management
Create, Read, Update, Delete (CRUD) for tasks.

Attributes: Title, Description, Due Date, Priority, and Status.

👥 Team Collaboration
Assign tasks to other registered users.

Notification system to alert users when a task is assigned.

📊 Dashboard
View:

Tasks assigned to the user.

Tasks created by the user.

Overdue tasks.

🔍 Search and Filter
Search tasks by title or description.

Filter tasks by:

Status

Priority

Due date

⚙️ Tech Stack
Layer	Tech
Frontend	Next.js + Tailwind CSS
Backend	NestJS or Express.js
Database	MongoDB or PostgreSQL
Auth	JWT, bcrypt
Deployment	Vercel (Frontend), Railway/Render (Backend + DB)

📦 Setup Instructions
Clone the Repository

bash
Copy
Edit
git clone https://github.com/your-username/task-management-system.git
cd task-management-system
Install Dependencies

bash
Copy
Edit
# For both frontend and backend
npm install
Environment Variables
Create .env files in both /frontend and /backend with necessary credentials (e.g., JWT secrets, DB URIs, API base URLs).

Run Locally

bash
Copy
Edit
# Start Backend
cd backend
npm run start:dev

# Start Frontend
cd ../frontend
npm run dev
🔍 My Approach
Clean Architecture: Followed modular structure for scalability and maintainability.

Edge Cases Handled: Tasks assigned to non-existent users, overdue logic, invalid filters.

Code Readability: Meaningful commit messages, modular structure, comments where needed.

📌 Assumptions & Trade-offs
Users are self-managed post-registration; RBAC was implemented optionally (if done).

Notifications are in-app only unless otherwise extended.

Basic validations are done both client- and server-side.

🧪 Optional Advanced Features (Implemented / In Progress)
 Role-Based Access Control (RBAC)

 Real-Time Notifications (via Socket.io)

 Recurring Tasks

 Audit Logging

 Offline Support (PWA)

 Unit/Integration Tests (Jest)

 Analytics Dashboard

 Customizable Notification Preferences

🤖 How I Used AI
Used ChatGPT to:

Brainstorm component architecture and backend API design.

Review code logic and improve performance.

Generate boilerplate snippets quickly.

Suggest test cases and edge condition handling.

Final logic, structure, and decisions were made based on my understanding and learning goals.

📝 License
This project is licensed under the MIT License.

