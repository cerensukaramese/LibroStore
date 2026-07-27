# LibroStore

LibroStore is a full-stack bookstore web application developed as a course project. Users can browse books, manage favourites and wish lists, add books to a cart, place orders, review books, and update profile information.

## Features

- User registration and JWT-based authentication
- Recently added and complete book listings
- Book details and user reviews
- Favourite and wish-list management
- Shopping cart and order creation
- Profile, order history, password, and address management
- Backend routes for administrative book and order operations

> The current version does not include a dedicated admin dashboard, category and inventory management, or payment integration.

## Technologies

**Frontend:** React, TypeScript, Vite, Tailwind CSS, Redux Toolkit, Axios  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt

## Project Structure

```text
LibroStore/
├── Frontend/       # React + TypeScript client
├── Backend/        # Express + MongoDB API
└── README.md
```

## Setup

### 1. Backend

```bash
cd Backend
npm install
cp .env.example .env
npm run dev
```

Update `Backend/.env` with your MongoDB URI and a secure JWT secret:

```env
PORT=3000
URI=mongodb://127.0.0.1:27017/librostore
JWT_SECRET=replace_with_a_long_random_secret
```

### 2. Frontend

Open another terminal:

```bash
cd Frontend
npm install
cp .env.example .env
npm run dev
```

The default frontend API address is `http://localhost:3000`. It can be changed using `VITE_API_URL`.

## API Overview

The backend provides routes for:

- Authentication and user settings
- Books and book details
- Favourites and wish lists
- Cart management
- Orders and order history
- Reviews

All endpoints are mounted under `/api/v1`.

## Project Report and Demo

The application was developed for a Web-Based Technologies course. The report describes the implemented user flows and notes that an admin interface, categories, inventory tracking, and more reliable order handling remain future improvements.

Demo video: https://youtu.be/mDnQuYaiwMo

## Known Limitations

- No dedicated admin interface
- No category or stock-management system
- No payment integration
- Order workflow requires further reliability testing
- Automated tests have not yet been added

## Future Work

- Admin dashboard
- Category and inventory management
- Payment provider integration
- Improved validation and error handling
- Automated API and UI tests
- Deployment configuration

