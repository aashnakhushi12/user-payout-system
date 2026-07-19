# Database Schema

## Introduction

This project uses MongoDB as the database and Mongoose as the Object Data Modeling (ODM) library.

The application stores data in four collections:

- Users
- Sales
- Payouts
- Withdrawals

Each collection is designed to store a specific type of information, and MongoDB ObjectId references are used to connect related data.

---

## Users Collection

The Users collection stores user information along with wallet details.

| Field               | Type     | Description                     |
| ------------------- | -------- | ------------------------------- |
| \_id                | ObjectId | Unique user ID                  |
| name                | String   | User name                       |
| email               | String   | User email address              |
| walletBalance       | Number   | Current wallet balance          |
| withdrawableBalance | Number   | Available amount for withdrawal |
| lastWithdrawalAt    | Date     | Stores the last withdrawal time |
| createdAt           | Date     | Record creation time            |
| updatedAt           | Date     | Record update time              |

---

## Sales Collection

The Sales collection stores all sale records created by users.

| Field             | Type     | Description                                   |
| ----------------- | -------- | --------------------------------------------- |
| \_id              | ObjectId | Unique sale ID                                |
| user              | ObjectId | Reference to the User                         |
| orderId           | String   | Unique order ID                               |
| amount            | Number   | Sale amount                                   |
| status            | String   | PENDING, APPROVED or REJECTED                 |
| advancePaid       | Boolean  | Indicates whether advance payout is processed |
| advanceAmount     | Number   | Advance payout amount                         |
| finalPayoutAmount | Number   | Final payout or adjustment amount             |
| reconciledAt      | Date     | Time when the sale is reconciled              |
| createdAt         | Date     | Record creation time                          |
| updatedAt         | Date     | Record update time                            |

---

## Payouts Collection

The Payouts collection stores all payout transactions created by the system.

| Field         | Type     | Description                           |
| ------------- | -------- | ------------------------------------- |
| \_id          | ObjectId | Unique payout ID                      |
| user          | ObjectId | Reference to the User                 |
| sale          | ObjectId | Reference to the Sale                 |
| type          | String   | ADVANCE, FINAL or ADJUSTMENT          |
| amount        | Number   | Payout amount                         |
| status        | String   | PENDING, SUCCESS or FAILED            |
| remarks       | String   | Description of the payout transaction |
| failureReason | String   | Reason if the payout fails            |
| retryCount    | Number   | Number of retry attempts              |
| createdAt     | Date     | Record creation time                  |
| updatedAt     | Date     | Record update time                    |

### Payout Types

- **ADVANCE**: Initial payout of 10% of the sale amount.
- **FINAL**: Remaining payout processed after sale approval and reconciliation.
- **ADJUSTMENT**: Recovery amount processed when a sale is rejected.

---

## Withdrawals Collection

The Withdrawals collection stores all withdrawal requests.

| Field         | Type     | Description                    |
| ------------- | -------- | ------------------------------ |
| \_id          | ObjectId | Unique withdrawal ID           |
| user          | ObjectId | Reference to the User          |
| amount        | Number   | Withdrawal amount              |
| status        | String   | PENDING, SUCCESS or FAILED     |
| requestedAt   | Date     | Withdrawal request time        |
| processedAt   | Date     | Withdrawal processing time     |
| failureReason | String   | Reason if the withdrawal fails |
| createdAt     | Date     | Record creation time           |
| updatedAt     | Date     | Record update time             |

---

## Collection Relationships

The collections are connected using MongoDB ObjectId references.

```text
User
 │
 ├──────────────┐
 │              │
 ▼              ▼
Sales      Withdrawals
 │
 ▼
Payouts
```

Relationship summary:

- One user can have multiple sales.
- One user can have multiple payouts.
- One user can have multiple withdrawals.
- Each payout is linked to one sale.
- Each sale belongs to one user.
- Payout records maintain transaction history for advance, final and adjustment payouts.

---

## Summary

The database is designed by separating users, sales, payouts and withdrawals into different collections.

This structure keeps the data organized, maintains relationships between different modules and helps track complete payout transactions including advance payouts, final payouts, adjustments and failed payout recovery.
