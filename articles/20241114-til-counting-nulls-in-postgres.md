---
title: "Interesting things I've learned: Counting nulls and non-nulls in Postgres"
slug: "til-counting-nulls-in-postgres"
date: "2024-11-14"
published: true
tags:
  - TIL
  - Postgres
description: "The num_nonnulls and num_nulls functions in Postgres"
---

`num_nonnulls(...)` counts the number of provided arguments that are not null. 

```sql
SELECT num_nonnulls('a', 'b', null); 
-- Returns 2
```

`num_nulls(...)` counts the number of provided arguments that are null.

```sql
SELECT num_nulls('a', 'b', null); 
-- Returns 1
```

This is useful in a check constraint, if you need to ensure that exactly some number of columns are provided

```sql
CREATE TABLE purchase_order (
    id UUID PRIMARY KEY,
    contact_email TEXT NULL,
    contact_phone TEXT NULL
);

-- If we want to ensure that at least one of email or phone is provided 
-- when making a purchase order, we can add a check constraint using 
-- `num_nonnulls`
ALTER TABLE purchase_order ADD CONSTRAINT contact_info_check CHECK (
    num_nonnulls(contact_email, contact_phone) >= 1
);
```

`num_nonnulls` and `num_nulls` are available in Postgres 9.6+ ([docs](https://www.postgresql.org/docs/9.6/functions-comparison.html#:~:text=Table%209%2D3.%20Comparison%20Functions))
