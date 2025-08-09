# ⚡ Event Portal Backend

This is the **backend API** for the Event Portal application, built with **Node.js**, **Express.js**, and **MongoDB** using **Mongoose (ODM)**.
It handles authentication, event management, and category management.

---

## 📂 Folder Structure

```
backend/

 controllers/       # Route handler logic
 middleware/        # Auth & other middleware
 models/            # Mongoose schemas
 routes/            # Express routes
 services/          # Business logic (Auth service, etc.)
 .env               # Environment variables
 .gitignore
 package.json
 server.js          # App entry point
```

---

## ⚙️ Setup Instructions

### 1️⃣ Navigate to backend folder

```bash
cd backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env` file

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/Event-Portal
JWT_SECRET=your_jwt_secret_here
CLIENT_URL=http://localhost:5173
```

### 4️⃣ Run the backend

```bash
npm run dev
```

The API will be running at **[http://localhost:5000](http://localhost:5000)**

---

## 🔑 Features

* **JWT Authentication** — Register, Login, Logout
* **Single Login Enforcement** — Logs out previous session if user logs in elsewhere
* **Event Management** — Create, Read, Update, Delete events
* **Category Management** — Supports parent-child relationships
* **Rate Limiting** — Prevents excessive requests
* **ESLint** — For code quality

---

## 📌 API Endpoints

### **Auth**

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |
| POST   | `/api/auth/logout`   | Logout user         |

### **Events**

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| GET    | `/api/events`     | List all events  |
| POST   | `/api/events`     | Create new event |
| PUT    | `/api/events/:id` | Update event     |
| DELETE | `/api/events/:id` | Delete event     |

### **Categories**

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| GET    | `/api/categories`     | List all categories |
| POST   | `/api/categories`     | Create new category |
| PUT    | `/api/categories/:id` | Update category     |
| DELETE | `/api/categories/:id` | Delete category     |

---

## 🔄 Running with Frontend

1. **Start backend**:

   ```bash
   cd backend
   npm run dev
   ```
2. **Start frontend**:

   ```bash
   cd frontend
   npm run dev
   ```

---

## 🗄 Database

* **MongoDB** is used as the database
* Database name: `Event-Portal`
* Collections:

  * `users`
  * `events`
  * `categories`
