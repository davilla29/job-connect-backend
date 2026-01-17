# Job Connect Backend API

Job Connect is a backend RESTful API built to power a job matching and recruitment platform.  
It handles authentication, user management, job postings, applications, and related features.

---

## 🚀 Features

- User authentication (JWT-based)
- Role-based access (Job Seekers & Employers)
- Job posting management
- Job application system
- Secure REST API structure
- Scalable and modular architecture

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDb**
- **JWT (JSON Web Tokens)**
- **bcrypt**
- **dotenv**

---

## 📁 Project Structure

```
job-connect-backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── mail/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── templates/
│   ├── validators/
│   ├── utils/
│   └── app.js
│   └── server.js
│
├── config/
│   └── connectDB.js
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/davilla29/job-connect-backend.git
cd job-connect-backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_LOCAL_URI=mongodb://127.0.0.1:27017/jobConnectDb
MONGO_ATLAS_URI={online db url}
PORT=5005 (It might be different)
CLIENT_URL=http://localhost:5173 (It might be different)
DB_NAME=job_connect
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Run the server

```bash
npm run dev
```

Server will start on:

```
http://localhost:5005
```

## 👨‍💻 Author

**Bolarinwa David**  
Full-Stack Developer

---
