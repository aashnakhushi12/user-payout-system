# Design Decisions

## Introduction

While developing this project, I made a few design decisions to keep the code simple, organized and easy to maintain. These decisions also helped me implement the required business rules more effectively.

---

## Layered Architecture

I separated the project into Routes, Controllers and Models.

- Routes handle incoming API requests.
- Controllers contain the business logic.
- Models interact with the MongoDB database.

This separation makes the project easier to understand and maintain.

---

## MongoDB with Mongoose

I used MongoDB as the database and Mongoose for schema creation and database operations.

Mongoose made it easier to define schemas, perform validations and manage relationships between collections.

---

## Separate Collections

Instead of storing everything in a single collection, I created separate collections for:

- Users
- Sales
- Payouts
- Withdrawals

This keeps the data organized and avoids duplication.

---

## Wallet-Based Payout System

Instead of directly processing withdrawals from sales, I used a wallet system.

Every successful payout is first added to the user's wallet, and withdrawals are processed from the wallet balance.

This makes payout tracking much easier.

---

## Business Rule Validation

Most business rules are implemented inside the controllers before updating the database.

Examples include:

- Preventing duplicate Order IDs.
- Preventing duplicate advance payouts.
- Preventing duplicate final payouts.
- Preventing multiple sale reconciliations.
- Checking wallet balance before withdrawal.
- Allowing only one withdrawal every 24 hours.

---

## Error Handling

Each controller uses try-catch blocks to handle unexpected errors.

Meaningful success and error messages are returned so that API responses remain easy to understand.

---

## Conclusion

These design decisions helped me keep the project modular, readable and easier to extend with additional features in the future.
