# 🧠 PERN Backend Tutorial with Prisma & PostgreSQL

## 📌 Overview

This guide is tailored for beginners and intermediate developers who want to understand how to build a **PERN** (PostgreSQL, Express, React, Node.js) backend using **Prisma ORM**. We'll focus primarily on the **backend and database** layers, covering:

- Setting up PostgreSQL and Prisma
- Structuring your backend
- Performing CRUD operations
- Using essential Prisma Client methods: `findMany`, `findUnique`, `create`, `update`, `delete`
- Writing clean, maintainable code
- Connecting to the frontend
- Bonus resources

---

## 📦 Tech Stack

- **Node.js** + **Express**
- **PostgreSQL** (Relational Database)
- **Prisma ORM** (Database toolkit)
- **Dotenv** (Environment variables)
- **Postman** (API testing)
- Optional: **Docker** for PostgreSQL setup

---

## 📁 Folder Structure

```
/project-root
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   └── app.js
│
├── .env
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v18+)
- PostgreSQL installed locally or via Docker
- Familiarity with JavaScript and basic Express

---

## 💪 Step-by-Step Setup

### 1. Initialize Node Project

```bash
mkdir my-pern-backend && cd my-pern-backend
npm init -y
npm install express prisma @prisma/client dotenv cors
```

---

### 2. Initialize Prisma

```bash
npx prisma init
```

This creates:

```
/prisma
  └── schema.prisma
.env
```

---

### 3. Configure `.env`

```env
DATABASE_URL="postgresql://yourusername:yourpassword@localhost:5432/yourdbname"
```

### 4. Define Your Database Schema (`prisma/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
}
```

---

### 5. Migrate Your Database

```bash
npx prisma migrate dev --name init
```

This creates the tables in your PostgreSQL database and generates the Prisma client.

---

### 6. Create `src/app.js`

```js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## ✍️ CRUD Operations with Prisma

### Prisma Client Methods Used:

- `prisma.user.create()`
- `prisma.user.findMany()`
- `prisma.user.findUnique()`
- `prisma.user.update()`
- `prisma.user.delete()`

---

### 💡 Create: `POST /api/users`

```js
export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```

---

### 📖 Read All: `GET /api/users`

```js
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```

---

### 📄 Read One: `GET /api/users/:id`

```js
export const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```

---

### 📝 Update: `PUT /api/users/:id`

```js
export const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { name, email },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```

---

### ❌ Delete: `DELETE /api/users/:id`

```js
export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.user.delete({ where: { id } });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```

---

## 🔗 Route File (`routes/user.routes.js`)

```js
import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
```

---

## 🧪 Test Your API with Postman

1. Create a new collection
2. Add routes: `POST`, `GET`, `PUT`, `DELETE`
3. Send test data and confirm database changes

---

## 📘 Learning Resources

### Prisma Docs

- [https://www.prisma.io/docs](https://www.prisma.io/docs)
- [Prisma YouTube](https://www.youtube.com/c/PrismaData)

### PostgreSQL

- [https://www.postgresqltutorial.com/](https://www.postgresqltutorial.com/)
- [https://sqlbolt.com/](https://sqlbolt.com/)

### Express.js

- [https://expressjs.com/](https://expressjs.com/)

### Full Stack Learning

- [The Odin Project: Full Stack JavaScript Path](https://www.theodinproject.com/paths/full-stack-javascript)

---

## 🧐 Developer Tips

- Use async/await with try-catch for clean error handling
- Always validate inputs with tools like `zod` or `joi`
- Never expose `.env` files in GitHub repos
- Structure code for scalability
- Add middleware for logging, validation, and authentication

---

## ✅ Mini Projects to Practice

- Todo App (with user sessions)

- Budget Tracker (with auth and roles)

---

## 💬 Final Note
