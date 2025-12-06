# 🌿 CozyQuest

A full-stack web application inspired by Airbnb — built to help users explore, create, and review unique stays with a cozy experience.

---

## 🔗 Deployed Website

✨ **Live Demo:**(https://cozyquest.onrender.com/listings) 

---

## 🚀 Features

### 🏡 Listings

* Create, edit, delete property listings
* Upload images
* View listing details
* Map + location support (optional)

### ⭐ Reviews

* Add reviews to listings
* Delete your own reviews
* Flash messages for success/error

### 👤 User Authentication

* User signup & login
* Secure password hashing using Passport.js
* Session-based auth with `express-session` & MongoStore

### 🎨 UI & Templates

* Clean EJS templates
* Reusable components using **ejs-mate**
* Responsive layout

---

## 🛠️ Tech Stack

### **Frontend**

* EJS
* CSS
* Bootstrap / custom styles

### **Backend**

* Node.js
* Express.js
* Passport.js
* MongoDB + Mongoose
* connect-mongo (session store)

---

## 📁 Folder Structure

```
CozyQuest/
│
├── models/
├── routes/
├── views/
│   ├── layouts/
│   └── listings/
│
├── public/
├── utils/
├── app.js
└── .env
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```
ATLASDB_URL=your_mongodb_connection_string
Secret=your_session_secret
NODE_ENV=development
```

---

## ▶️ Running Locally

```
npm install
node app.js
```

App runs at:

```
http://localhost:8080
```

---

## 🚢 Deployment

Fully compatible with:

* Render
* Railway
* Vercel (server)
* AWS EC2

---

## 🤝 Contributing

Pull requests are welcome. Open issues for bugs or improvements.

---

## 💛 Author

Built with love and lots of learnings by **Bhakti**.
