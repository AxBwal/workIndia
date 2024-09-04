

# SDE API Round - IRCTC

This project is a Train Booking API built with Node.js, Express, Prisma, and PostgreSQL. It allows users to book train seats, manage seat capacity, and handle user authentication and transactions.

## Features

- **User authentication** using JWT
- **Seat booking system** with real-time availability
- **Transaction management** for ensuring seat availability
- **Prisma ORM** for database interaction

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14.x or later)
- **PostgreSQL** (running on your system)
- **Prisma CLI** (optional but recommended for database management)

## Installation

Follow these steps to set up and run the project:

### 1. Clone the repository

```bash
git clone https://github.com/AxBwal/workIndia.git

```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following environment variables:

```bash
PORT=3000  # Specify your preferred port number
JWT_SECRET=your_secret_key  # Replace with a secure secret key for JWT
DATABASE_URL=postgresql://username:password@localhost:5432/database_name?schema=public  # Replace with your actual PostgreSQL details
```

### 4. Initialize the database with Prisma

Generate the Prisma client and run database migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Run the server

Start the development server with the following command:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

### 6. Running in production

To start the server in production mode, use:

```bash
npm start
```

## API Endpoints

### Authentication
- **POST /api/v1/signup** - Register a new user.
  - Example: `http://localhost:3000/api/v1/signup`
  
- **POST /api/v1/login** - Log in a user.
  - Example: `http://localhost:3000/api/v1/login`

### Train Management
- **POST /api/v1/trains** - Create a new train.
  - Example: `http://localhost:3000/api/v1/trains`
  
- **POST /api/v1/trains/book/:train_id** - Book seats on a specific train.
  - Example: `http://localhost:3000/api/v1/trains/book/{train_id}`

### Train Availability
- **GET /api/v1/trains/availability?source=A&destination=B** - Check available trains for a given route.
  - Example: `http://localhost:3000/api/v1/trains/availability?source=A&destination=B`

### Booking Management
- **GET /api/v1/bookings/:booking_id** - View details of a specific booking.
  - Example: `http://localhost:3000/api/v1/bookings/{booking_id}`

## Running Tests

No tests have been configured yet. You can add your test cases in the `test` script in the `package.json` file.

## Technologies Used

- **Node.js** - Backend runtime
- **Express.js** - Web framework
- **Prisma ORM** - Database interaction
- **PostgreSQL** - Database
- **JWT** - Authentication mechanism
- **Bcrypt** - Password hashing for secure authentication



