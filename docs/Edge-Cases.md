# Edge Cases

## Introduction

While developing this project, I handled different edge cases to make sure the application behaves correctly even when invalid requests are received. These validations help maintain data consistency and prevent incorrect payout processing.

---

## Duplicate Order ID

Each sale must have a unique Order ID.

If an Order ID already exists, the API returns an error instead of creating another sale.

---

## Duplicate Advance Payout

An advance payout can be processed only once for a sale.

If another request is made for the same sale, the API prevents creating a duplicate payout.

---

## Duplicate Final Payout

A final payout is created only once after a sale is approved.

If a final payout already exists for that sale, another payout is not created.

---

## Sale Reconciliation

A sale can be reconciled only once.

If a sale has already been approved or rejected, the API does not allow it to be reconciled again.

---

## Invalid User

If an invalid user ID is provided while creating a sale or processing a withdrawal, the API returns an appropriate error message.

---

## Invalid Sale

If a sale does not exist, payout and reconciliation requests are rejected.

---

## Insufficient Wallet Balance

A withdrawal request is allowed only if the user has enough balance in the wallet.

If the requested amount is greater than the available balance, the withdrawal is rejected.

---

## Withdrawal Time Restriction

A user can withdraw money only once within 24 hours.

If another withdrawal request is made before 24 hours, the API returns an error message.

---

## Failed Payout Retry

Only payouts with the status **FAILED** can be retried.

If the payout is already successful, the retry request is rejected.

---

## Invalid Request Data

The application validates the required input fields.

If mandatory information is missing, the API returns a validation error instead of processing the request.

---

## Summary

Handling these edge cases helps keep the application reliable and prevents invalid operations from affecting user wallets, sales records and payout history.
