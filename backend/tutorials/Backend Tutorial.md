```markdown
# PERN Backend Tutorial (Node.js + Express + PostgreSQL + Prisma)

Welcome to the backend documentation for our PERN stack project. This guide is for both contributors and learners who want to understand how to build a RESTful backend using Node.js, Express, PostgreSQL, and Prisma ORM.

## 🎯 Project Purpose

This backend serves as the foundation for a full-stack web application built with the PERN stack. It handles API routes, interacts with a PostgreSQL database through Prisma, and sets up a solid structure for scalability and maintainability.

---

## 📘 Prerequisites

Before diving in, you should have:

- Basic knowledge of JavaScript
- Understanding of how APIs work
- Some familiarity with SQL and databases

### Tools You'll Need

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [Postman](https://www.postman.com/) or any API testing tool

---

## 🧠 What You’ll Learn

- How Express handles HTTP requests
- Route and Controller setup
- Middleware use for validation/authentication
- How Prisma ORM connects to PostgreSQL
- RESTful API design (GET, POST, PUT, DELETE)
- Error handling and async patterns
- Environment variables setup
- Folder structure for scaling your project

---

## 🗂️ Project Structure
```

backend/
├── controllers/
├── middleware/
├── routes/
├── prisma/
│ └── schema.prisma
├── utils/
├── .env
├── app.js
├── server.js
└── package.json

````

---

## ⚙️ Setting Up the Project

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/pern-backend.git
cd pern-backend
````

### 2. Install dependencies

```bash
npm install
```

### 3. Setup `.env` file

```env
DATABASE_URL="postgresql://username:password@localhost:5432/your_db"
PORT=5000
```

### 4. Initialize Prisma and PostgreSQL

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Start the server

```bash
npm run dev
```

---

## 🔁 RESTful Endpoints

Each route follows this pattern:

| Method | Route            | Description        |
| ------ | ---------------- | ------------------ |
| GET    | `/api/items`     | Get all items      |
| GET    | `/api/items/:id` | Get one item by ID |
| POST   | `/api/items`     | Create a new item  |
| PUT    | `/api/items/:id` | Update item by ID  |
| DELETE | `/api/items/:id` | Delete item by ID  |

Controllers handle logic, services handle DB queries, and middleware handles validations.

---

## 🔐 Middleware

Use middleware for things like:

- Input validation
- Authentication
- Logging

Example:

```js
const validateData = (req, res, next) => {
  if (!req.body.name)
    return res.status(400).json({ error: "Name is required" });
  next();
};
```

---

## 🛠️ Prisma Essentials

### Example schema

```prisma
model Item {
  id        Int      @id @default(autoincrement())
  name      String
  createdAt DateTime @default(now())
}
```

### CRUD Example (Controller)

```js
const prisma = require("../prisma/client");

const getItems = async (req, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
};
```

---

## 🧑‍🏫 Resources for Learning

### Backend & Node.js

- [Node.js Docs](https://nodejs.org/en/docs)
- [Express Docs](https://expressjs.com/)
- [RESTful API Tutorial](https://restfulapi.net/)
- [JavaScript.info](https://javascript.info/)

### Prisma + PostgreSQL

- [Prisma Docs](https://www.prisma.io/docs/)
- [PostgreSQL Basics](https://www.postgresqltutorial.com/)

### Video Tutorials

- [PERN Stack Crash Course – freeCodeCamp](https://www.youtube.com/watch?v=ldYcgPKEZC8)
- [Prisma Crash Course – Traversy Media](https://www.youtube.com/watch?v=RebA5J-rlwg)

---

## ✅ Tips for Young Devs

- **Start small**: Don’t rush into advanced topics. Learn CRUD well first.
- **Understand the flow**: Request ➡️ Middleware ➡️ Controller ➡️ DB ➡️ Response
- **Use Postman**: To test endpoints and see results quickly.
- **Read error messages**: They tell you _exactly_ what’s wrong.
- **Ask questions**: Don’t suffer in silence. Google is your friend.
- **Stay consistent**: 1 hour a day beats 5 hours once a week.

---

## 🙌 Contributing

Feel free to fork this repo, open issues, and make pull requests. This project is a learning ground.

---

## 🔗 About the Maintainer

Built and maintained by **[@ukcharlies](https://github.com/ukcharlies)** a.k.a **6ixthedev**  
Helping the next gen of builders grow ⚒️

---
