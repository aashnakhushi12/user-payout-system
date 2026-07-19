# API Documentation

## Introduction

This project provides REST APIs to manage users, sales, payouts and withdrawals.

All APIs are developed using Express.js and tested using Postman. The responses are returned in JSON format.

Base URL:

```text
http://localhost:5000/api
```

---

# User APIs

## 1. Create User

**Method**

```text
POST /users
```

**Description**

Creates a new user.

---

## 2. Get All Users

**Method**

```text
GET /users
```

**Description**

Returns the list of all users.

---

## 3. Get User by ID

**Method**

```text
GET /users/:id
```

**Description**

Returns the details of a specific user.

---

## 4. Update User

**Method**

```text
PUT /users/:id
```

**Description**

Updates user information.

---

## 5. Delete User

**Method**

```text
DELETE /users/:id
```

**Description**

Deletes a user from the database.

---

# Sale APIs

## 1. Create Sale

**Method**

```text
POST /sales
```

**Description**

Creates a new sale for a user.

---

## 2. Get All Sales

**Method**

```text
GET /sales
```

**Description**

Returns all sales.

---

## 3. Get Sale by ID

**Method**

```text
GET /sales/:id
```

**Description**

Returns the details of a specific sale.

---

## 4. Reconcile Sale

**Method**

```text
PUT /sales/reconcile/:saleId
```

**Description**

Approves or rejects a sale.

- If the sale is approved, the final payout is processed.
- If the sale is rejected, the advance payout amount is recovered through an adjustment payout.

---

# Payout APIs

## 1. Advance Payout

**Method**

```text
POST /payouts/advance/:saleId
```

**Description**

Processes the advance payout of 10% of the sale amount and updates the user's wallet.

---

## 2. Simulate Failed Payout

**Method**

```text
POST /payouts/simulate-failure
```

**Description**

Creates a failed payout transaction for testing the retry functionality.

---

## 3. Retry Failed Payout

**Method**

```text
PUT /payouts/retry/:payoutId
```

**Description**

Retries a failed payout and updates the payout status after successful processing.

---

# Withdrawal API

## Process Withdrawal

**Method**

```text
POST /withdrawals
```

**Description**

Processes a withdrawal request after validating wallet balance and the 24-hour withdrawal rule.

---

# Response Format

Successful API responses follow this format:

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {}
}
```

Error responses follow this format:

```json
{
  "success": false,
  "message": "Error message"
}
```

---

# Validation Rules

The APIs include the following validations:

- Duplicate Order ID is not allowed.
- User must exist before creating sales or processing payouts.
- Sale must exist before processing payouts or reconciliation.
- Advance payout can be processed only once for a sale.
- Final payout is processed only after sale approval.
- Final payout cannot be processed more than once for the same sale.
- Rejected sales recover the previously paid advance amount through adjustment payout.
- A sale can be reconciled only once.
- Wallet balance must be sufficient before withdrawal.
- Only one withdrawal is allowed within 24 hours.
- Failed payouts can be retried only if their status is FAILED.

---

# Testing

All APIs were tested using Postman.

The data created or updated through the APIs was verified using MongoDB Compass to ensure the business logic worked correctly.
