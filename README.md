# 🗂️ Job Application Tracker

A fullstack web application that helps you keep track of your job applications. You can add, update, categorize, search, and filter your job applications efficiently.

---

## 🌟 Features

- 🔐 **User Authentication** – Register & login using JWT
- 📝 **Job Management** – Add, edit, delete job applications
- 🔍 **Search & Filter** – Search by company/role, filter by status
- 📊 **Dashboard** – Shows total applications and count by status
- 📆 **Date Picker** – Select application date (future dates disabled)
- 🍞 **Toast Alerts** – Feedback on actions
- 📱 **Responsive** – Optimized for mobile screens
- ⚙️ **Pagination** – For large datasets
- 🧾 **Plain HTML/CSS** – No UI frameworks used
- 📁 **Clean Code Structure** – Separate frontend & backend folders

---

## 🛠️ Tech Stack

### Frontend

- ReactJS
- Context API (state management)
- React Hook Form + Yup (form validation)
- React Router
- Axios
- Plain CSS

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (authentication)
- CORS, dotenv

---

## 🔐 Environment Variables

### Backend (`/server/.env`)

| Variable     | Description                       |
| ------------ | --------------------------------- |
| `PORT`       | Server port (e.g. `5000`)         |
| `MONGO_URI`  | MongoDB connection string (Atlas) |
| `JWT_SECRET` | Secret key for signing JWT tokens |

### Frontend (`/client/.env`)

| Variable            | Description                 |
| ------------------- | --------------------------- |
| `REACT_APP_API_URL` | Base URL of the backend API |

> Example included in `.env.example` in the root folder.

---

## 🧑‍💻 Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/job-application-tracker.git
cd job-application-tracker


# Setup Backend
cd server
cp ../.env.example .env   # or create manually
npm install
npm run dev

#  Setup Frontend
cd ../client
cp ../.env.example .env   # or create manually
npm install
npm start



# Deployment Instructions
Backend on Render
1. Connect GitHub repo and create a new Web Service.

2. Use:

    Build Command: npm install

    Start Command: npm start

3. Add environment variables from .env.

Frontend on Netlify or Vercel
1. Connect your GitHub repo.

2. Set:

    Build Command: npm run build

    Publish Directory: build

3. Set environment variable REACT_APP_API_URL.


# Folder Structure
job-application-tracker/
├── client/       # React frontend
│   ├── public/
│   ├── src/
│   └── .env
├── server/       # Node/Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── .env
├── .env.example  # Sample env variables
└── README.md
```

Author
Made by Ziaul Khan
Frontend: https://z-job-application-tracker.netlify.app/login
Backend: https://job-application-tracker-7aho.onrender.com/api
