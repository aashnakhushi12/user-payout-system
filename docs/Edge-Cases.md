# Edge Cases

## Introduction

While developing this project, I handled different edge cases to ensure the application behaves correctly even when invalid requests or unexpected situations occur.

These validations help maintain data consistency and prevent incorrect sale, payout and wallet transactions.

---

## Duplicate Order ID

Each sale must have a unique Order ID.

If an Order ID already exists, the API returns an error instead of creating another sale.

---

## Duplicate Advance Payout

An advance payout can be processed only once for a sale.

If another request is made for the same sale, the API prevents creating a duplicate advance payout.

---

## Final Payout Before Sale Approval

Final payout can only be processed after the sale is approved and successfully reconciled.

If a final payout request is made before approval, the API rejects the request.

---

## Duplicate Final Payout

A final payout is created only once for a sale.

If a final payout already exists for that sale, another payout record is not created.

---

## Rejected Sale After Advance Payout

If a sale is rejected after an advance payout has already been processed, the advance amount must be recovered.

The system creates an adjustment payout to update the user's wallet balance.

---

## Sale Reconciliation

A sale can be reconciled only once.

If a sale has already been approved or rejected, the API does not allow it to be reconciled again.

---

## Invalid User

If an invalid user ID is provided while creating a sale, processing a payout, or making a withdrawal, the API returns an appropriate error message.

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

If the payout is already successful or does not exist, the retry request is rejected.

---

## Invalid Request Data

The application validates required input fields before processing requests.

If mandatory information is missing or invalid, the API returns a validation error instead of processing the request.

---

## Summary

Handling these edge cases helps keep the application reliable and prevents invalid operations from affecting user wallets, sales records and payout history.

These validations ensure that advance payouts, final payouts, adjustment payouts and withdrawals follow the defined business rules.
