# Design Decisions

## Introduction

While developing this project, I made a few design decisions to keep the code simple, organized and easy to maintain.

These decisions helped me implement the required business rules for users, sales, payouts and withdrawals in a structured way.

---

## Layered Architecture

I separated the project into Routes, Controllers and Models.

- Routes handle incoming API requests.
- Controllers contain the business logic and validations.
- Models interact with the MongoDB database.

This separation keeps the code organized and makes it easier to understand, test and maintain.

---

## MongoDB with Mongoose

I used MongoDB as the database and Mongoose for schema creation and database operations.

Mongoose helped in:

- Defining database schemas.
- Maintaining data relationships using ObjectId references.
- Performing validations.
- Managing database operations efficiently.

---

## Separate Collections

Instead of storing all information in a single collection, I created separate collections for:

- Users
- Sales
- Payouts
- Withdrawals

This approach keeps the data organized, reduces duplication and makes each module easier to manage.

---

## Wallet-Based Payout System

Instead of directly processing withdrawals from sales, I implemented a wallet-based system.

The payout flow works as follows:

- Advance payout is added to the user's wallet.
- Final payout is added after successful sale approval and reconciliation.
- Adjustment payout is used to recover advance amounts when a sale is rejected.
- Withdrawals are processed from the available wallet balance.

This approach helps maintain transaction history and makes wallet management easier.

---

## Payout Transaction Tracking

I stored each payout action as a separate payout record instead of directly modifying transaction history.

The payout collection maintains different payout types:

- ADVANCE
- FINAL
- ADJUSTMENT

It also stores payout status to handle successful and failed transactions.

This makes it easier to track payouts and retry failed transactions.

---

## Business Rule Validation

Most business rules are implemented inside controllers before updating the database.

Examples include:

- Preventing duplicate Order IDs.
- Preventing duplicate advance payouts.
- Preventing duplicate final payouts.
- Processing final payout only after sale approval.
- Recovering advance payout through adjustment when a sale is rejected.
- Preventing multiple sale reconciliations.
- Checking wallet balance before withdrawal.
- Allowing only one withdrawal every 24 hours.
- Allowing retry only for failed payouts.

---

## Error Handling

Each controller uses try-catch blocks to handle unexpected errors.

Meaningful success and error messages are returned so that API responses remain easy to understand.

---

## Conclusion

These design decisions helped me keep the project modular, readable and maintainable.

The structure also makes it easier to add future features such as authentication, authorization and additional transaction handling.
