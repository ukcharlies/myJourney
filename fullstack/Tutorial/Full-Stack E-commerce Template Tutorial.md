# Full-Stack E-commerce Template Tutorial

Welcome to this step-by-step guide for building a **full-stack e-commerce template** using **React**, **Node.js**, **Express**, **Prisma ORM**, and **PostgreSQL**. This tutorial is designed to help you understand both frontend and backend development by building a live e-commerce application.

This tutorial is based on the repository [`onyiiTrims-01-frontend`](https://github.com/ukcharlies/onyiiTrims-01-frontend). By the end, you'll have a complete understanding of how to structure and build full-stack applications from scratch.

---

## Project Structure Overview

In a full-stack application, we typically divide the project into two main sections:

```bash
project-root/
├── 01-frontend/        # React Frontend (UI)
└── 02-backend/         # Node.js Backend (API)
```

Each section has its own purpose:

- **Frontend**: Handles the user interface and communicates with the backend.
- **Backend**: Processes the data, communicates with the database, and serves data to the frontend.

Let's dive deeper into each section!

---

## Frontend Setup (01-frontend)

### 1. Create a Vite React Project

Vite is a build tool that provides a fast development experience for React. It is an alternative to tools like Create React App (CRA).

Run this command to create a new React project using Vite:

```bash
npm create vite@latest 01-frontend -- --template react
cd 01-frontend
```

This will generate a new React app in the `01-frontend` folder.

### 2. Install Dependencies

In this step, you'll install necessary dependencies for routing, UI components, and styling:

```bash
npm install react-router-dom flowbite flowbite-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- `react-router-dom`: Handles routing for page navigation.
- `flowbite` and `flowbite-react`: Provide pre-built UI components to speed up development.
- `tailwindcss`: A utility-first CSS framework for building modern UIs.

### 3. TailwindCSS Setup

To use TailwindCSS, first configure it by editing the `tailwind.config.js` file:

```js
// tailwind.config.js
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
  extend: {},
},
plugins: [require("flowbite/plugin")],
```

Then, import Tailwind’s CSS into your project by updating `index.css`:

```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Environment Variables

Create a `.env` file to store environment variables:

```env
# .env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME="E-commerce Store"
```

This ensures that you can easily change the backend URL and app name depending on the environment.

### 5. Configuration File

Create a configuration file (`config.js`) to access environment variables in a cleaner way:

```js
// src/config/config.js
const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  appName: import.meta.env.VITE_APP_NAME,
};
export default config;
```

This allows your frontend to reference API URLs and app names consistently.

### 6. Custom Hook Example

A custom React hook is a reusable function that handles a specific piece of logic. In this example, we're fetching categories from the backend.

```js
// src/hooks/useCategories.js
import { useEffect, useState } from "react";
import config from "../config/config";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${config.apiUrl}/categories`)
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
};
```

In this hook:

- `useEffect` fetches data from the backend when the component mounts.
- `useState` stores the categories, loading state, and any errors.

### 7. Routing Configuration

We need to set up routes for navigating between pages.

```js
// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "./shared/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import CategoryPage from "./pages/CategoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "category/:categoryId", element: <CategoryPage /> },
    ],
  },
]);

export default router;
```

This configuration ensures the app navigates between the homepage, about page, and category pages.

### 8. Layout Structure

The layout is the main structure of your app, containing reusable elements like a navigation bar.

```js
// src/shared/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    <Navbar />
    <main className="container mx-auto px-4 py-8">
      <Outlet />
    </main>
  </div>
);

export default Layout;
```

`<Outlet />` renders the content of the page based on the active route.

---

## Backend Setup (02-backend)

### 1. Initialize Project

Start by creating a new backend folder and initialize the project:

```bash
mkdir 02-backend && cd 02-backend
npm init -y
npm install express cors dotenv @prisma/client
npm install -D prisma nodemon
```

This installs:

- `express`: A web framework for building the backend.
- `cors`: Middleware for enabling Cross-Origin Resource Sharing.
- `dotenv`: To manage environment variables.
- `@prisma/client`: Prisma’s client to interact with the PostgreSQL database.
- `prisma`: The Prisma CLI tool to manage the database schema.
- `nodemon`: A tool that automatically restarts the server when code changes.

### 2. Prisma Setup

Prisma helps you interact with the database in a type-safe way. To get started, initialize Prisma:

```bash
npx prisma init
```

This creates the `prisma` folder with a `schema.prisma` file, where you define the data models.

### 3. Prisma Schema

In the `schema.prisma` file, you’ll define your database models. Here’s an example with `ProductCategory` and `Product`:

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model ProductCategory {
  id          String    @id @default(cuid())
  name        String
  description String
  products    Product[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Product {
  id           String          @id @default(cuid())
  title        String
  description  String?
  price        Float
  stock        Int            @default(0)
  isFeatured   Boolean        @default(false)
  productImage String         @default("https://via.placeholder.com/150")
  categoryId   String
  category     ProductCategory @relation(fields: [categoryId], references: [id])
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt
}
```

This schema defines `ProductCategory` and `Product` with relationships between them.

### 4. Server Configuration

Set up the basic Express server with routes for products and categories.

```js
// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use("/products", require("./routes/productRoutes"));
app.use("/categories", require("./routes/categoryRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
```

### 5. Error Handling Middleware

This middleware handles errors and sends responses to the client.

```js
// middleware/error.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
};

module.exports = errorHandler;
```

---

## Development Workflow

1. Clone the repo.
2. Run `npm install` in both frontend and backend directories.
3. Set up PostgreSQL and update `.env` with your database connection details.
4. Run Prisma migrations to initialize the database:

```bash
npx prisma migrate dev --name init
```

5. Start the backend with:

```bash
nodemon server.js
```

6. Start the frontend with:

```bash
npm run dev
```

---

## Next Steps

- Add user authentication using **JWT** and **bcrypt**.
- Implement payment gateways like **Stripe** or **Paystack**

.

- Enhance the UI with more advanced features like a shopping cart.

---
