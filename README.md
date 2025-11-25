Here’s the updated README section with the deployment note included:

---

# 🏡 CozyQuest – Accommodation Listing Web App

A full-stack **accommodation listing platform** built using **Node.js, Express, MongoDB, EJS**, and **Bootstrap**. Users can browse listings, view details, create accounts, leave reviews, and manage their own listings through a seamless and responsive interface.

---

## 🚀 Features

### 🔐 **Authentication & Authorization**

* User login/signup with secure password hashing
* Only owners can edit or delete their listings
* Authorization middleware for route protection

### 🏠 **Listings Management**

* Create, edit, delete, and view detailed property listings
* Upload and store images using **Cloudinary**
* Dynamic pricing, location, and category fields
* Clean MVC structure with modular routes & controllers

### ⭐ **Review System**

* Users can leave ratings and comments on listings
* Review deletion supported
* Nested population: reviews → authors

### 🎨 **Responsive UI**

* Built with **Bootstrap** for a clean and modern layout
* Reusable partials for Navbar, Footer & Flash messages
* Mobile-friendly and optimized for all screen sizes

---

## 🌍 **Live Deployment**

**Deployment is currently in progress.**
🔗 The live link will be added here once the deployment is complete.

---

## 🛠️ Tech Stack

**Frontend:** HTML5, CSS3, Bootstrap, EJS
**Backend:** Node.js, Express.js
**Database:** MongoDB Atlas + Mongoose
**Cloud Services:** Cloudinary (image upload), Render (deployment)

---

## 📁 Project Structure (MVC)

```
CozyQuest/
│── models/          
│── routes/          
│── controllers/     
│── views/           
│── public/          
│── app.js           
│── utils/           
```

---

## ⚙️ Installation & Setup

```bash
git clone https://github.com/your-username/CozyQuest.git
npm install
```

Create a `.env` file with:

```
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
DB_URL=
SECRET=
```

Run the app:

```bash
npm start
```

App runs at:
👉 **[http://localhost:8080](http://localhost:8080)**

---

## 📌 Future Enhancements

* Wishlist/Favorites
* Advanced filtering
* Maps integration
* User profile section

---

## 🤝 Contribution

Pull requests are welcome!

