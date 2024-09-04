# WorkIndia Assignment - SDE API Round - IRCTC

This project is a Train Booking API built with Node.js, Express, Prisma, and PostgreSQL. It allows users to book train seats, with proper seat capacity management, user authentication, and more.

## Features

- User authentication with JWT
- Seat booking system
- Transaction management for seat availability
- Prisma ORM for database management

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (version 14.x or later)
- PostgreSQL installed and running
- Prisma CLI installed globally (optional but recommended)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/workindia-assignment.git
```
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the environment variables

Create a `.env` file in the root of the project and add the following:

```bash
PORT=3000  # Or any other port number
JWT_SECRET=your_secret_key
DATABASE_URL=postgresql://username:password@localhost:5432/database_name?schema=public
```

Replace `username`, `password`, `localhost`, `5432`, and `database_name` with your actual PostgreSQL credentials.

### 4. Initialize the database with Prisma

Generate the Prisma client and apply the database migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Run the server

Start the server using the following command:

```bash
npm run dev
```

The API will now be running at `http://localhost:3000`.

### 6. Run in production

To run the server in production mode:

```bash
npm start
```

## API Endpoints

- **POST /api/v1/signup** - Create a new User. (http://localhost:3000/v1/signup)
- **POST /api/v1/login** - Login for User. (http://localhost:3000/v1/login)
- **POST /api/v1/trains** - Create a new train.(http://localhost:3000/v1/createTrain)
- **POST /api/v1/trains/book/:trainid** - Book seats for a train.(http://localhost:3000/v1/trains/book/{train_id})
- **GET /api/v1/trains/availability?source=A&destination=B** - Get the list of available trains.(http://localhost:3000/v1/trains/availability?source=A&destination=B)
- **GET /api/v1/bookings/:booking_id** - Get details of a specific train.(http://localhost:3000/v1/bookings/{booking_id})

## Running Tests

Currently, no tests are set up. You can configure your own tests in the `test` script in `package.json`.

## Technologies Used

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT for authentication
- Bcrypt for password hashing
