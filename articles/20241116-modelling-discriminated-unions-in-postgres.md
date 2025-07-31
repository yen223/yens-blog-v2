---
title: "Modelling discriminated unions in Postgres"
slug: "modelling-discriminated-unions-in-postgres"
date: "2024-11-16"
published: true
tags:
  - Postgres
  - SQL
description: "How to model discriminated unions in SQL"
---

A discriminated union is a data type that represents a value that can take on exactly one of several different shapes, or _variants_.

To take an example, here is a [discriminated union](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions) in TypeScript. Values of type `PaymentState` can take on one of three variants: `pending`, `completed`, or `failed`. Each variant has a different set of fields:

```typescript
type PaymentState =
  | { status: "pending" }
  | { status: "completed"; amount: number; authorizedBy: string }
  | { status: "failed"; error: string };

// ✅ This is a valid PaymentState
const ps1: PaymentState = {
  status: "completed",
  amount: 100,
  authorizedBy: "John",
};

// ✅ This is a valid PaymentState
const ps2: PaymentState = { status: "failed", error: "Insufficient funds" };

// ❌ This is not a valid PaymentState
// The "failed" variant does not have an "amount" field
const ps3: PaymentState = { status: "failed", amount: 120 };
```

Depending on the language, discriminated unions are also known as:

- Scala, Kotlin: _sealed classes_
- Swift, Rust: _enums_
- Haskell, Ocaml: _sum types_

Each have different subtleties, but the general core ideas are the same.

Postgres, like most SQL databases, unfortunately does not have built-in support for modelling discriminated unions. There are however several workarounds available to address this, all with varying degrees of goodness.

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

The discriminated union is then represented by a table of nullable foreign keys columns, one per variant:

```sql
CREATE TABLE payment (
    id UUID PRIMARY KEY,
    payment_pending_id UUID REFERENCES payment_pending,
    payment_completed_id UUID REFERENCES payment_completed,
    payment_failed_id UUID REFERENCES payment_failed
);
```

You can add a `CHECK` constraint to ensure that exactly one of the variant columns is non-null:

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

## Option 2: Combine all variants into a single table

In this approach, the discriminated union is represented by a single table. The columns of the table are the discriminant, along with the union of all the variants' fields.

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

You can optionally add a `CHECK` constraint to ensure that the correct columns are provided:

```sql
ALTER TABLE payment ADD CONSTRAINT valid_payment_state CHECK (
  CASE WHEN STATUS = 'pending' THEN amount IS NULL AND authorized_by IS NULL AND error IS NULL
       WHEN STATUS = 'completed' THEN amount IS NOT NULL AND authorized_by IS NOT NULL AND error IS NULL
       WHEN STATUS = 'failed' THEN amount IS NULL AND authorized_by IS NULL AND error IS NOT NULL
       ELSE FALSE END
);
```

### Advantages

- There is only one table, so queries are straightforward.

### Disadvantages

- This requires the columns across all variants have distinct names.
- The `CHECK` constraint is complex, and can be error-prone.

## Option 3: Use a JSONB column

If you are using TypeScript or a language that has automatic JSON serialization/deserialization, you can simply store the value as-is in a JSONB column.

```sql
CREATE TABLE payment (
    id UUID PRIMARY KEY,
    state JSONB NOT NULL
);
```

### Advantages

- This approach does not require any additional tables.
- Depending on the application layer's language, this approach can mean you don't need to write any additional code to handle serializing/deserializing the discriminated union.

### Disadvantages

- This is the least type-safe approach. Postgres has no way to enforce the schema of the incoming JSON value. You will need to rely on the application layer to ensure the correct fields are provided.
- JSONB queries are inherently more complex than traditional queries on table columns.
