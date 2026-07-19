# Low Level Design (LLD)

## Introduction

This project is developed using JavaScript with Node.js, Express.js and MongoDB.

The main purpose of this project is to manage users, sales, payouts and withdrawals by following the required business rules.

While developing this project, I divided the code into different modules so that each module has a specific responsibility. This approach keeps the project organized, easier to understand and easier to maintain.

---

## Project Architecture

The application follows a layered architecture where each layer has a separate responsibility. Routes receive the API requests, controllers contain the business logic, models interact with MongoDB and finally the response is sent back to the client.

```text
Client (Postman)
        │
        ▼
   Express Routes
        │
        ▼
    Controllers
        │
        ▼
  Mongoose Models
        │
        ▼
      MongoDB
```

The client sends a request to the API. The request first reaches the route, then the controller performs all validations and business logic. After that, the controller interacts with the database through Mongoose models and returns the response.

This layered structure keeps the business logic separate from the database operations, making the project easier to maintain and debug.

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

### Config

The `config` folder contains the MongoDB database connection.

### Controllers

The `controllers` folder contains the business logic for Users, Sales, Payouts and Withdrawals.

### Models

The `models` folder contains all Mongoose schemas used in the project.

### Routes

The `routes` folder defines all API endpoints and connects them to their respective controllers.

### Docs

The `docs` folder contains the project documentation.

---

## Modules

### User Module

The User module is responsible for managing user information.

Functions implemented:

- Create User
- View All Users
- View User by ID
- Update User
- Delete User

### Sale Module

The Sale module manages all sale-related operations.

Functions implemented:

- Create Sale
- View All Sales
- View Sale by ID
- Approve Sale
- Reject Sale
- Reconcile Sale

### Payout Module

The Payout module manages payout transactions including advance payouts, final payouts, adjustment payouts and failed payout recovery.

Functions implemented:

- Process Advance Payout
- Process Final Payout
- Process Adjustment Payout
- Simulate Failed Payout
- Retry Failed Payout

### Withdrawal Module

The Withdrawal module manages wallet withdrawals.

Before processing a withdrawal, the following validations are performed:

- User exists
- Wallet balance is sufficient
- Withdrawal is allowed only once within 24 hours

---

## Request Flow

### Create Sale

```text
Client

↓

Sale Route

↓

Sale Controller

↓

Validate Request

↓

Create Sale

↓

MongoDB
```

### Sale Reconciliation

```text
Client

↓

Sale Route

↓

Sale Controller

↓

Validate Sale

↓

Process Final/Adjustment Payout

↓

Update User Wallet

↓

MongoDB
```

### Advance Payout

```text
Client

↓

Payout Route

↓

Payout Controller

↓

Calculate 10% Advance

↓

Create Payout

↓

Update User Wallet

↓

MongoDB
```

### Final Payout

```text
Client

↓

Payout Route

↓

Payout Controller

↓

Validate Sale Approval

↓

Calculate Final Payout Amount

↓

Create Final Payout

↓

Update User Wallet

↓

MongoDB
```

### Withdrawal

```text
Client

↓

Withdrawal Route

↓

Withdrawal Controller

↓

Validate Wallet Balance

↓

Create Withdrawal

↓

Update User Wallet

↓

MongoDB
```

---

## Business Logic

During development, I implemented the following business rules:

- Advance payout is 10% of the sale amount.
- Final payout is processed only after the sale is approved.
- If a sale is rejected, the advance amount is recovered through an adjustment payout.
- Duplicate Order IDs are not allowed.
- A sale can be reconciled only once.
- Duplicate advance and final payouts are not allowed.
- Users cannot withdraw more than their available wallet balance.
- Withdrawal is allowed only once every 24 hours.
- Failed payouts can be retried successfully.

---

## Database Collections

The application stores data in four MongoDB collections:

- Users
- Sales
- Payouts
- Withdrawals

The Payout collection stores different payout types:

- Advance payout
- Final payout
- Adjustment payout

Payout status is maintained to track successful and failed transactions.

These collections are connected using MongoDB ObjectId references to maintain relationships between users, sales and payouts.

---

## Validations

The following validations are implemented:

- Duplicate Order ID validation
- User existence validation
- Sale existence validation
- Duplicate advance payout validation
- Duplicate final payout validation
- Duplicate sale reconciliation validation
- Wallet balance validation
- 24-hour withdrawal validation
- Failed payout retry validation

---

## Conclusion

While developing this project, I focused on keeping the code simple, organized and easy to maintain. Separating the project into routes, controllers and models helped me implement the required business logic in a clean way.

This structure also makes it easier to understand the project and add new features in the future.
