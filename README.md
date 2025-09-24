# 🗺️ D&D Map Generator  

A **React.js + Express.js + MongoDB** web application for creating, customizing, and sharing **Dungeons & Dragons maps**.  
The app provides both **guest access** and **registered user accounts**, allowing dungeon masters and players to collaborate, explore, and store their campaigns in one place.  

---

## ✨ Core Functionality  

### 👤 Guests  
- 🔑 Access to **Login** and **Register** pages.  
- 📰 Can browse **posts** (maps created by users).  
- 🗺️ Can preview **available map biomes** (e.g., desert, forest, cave).  
- ❌ Cannot create, edit, or save maps.  

### 🧙 Registered Users  
- 🏠 **Profile Page**  
  - View maps they created.  
  - See maps they marked as favorites.  
- 🗺️ **Map Management**  
  - Create as many maps as they want.  
  - Edit and update maps.  
  - Delete maps they no longer need.  
- ❤️ **Community Interaction**  
  - Like or favorite maps created by others.  
  - Leave comments on maps.  
- 📥 **Downloads**  
  - Download their favorite maps for offline use.  

---

## 🚀 Features  

- 🎨 **Interactive Map Editor**  
  - Drag-and-drop items (trees, houses, monsters, etc.).  
  - Resize, rotate, and delete items directly on the map.  
  - Choose biomes for different map types (forest, desert, cave, etc.).  

- 👥 **User System**  
  - Secure login and registration with authentication.  
  - User profiles with saved and favorite maps.  

- 🌍 **Community & Sharing**  
  - Like and favorite maps.  
  - Comment under maps for feedback or collaboration.  
  - Download maps for offline use.  

- 📦 **Backend & Database**  
  - RESTful API with Express.js.  
  - MongoDB for storing users, maps, favorites, and comments.  
  - Mongoose for data modeling.  

---

## 🏗️ Tech Stack  

- **Frontend:** React.js  
- **Backend:** Express.js (Node.js)  
- **Database:** MongoDB (Mongoose)  
- **Other Tools:** JWT authentication

---

## 📂 Project Structure  

dnd-map-generator/
│
├── map-generator-frontend/
│ ├── public/
│ ├── src/
│ │ ├── components
│ │ │── api
│ │ │── context
│ │ │── guards
│ │ │── hooks
│ │ │── providers
│ │ │── utils
│ │ ├── assets
│ │ ├── App.css
│ │ ├── App.jsx 
│ │ └── main.jsx 
│ ├── package.json
├
├── backend/
│ ├── src/
│ │ ├── controllers
│ │ │── lib
│ │ │── middleware
│ │ │── models
│ │ │── services
│ │ │── utils
│ │ │── constants.js
│ │ │── index.js
│ │ │── routes.js
│
├── .gitignore
├── README.md
└── LICENSE
---
---

## ⚙️ Installation  

Clone the repository:  

```bash
git clone https://github.com/your-username/dnd-map-generator.git
cd dnd-map-generator
```
---

## Install dependencies

## Backend:
```
cd server
npm install
```

## Frontend:
```
cd client
npm install
```

## Environment Variables

Create a .env file inside the server/ directory:
```
JWT_SECRET=your_secret_key
```

---

## Run the app

## Backend:
```
cd server
npm run dev
```

## Frontend:
```
cd client
npm start
```
---

## 🌍 API Endpoints

## Method	     Endpoint	              Description

POST	       /api/auth/register	    Register new user
POST	       /api/auth/login	      Login existing user
GET	         /api/maps	            Get all maps
GET	         /api/maps/:id	        Get single map by ID
POST	       /api/maps	            Create a new map (user only)
PUT	         /api/maps/:id	        Update a map (user only)
DELETE	     /api/maps/:id	        Delete a map (user only)
POST	       /api/maps/:id/like	    Like a map
POST         /api/maps/:id/fav	    Favorite a map
POST	       /api/maps/:id/comment	Leave a comment
GET	         /api/users/:id        	Get user profile (maps + favorites)
