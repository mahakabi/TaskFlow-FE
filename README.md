# TaskFlow-FE

A modern task management frontend built with React + Vite. Features a dark/light UI, Kanban-style project boards, dashboard analytics, and full JWT-based authentication.

🔗 **Live Demo:** [taskflowfe.vercel.app](https://taskflowfe.vercel.app)  
🔗 **Backend API:** [taskflow-be-production.up.railway.app](https://taskflow-be-production.up.railway.app)

---

## Tech Stack

- **React 19** with Vite
- **Material UI (MUI v7)** — component library
- **Zustand** — state management
- **React Router v7** — client-side routing
- **Axios** — HTTP client with interceptors
- **DM Sans** — typography

---

## Features

- 🔐 JWT authentication (register, login, logout)
- 📋 Project management — create, edit, delete projects
- ✅ Task management — Kanban board with To Do / In Progress / Done columns
- 📊 Dashboard — total tasks, completed, overdue with progress visualization
- 🌙 Dark / Light mode toggle
- 📱 Responsive design
- 🔍 Project search
- ⚡ Optimistic UI updates

---

## Project Structure

```
src/
├── core/
│   ├── axios.js          # Axios instance + auth interceptors
│   └── router.jsx        # ProtectedRoute / GuestRoute guards
├── config/
│   └── index.js          # Env constants
├── app/
│   ├── modules/
│   │   ├── auth/         # Login, Register, validators, service
│   │   ├── projects/     # ProjectsPage, ProjectDetailPage, Kanban board
│   │   ├── tasks/        # TaskCard, TaskFormModal, TaskFilters
│   │   └── dashboard/    # DashboardPage, stats, service
│   ├── components/       # Navbar, ConfirmDialog, EmptyState, PageLoader
│   ├── store/            # Zustand stores (auth, theme, projects, tasks)
│   └── utils/            # error-wrapper, http-status
├── App.jsx
└── main.jsx
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- Backend API running (see [TaskFlow-BE](https://github.com/mahakabi/taskflow))

### Installation

```bash
git clone https://github.com/mahakabi/taskflow-frontend
cd taskflow-frontend
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:8001/api
```

### Run Locally

```bash
npm run dev
```

App runs at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## Deployment

Deployed on **Vercel**.

Set the following environment variable in Vercel:

```
VITE_API_URL=https://taskflow-be-production.up.railway.app/api
```

---

## Test Account

| Field    | Value                    |
|----------|--------------------------|
| Email    | example@mail.co   |
| Password | Test12345@               |

---

## Scripts

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Start dev server         |
| `npm run build` | Build for production     |
| `npm run lint`  | Run ESLint               |
| `npm run preview` | Preview production build |