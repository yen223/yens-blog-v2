---
title: "A gentle introduction to functors"
slug: "a-gentle-introduction-to-functors"
date: "2017-08-22"
published: true
tags:
  - functional programming
  - functors
description: "This article introduces the concept of functors, a fundamental concept in functional programming that allows for mapping over wrapped types."
---

We can think of a list of some type as a wrapper around that type. For example, a list of strings contains strings [citation needed].

```python
list_of_strings = ["Adam", "Bobby", "Caroline"]
```

If we have a `length` function that converts strings into integers:

```python
def length(some_string):
    return len(some_string)

length("Adam") == 4  # str -> int
length("Bobby") == 5  # str -> int
length("Caroline") == 8  # str -> int
```

Then we can trivially get from a *list* of strings to a *list* of integers, just by using the same `length` function and the `map` operation:

```python
>>> map(length, ["Adam", "Bobby", "Caroline"])
[4, 5, 8]
```

**The `map` function is a powerful pattern that allows us to operate on wrapped types, just by defining how to operate on their elements.** And anything that can be mapped over like that, are called **functors**.

The map function has the following signature:

```
(a -> b) -> f a -> f b
```

That is, it takes a function that transforms type `a` to type `b`, and gives us a function that transforms `f a` to `f b`, where `f a` is a functor that wraps the type `a`.


It's important to point out that `f` aren't limited to lists - sets and trees can be mapped over in a similar manner.

It doesn't even have to be collections either. Consider the `Option a` type, which represents a "container" that may contain some value of type `a`, or nothing. It is a common pattern to say, I have this thing that may be some value, or it might be null. If I have an actual value, then do `a -> b`; otherwise, just give me null. Either way, I want an Option of type `b`.

That operation kinda looks like

```
Option a -> (a -> b) -> Option b
```

Which after some rearranging, looks a lot like the definition of `map` above! Indeed, Option types can be thought of as functors as well.

In summary, a functor is a "wrapper" of one type, that can be transformed into a "wrapper" of a different type, just by applying a function on its elements. Simple as that.

