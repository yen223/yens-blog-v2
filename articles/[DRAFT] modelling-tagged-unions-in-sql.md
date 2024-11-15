---
title: "Modelling tagged unions in Postgres"
slug: "modelling-tagged-unions-in-postgres"
date: "2024-11-13"
published: false
tags:
  - TIL
  - Postgres
  - SQL
description: "How to model tagged unions in SQL"
---

A discriminated union is a data type that represents a value that can take on exactly one of several different shapes. An example from TypeScript is 

```typescript
type PaymentState = 
| { status: "pending" } 
| { status: "completed", amount: number, authorizedBy: string }
| { status: "failed", error: string }

const ps1: PaymentState = { status: "completed", amount: 100, authorizedBy: "John Doe" } // ✅ This is valid
const ps2: PaymentState = { status: "failed", error: "Insufficient funds" }              // ✅ This is also valid
const ps3: PaymentState = { status: "failed", amount: 120 }                              // ❌ This is not valid
```

Depending on the language, discriminated unions are also known as 

- Scala, Kotlin: *sealed classes*
- Swift, Rust: *enums*
- Haskell: *sum types*.

Each have different subtleties, but the core concept is the same.

SQL unfortunately does not have built-in support for discriminated unions. There are however several workarounds available to address this, all with varying degrees of goodness.

## Option 1: Model a table of foreign-keys

In this approach, each variant of the discriminated union is represented by a separate table:

```sql
CREATE TABLE payment_pending (
    id UUID PRIMARY KEY
);

CREATE TABLE payment_completed (
    id UUID PRIMARY KEY,
    amount NUMERIC NOT NULL,
    authorized_by TEXT NOT NULL
);

CREATE TABLE payment_failed (
    id UUID PRIMARY KEY,
    error TEXT NOT NULL
);
```

The discriminated union is then represented by a table of nullable foreign keys:

```sql
CREATE TABLE payment (
    id UUID PRIMARY KEY,
    payment_pending_id UUID REFERENCES payment_pending,
    payment_completed_id UUID REFERENCES payment_completed,
    payment_failed_id UUID REFERENCES payment_failed
);
```

You can add a `CHECK` constraint to ensure that exactly one of the foreign keys is non-null:

```sql
ALTER TABLE payment ADD CONSTRAINT valid_payment_state CHECK (
  num_nonnulls(payment_pending_id, payment_completed_id, payment_failed_id) = 1
);
```

### Advantages

- This is the most type-safe approach. Column types can be enforced per-variant.

### Disadvantages

- Adding a table per variant can get cumbersome, especially if there are many variants.
- Read queries become more complex, as they will always need to join one of n number of variant tables.

## Option 2: Flatten all variant fields into a single table

In this approach, a single table is used to represent the discriminated union, with a column for each variant field:

```sql
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed');

CREATE TABLE payment (
    id UUID PRIMARY KEY,
    status payment_status NOT NULL,
    amount NUMERIC NULL,
    authorized_by TEXT NULL,
    error TEXT NULL
);
```

## Option 3: Use a JSON column