# 🧠 Backend Project Documentation

This backend project is structured using **Node.js**, **Express.js**, and **Prisma ORM** connected to a **PostgreSQL** database. The codebase is modular, scalable, and follows RESTful API principles. Below is an explanation of each component and how they work together.

---

## 📁 Folder Structure

```
backend/
├── controllers/
├── middleware/
├── prisma/
│   ├── schema.prisma
├── routes/
├── utils/
├── .env
├── server.js
├── package.json
└── README.md
```

---

## 🔧 server.js

### Purpose

- Entry point of the application.
- Connects to the database and sets up middlewares and routes.

### Key Features

- Loads environment variables using `dotenv`.
- Initializes the Express server.
- Connects Prisma client.
- Sets up global error handling and route paths.

---

## 📦 Prisma ORM

### 📄 `schema.prisma`

Defines the structure of your database models and relationships.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       Int    @id @default(autoincrement())
  email    String @unique
  name     String
  posts    Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}
```

### Common Commands

```bash
npx prisma generate     # Generate Prisma Client
npx prisma migrate dev  # Apply migrations to your dev database
npx prisma studio       # GUI to explore your DB
```

---

## 📂 Controllers

### Role

Controllers contain the business logic and respond to HTTP requests.

### Example: `userController.js`

```js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
```

---

## 📂 Routes

### Role

Define URL endpoints and map them to controllers.

### Example: `userRoutes.js`

```js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);

module.exports = router;
```

Then mounted in `server.js`:

```js
app.use("/api/users", require("./routes/userRoutes"));
```

---

## 🛡️ Middleware

### Role

Middleware functions handle things like authentication, error handling, and request parsing.

### Example: `errorHandler.js`

```js
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
};
```

Used in `server.js`:

```js
app.use(require("./middleware/errorHandler"));
```

---

## 🛠️ Utils (Optional)

Helper functions used across your app.

Example: `generateToken.js` (if using JWT)

```js
const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = generateToken;
```

---

## 🔐 Environment Variables

### `.env`

```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
JWT_SECRET=supersecretkey
```

Used via `dotenv`:

```js
require("dotenv").config();
```

---

## 📈 API Sample Flow

```
GET /api/users
→ userRoutes.js
→ userController.getAllUsers()
→ Prisma fetches users from DB
→ Returns JSON response
```

---

## ✅ Postman or Thunder Test

Make sure to test your routes using:

- [Postman](https://www.postman.com/)
- [Thunder Client](https://www.thunderclient.com/) (VSCode extension)

---

## 📌 Coming Next

Add the following if needed:

- Authentication (JWT)
- File Uploads
- Pagination & Filtering
- Unit Tests (Jest)
- Docker Setup

---
