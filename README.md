# 🛡️ Auth API – Authentication & Authorization with Express.js

A secure and scalable **authentication and authorization** service built using **Express.js**, **MongoDB Atlas**, and **JWT**. This app enables users to **sign up**, **log in**, and access **protected routes** with secure **cookie-based JWT tokens**. It uses **bcrypt** for password encryption and **MongoDB Compass** to visually manage your **MongoDB Atlas cluster**.

## 🔧 Tech Stack

- **Node.js** & **Express.js** – Backend server and routing
- **MongoDB Atlas** – Cloud-hosted NoSQL database
- **MongoDB Compass** – GUI for viewing and managing the cluster
- **Mongoose** – ODM for MongoDB
- **JWT (jsonwebtoken)** – Stateless authentication
- **cookie-parser** – To handle secure cookies
- **bcrypt** – For password hashing

---

## ✨ Features

- ✅ User **signup** and **login**
- 🍪 **JWT authentication** stored in HTTP-only cookies
- 🔐 **Protected routes** using middleware
- 🔄 Passwords hashed using **bcrypt**
- 🌍 Connected to a **MongoDB Atlas cluster** (viewable via **Compass**)

---

## 📁 Project Structure

```none
auth-api/
├── config/
│   └── database.js
├── controllers/
│   └── Auth.js
├── middlewares/
│   └── auth.js
├── models/
│   └── User.js
├── routes/
│   └── user.js
├── .env
├── index.js
└── package.json
```

---
## ⚙️ Installation Guide
Follow the steps below to get the project up and running locally on your machine. 🚀
---
### 1. Clone the repository

```bash
git clone https://github.com/phygma/Auth-App.git
cd auth-api
```
---
### 2. Install dependencies
```bash
npm install
```
---
### 3. Set up your environment
Create a .env file in the root directory with the following variables:

```env
PORT=4000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```
> 🔐 **Note:** Replace `your_mongodb_atlas_connection_string` and `your_jwt_secret` with your actual secrets
---
### 4. Start the server
```bash
npm run dev
```

The server will run at: http://localhost:4000
---
## 🔑 API Endpoints
----
| Method | Endpoint   | Description                                      | Protected | Role/Notes                  |
|--------|------------|--------------------------------------------------|-----------|-----------------------------|
| POST   | `/signup`  | Registers a new user and stores hashed password | ❌ No     | Public                      |
| POST   | `/login`   | Authenticates user, returns JWT in cookie       | ❌ No     | Public                      |
| GET    | `/student` | Access content meant for authenticated students | ✅ Yes    | Requires valid JWT          |
| GET    | `/admin`   | Access content restricted to admin users        | ✅ Yes    | JWT + admin role required   |
---
### 📌 POST /signup
Registers a new user.
- Request Body (JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "student"  // Optional: defaults to "student" if not provided
}
```
- Response
```json
{
    "success":true,
    "message":"user created successfully"
}
```
---
### 📌 POST /login
Authenticates a user and issues a JWT token via an HTTP-only cookie.
- Request Body (JSON):
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```
- Response:
```json
{
        "success" :true,
         token,
         user,
        "message":"User logged in successfully"
}
```
---
### 📌 GET /student
Access content reserved for logged-in users with the role student.
- Protected? ✅ Yes (JWT token required)
- Authorization Logic:
    - Middleware verifies JWT.
    - Checks if the role field is "student".
- Response:
```json
{
  "success":true,
  "message":"Welcome to the protected route for students"
}
```
----
### 📌 GET /admin
Access content restricted to users with the admin role.

- Protected? ✅ Yes (JWT + role check)
- Authorization Logic:
    - JWT must be valid.
    - User's role must be "admin".
- Response:
```json
{
  "success":true,
  "message":"Welcome to the protected route for admins"
}

```
---
### 📛 Error Responses

Common responses include:

- `401 Unauthorized` – Invalid or expired token.
- `403 Forbidden` – Insufficient permissions.
- `400 Bad Request` – Validation error or missing fields.
- `500 Internal Server Error` – Something went wrong.


---
## 🔒 Security Overview
-> 🧂 Passwords are securely hashed using bcrypt

-> 🔐 JWTs are signed and stored in HTTP-only cookies

-> 🛡️ Middleware validates JWT and controls access to protected routes

---
## 🌐 Author
Aman Arora  
[LinkedIn](linkedin.com/in/aman-arora-38b6a2245)


