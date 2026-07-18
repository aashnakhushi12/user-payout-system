# User Payout Management System

## Project Overview

This project is developed using Node.js, Express.js and MongoDB as part of the User Payout Management System assignment.

The application manages users, sales, payouts and withdrawals based on the business rules provided in the assignment. All APIs have been tested using Postman, and MongoDB is used to store the data.

---

## Features

### User Management

- Create a new user
- View all users
- View user by ID
- Update user details
- Delete a user

### Sales Management

- Create a sale for a user
- View all sales
- View sale by ID
- Prevent duplicate Order IDs

### Payout Management

- Process 10% advance payout
- Process final payout after sale approval
- Prevent duplicate advance payout
- Prevent duplicate reconciliation
- Recover advance payout when a sale is rejected

### Withdrawal Management

- Request withdrawal from wallet
- Prevent withdrawal if balance is insufficient
- Allow only one withdrawal in 24 hours

### Failed Payout Recovery

- Simulate failed payout
- Retry failed payout
- Update wallet after successful recovery

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Postman
- Git & GitHub

---

## Project Structure

```
user-payout-system
│
├── config
├── controllers
├── models
├── routes
├── .env
├── app.js
├── package.json
├── server.js
└── README.md
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/aashnakhushi12/user-payout-system.git
```

### Open the project

```bash
cd user-payout-system
```

### Install dependencies

```bash
npm install
```

### Create a .env file

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/user-payout-system
```

### Start the server

```bash
npm run dev
```

---

## API Endpoints

### Users

| Method | Endpoint       |
| ------ | -------------- |
| POST   | /api/users     |
| GET    | /api/users     |
| GET    | /api/users/:id |
| PUT    | /api/users/:id |
| DELETE | /api/users/:id |

### Sales

| Method | Endpoint                     |
| ------ | ---------------------------- |
| POST   | /api/sales                   |
| GET    | /api/sales                   |
| GET    | /api/sales/:id               |
| PUT    | /api/sales/:saleId/reconcile |

### Payouts

| Method | Endpoint                      |
| ------ | ----------------------------- |
| POST   | /api/payouts/advance/:saleId  |
| POST   | /api/payouts/simulate-failure |
| PUT    | /api/payouts/retry/:payoutId  |

### Withdrawals

| Method | Endpoint         |
| ------ | ---------------- |
| POST   | /api/withdrawals |

---

## Business Rules

- Advance payout is 10% of the sale amount.
- Final payout is processed only after the sale is approved.
- If a sale is rejected, the advance payout is adjusted.
- A sale cannot be reconciled more than once.
- Duplicate Order IDs are not allowed.
- A user can withdraw only once every 24 hours.
- Withdrawal is not allowed if the wallet balance is insufficient.
- Failed payouts can be retried successfully.

---

## Validations Implemented

- User validation
- Sale validation
- Duplicate Order ID validation
- Duplicate advance payout validation
- Duplicate reconciliation validation
- Wallet balance validation
- Withdrawal cooldown validation
- Failed payout retry validation

---

## Testing

All APIs were tested using Postman. MongoDB Compass was used to verify the data stored in the database after every API request.

---

## Future Improvements

- JWT Authentication
- Role-based access
- Transaction support
- Pagination and filtering
- Unit testing
- API documentation using Swagger

---

## Author

**Khushi Ashna**

GitHub: https://github.com/aashnakhushi12/user-payout-system
