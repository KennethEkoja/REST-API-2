# User CRUD API

A beginner‑friendly **Node.js + Express + PostgreSQL** REST API that lets you **Create, Read, Update and Delete** users.

---

## 📑 Table of Contents
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Quick Start](#quick-start)
5. [Environment Variables](#environment-variables)
6. [Database Setup](#database-setup)
7. [Running the Server](#running-the-server)
8. [API Reference](#api-reference)
9. [Error Handling](#error-handling)
10. [Testing with Postman](#testing-with-postman)
11. [Project Scripts](#project-scripts)
12. [Folder Structure](#folder-structure)
13. [Contributing](#contributing)
14. [License](#license)

---

## ✨ Features
- 🔌 **Connects** seamlessly to PostgreSQL using a connection pool  
- 🛠 **Full CRUD** endpoints (`GET`, `POST`, `PUT`, `DELETE`) for the `users` table  
- 🛡 **Parameterized queries** – safe against SQL‑injection  
- 💬 **Clear error messages** with appropriate HTTP status codes  
- 🌱 Minimal codebase – perfect for beginners to extend

---

## 🖥 Tech Stack
| Layer          | Technology |
|----------------|------------|
| Runtime        | [Node.js](https://nodejs.org/) |
| Web framework  | [Express](https://expressjs.com/) |
| Database       | [PostgreSQL](https://www.postgresql.org/) |
| Driver / ORM   | [`pg` (Native driver)](https://node-postgres.com/) |

---

## 💡 Prerequisites
- **Node.js ≥ 18**  
- **npm** (comes with Node)  
- **PostgreSQL ≥ 13** (local or remote instance)  

> **Tip:** On Windows, the official PostgreSQL one‑click installer is the easiest path.

---

## 🚀 Quick Start

```bash
git clone <your-fork-url> user-crud-api
cd user-crud-api

# install dependencies
npm install

# copy sample environment file and fill in your DB creds
cp .env.example .env

# run database migrations (creates the users table)
npm run db:init      # ← uses psql under the hood

# start the server in dev‐mode
npm run dev
```

Server boots at **`http://localhost:7000`**.

---

## 🔐 Environment Variables

Create a `.env` file at the project root:

```dotenv
PGUSER=postgres
PGPASSWORD=your_password
PGHOST=localhost
PGPORT=5432
PGDATABASE=userdb
PORT=7000
```

The app loads these with the `dotenv` package (already installed).

---

## 🗄 Database Setup

```sql
-- connect to psql
CREATE DATABASE userdb;
\c userdb

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name  VARCHAR(100),
  email VARCHAR(100),
  age   INTEGER
);
```

Alternatively run:

```bash
npm run db:init
```

Which executes the SQL above automatically.

---

## 🏃‍♂️ Running the Server

| Mode        | Command              | Description |
|-------------|----------------------|-------------|
| Development | `npm run dev`        | Auto‑reloads on file changes via **nodemon** |
| Production  | `npm start`          | Runs `node index.js` |

The default port is **7000**, but you can override it in `.env`.

---

## 📡 API Reference

### Base URL
```
http://localhost:7000
```

### Endpoints

| Method | Route              | Description |
|--------|--------------------|-------------|
| GET    | `/users`           | Return **all** users |
| GET    | `/users/:id`       | Return a **single** user |
| POST   | `/users`           | **Create** a new user |
| PUT    | `/users/:id`       | **Update** an existing user |
| DELETE | `/users/:id`       | **Delete** a user |

#### 1. `GET /users`
```bash
curl http://localhost:7000/users
```
**Response 200**
```json
[
  {
    "id": 1,
    "name": "Alice",
    "email": "alice@test.com",
    "age": 30
  }
]
```

#### 2. `GET /users/:id`
`GET /users/1` → returns user **1** or **404** if not found.

#### 3. `POST /users`
```bash
curl -X POST http://localhost:7000/users      -H "Content-Type: application/json"      -d '{"name":"Bob","email":"bob@test.com","age":22}'
```
**Response 201** → the newly created record.

#### 4. `PUT /users/:id`
```bash
curl -X PUT http://localhost:7000/users/1      -H "Content-Type: application/json"      -d '{"name":"Alice B.","email":"aliceb@test.com","age":31}'
```

#### 5. `DELETE /users/:id`
Returns `200 { "message": "User deleted successfully" }`  

For unknown IDs → `404`.

---

## 🚨 Error Handling
| Status | Cause                          | Example message                 |
|--------|--------------------------------|---------------------------------|
| 400    | Invalid JSON / missing fields  | `{"error":"name is required"}`  |
| 404    | Non‑existent user id           | `{"message":"User not found"}`  |
| 500    | Database or server failure     | `{"error":"connection refused"}`|

---

## 🔬 Testing with Postman

1. Import the **`postman_collection.json`** (included).  
2. Press **▶️ Run** to execute all five requests.  
3. Check that every test reports **Status: PASSED**.

Take screenshots for your assessment submission.

---

## 🛠 Project Scripts

| Script          | What it does                            |
|-----------------|-----------------------------------------|
| `npm start`     | Run server once (prod)                  |
| `npm run dev`   | Run server with auto‑reload             |
| `npm run db:init` | Create database & table via `psql`    |
| `npm test`      | Placeholder for future tests           |

---

## 📁 Folder Structure

```
user-crud-api
├── db.js            # DB connection pool
├── index.js         # Express entry point
├── routes/
│   └── users.js     # CRUD controllers
├── migrations/
│   └── 001_init.sql # create users table
├── .env.example     # sample env file
├── package.json
└── README.md
```

---

## 🤝 Contributing
Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

---

## 📜 License
MIT © 2025 Emmanuelah Damilola
