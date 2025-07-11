
# Esquared Web App

**Esquared** is a full-featured photography business platform built with the MERN stack. It allows customers to book photography sessions, remove image backgrounds (for logged-in users), and provides an admin dashboard for managing business operations.

---

## 🚀 Objectives

* Enable clients to **book sessions online** based on admin-defined availability.
* Allow **Google-based sign-in** for a seamless user experience.
* Offer an **AI-powered background removal tool** (authenticated users only).
* Provide **admins** with control over:

  * Bookings
  * Customer enquiries
  * Availability (opening hours & disabled dates)
  * Daily analytics with graphs (visits & bookings)
* Process payments securely using **Stripe**.
* Send **automated emails** for confirmations, responses, and invoices.

---

## 🧰 Tech Stack

* **Frontend:** React (Vite), Chakra UI (with Dark/Light Mode)
* **Backend:** Node.js, Express
* **Database:** MongoDB
* **Authentication:** Passport.js (Google OAuth), JWT
* **Token Storage:** Upstash Redis (`ioredis`)
* **Payments:** Stripe
* **Emailing:** Nodemailer
* **Analytics:** Page visits & bookings tracked and visualised

---

## 🧪 Features

### 🔒 Authentication

* Google Sign-In via OAuth2
* JWT-based access/refresh token system
* Tokens stored securely in Redis

### 📆 Booking System

* Customers can view available dates/times
* Admins can configure availability:

  * Set opening times per day
  * Disable specific dates
* Bookings auto-confirmed and emailed to users

### 🖼️ Background Removal

* Signed-in users can upload images and remove backgrounds using an integrated tool `@imgly/background-removal-node`

### 📈 Admin Dashboard

* Manage bookings and enquiries
* Set and manage business availability
* Track daily visits and bookings via visual graphs

### 💵 Payments

* Stripe integration for session payments
* Invoice sent via email on confirmation

---

## 📂 Project Structure

```
/Esquared
│
├── backend        # Express server, routes, controllers
├── frontend       # React app with Chakra UI
└── .env
```

---

## 🛠️ Running the Project

### 📌 Prerequisites

* Node.js & npm
* MongoDB database
* Upstash Redis account
* Google OAuth credentials
* Stripe account

### ⚙️ Environment Variables

Create a `.env` file in the `root` directory with the following:

```env
MONGO_DB_URI=
PORT= eg. 5002

NODE_ENV=development
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
UPSTASH_REDIS_URL=
ADMIN_EMAIL=
ADMIN_PASSWORD=
STRIPE_SECRET_KEY=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CLIENT_URI=
VITE_GOOGLE_AUTH_URL=
FAILURE_REDIRECT= eg. http://localhost:5173/login

CLIENT_URL= eg. http://localhost:5173
```

---

## 🚦 Getting Started

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open your browser and visit: `http://localhost:5173` or `CLIENT_URL`

---

