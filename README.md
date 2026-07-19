# User Payout Management System

## About the Project

I developed this project using JavaScript, Node.js, Express.js and MongoDB as a backend application for managing users, sales, payouts and withdrawals.

The application follows the required business rules for advance payouts, final payouts, withdrawals and failed payout recovery. During development, I organized the project into separate routes, controllers and models to keep the code simple and maintainable.

I tested all the APIs using Postman and verified the stored data using MongoDB Compass to ensure that every feature worked correctly.

---

## Technologies Used

- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- MongoDB Compass
- Postman
- Git & GitHub

---

## Project Structure

```text
user-payout-system

│── config
│── controllers
│── docs
│── models
│── routes
│── .env
│── .gitignore
│── app.js
│── server.js
│── package.json
│── package-lock.json
│── README.md
```

---

## Features

### User Management

- Create a user
- View all users
- View user by ID
- Update user details
- Delete a user

### Sales Management

- Create a sale
- View all sales
- View sale details
- Approve or reject a sale

### Payout Management

- Process 10% advance payout
- Process final payout after sale approval
- Recover advance amount if a sale is rejected
- Retry failed payouts

### Withdrawal Management

- Withdraw money from wallet
- Prevent withdrawal if the wallet balance is insufficient
- Allow only one withdrawal within 24 hours

---

## Installation

Clone the repository

```bash
git clone https://github.com/aashnakhushi12/user-payout-system.git
```

Open the project folder

```bash
cd user-payout-system
```

Install all required packages

```bash
npm install
```

Create a `.env` file

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/user-payout-system
```

Run the application

```bash
npm run dev
```

The server will start on:

```text
http://localhost:5000
```

---

## API Endpoints

The following APIs were developed and tested using Postman.

### User APIs

| Method | Endpoint       |
| ------ | -------------- |
| POST   | /api/users     |
| GET    | /api/users     |
| GET    | /api/users/:id |
| PUT    | /api/users/:id |
| DELETE | /api/users/:id |

---

### Sale APIs

| Method | Endpoint                     |
| ------ | ---------------------------- |
| POST   | /api/sales                   |
| GET    | /api/sales                   |
| GET    | /api/sales/:id               |
| PUT    | /api/sales/reconcile/:saleId |

---

### Payout APIs

| Method | Endpoint                      |
| ------ | ----------------------------- |
| POST   | /api/payouts/advance/:saleId  |
| POST   | /api/payouts/simulate-failure |
| PUT    | /api/payouts/retry/:payoutId  |

---

### Withdrawal API

| Method | Endpoint         |
| ------ | ---------------- |
| POST   | /api/withdrawals |

---

## Business Rules Implemented

- Advance payout is 10% of the sale amount.
- Final payout is processed only after the sale is approved.
- If a sale is rejected, the advance amount is adjusted.
- Duplicate Order IDs are not allowed.
- A sale cannot be reconciled more than once.
- Users cannot withdraw more than their wallet balance.
- Withdrawal is allowed only once every 24 hours.
- Failed payouts can be retried successfully.

---

## Validations

The following validations are implemented in the project:

- Duplicate Order ID validation
- User existence validation
- Sale existence validation
- Duplicate advance payout validation
- Duplicate sale reconciliation validation
- Wallet balance validation
- 24-hour withdrawal validation
- Failed payout retry validation

---

## Testing

I tested all APIs using Postman.

After every API request, I checked the MongoDB database using MongoDB Compass to make sure that the data was stored and updated correctly.

---

## Documentation

Additional project documents are available in the **docs** folder.

- Low Level Design (LLD)
- Database Schema
- API Documentation
- Design Decisions
- Edge Cases

---

## Future Improvements

If I continue working on this project, I would like to add:

- JWT Authentication
- Role-based Authorization
- Pagination
- Search and Filtering
- Swagger API Documentation
- Unit Testing

---

## Author

**Khushi Ashna**

GitHub Repository:

https://github.com/aashnakhushi12/user-payout-system
