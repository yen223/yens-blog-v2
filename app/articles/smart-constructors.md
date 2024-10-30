---
title: "Smart constructors"
slug: "smart-constructors"
date: "2017-08-23"
published: true
tags:
  - python
  - design pattern
description: "This article explains smart constructors, a design pattern that ensures data validity by validating values during object construction rather than through repeated checks."
---

Static types are a powerful concept in programming. They provide a layer of safety whenever the programmer calls into outside functions or objects.

Consider the following code snippet

```python
class User:
    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email

jack = User(name="jack", email="jack@example.com")
jimbo = User(name="jimbo", email=123)
```

Python has a loose type system - this code will happily run despite the obvious error with `jimbo`'s email. However, we can still get some mileage from using Python 3's [type annotation](https://docs.python.org/3/library/typing.html). In this case it's easy to tell that there's an issue with `jimbo`'s email. Good IDEs like PyCharm will probably add a couple red lines to alert you to the issue.

This isn't quite complete though. Not every valid `str` is also a valid email address. At the very least, an email address should contain an `'@'` character.

In practice, most programmers will get around this by using Python properties and getters + setters:

```python
class User:
    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email

    @property
    def email(self):
        return self._email

    @email.setter
    def email(self, value):
        if '@' not in value:
            raise ValueError("Bad email!")
        self._email = value
```

Much better! The following code will rightfully raise an exception:

```python
In [1]: User(name="Jimbo", email="test")
---------------------------------------------------------------------------
Exception                                 Traceback (most recent call last)
<ipython-input-5-525947c92af3> in <module>()
----> 1 User(name="Jimbo", email="test")

<ipython-input-4-271bcdf13daf> in __init__(self, name, email)
      2     def __init__(self, name, email):
      3         self.name = name
----> 4         self.email = email
      5     @property
      6     def email(self):

<ipython-input-4-271bcdf13daf> in email(self, value)
      9     def email(self, value):
     10         if '@' not in value:
---> 11             raise ValueError("Bad email!")
     12         self._email = value
     13

Exception: Bad email!

```

Unfortunately, we're not out of the woods yet. We might want to write a function that uses an email address - say to send emails. That function will also have to validate that the email address is correct.

```python
def send_email(address: str):
    if '@' not in address:  # Urgh duplicate code!
        raise Exception("Bad email again!")
    ...
```

Any time we want to use or set an email address, we're going to have to remember to validate the email address. There's also a subtle issue that it's not immediately obvious what the type of `address` should be - we already know `str` isn't specific enough.

That's where the idea of **smart constructors** come in.

```python
class EmailAddress(str):
    def __new__(cls, address: str):
        if '@' not in address:
            raise ValueError("Bad email!")
        return super().__new__(cls, address)
```

This defines an `EmailAddress` class whose constructor will fail if the provided value fails validation.

The idea behind smart constructors is to enforce the notion that **illegal states are unrepresentable** (to quote Yaron Minsky). There's no need to check for bad email addresses, if you can't construct a bad email address!

```python
In [25]: valid = EmailAddress("test@example.org")

In [26]: invalid = EmailAddress("bad")
---------------------------------------------------------------------------
ValueError                                Traceback (most recent call last)
<ipython-input-26-ba21088ca252> in <module>()
----> 1 invalid = EmailAddress("bad")

<ipython-input-22-2c9b4a6c24a1> in __new__(cls, address)
      2     def __new__(cls, address):
      3         if '@' not in address:
----> 4             raise ValueError("Bad email!")
      5         return super().__new__(cls, address)
      6

ValueError: Bad email!

```

Since `EmailAddress` is immutable, being a subclass of the immutable `str` type, you know that if you have an instance of `EmailAddress`, its value is very likely to be compliant (barring some Python type magic). Being a subclass of `str` also means that any instance of `EmailAddress` will behave like a string:

```python
In [23]: valid = EmailAddress("test@example.org")

In [24]: valid.startswith("t")
Out[24]: True
```

By representing email addresses with its own class, we can thus remove the validation checks from the previous examples:

```python
class User:
    def __init__(self, name: str, email: EmailAddress):
        # Only required if you aren't using mypy
        assert isinstance(email, EmailAddress)
        self.name = name
        self.email = email

def send_email(address: EmailAddress):
    # Only required if you aren't using mypy
    assert isinstance(address, EmailAddress)
    ...
```

The important thing to note is that for smart constructors to be robust, they need to be **immutable**, otherwise you have less of a guarantee that the validations hold true. Thus they work best when subclassing an immutable value type, like `str`, `tuple` or `NamedTuple` (from Python 3.6+)

In summary, smart constructors are an incredibly valuable pattern to use, and is useful in just about any language, even those with an already strong type system (smart constructors are [a Haskell term](https://wiki.haskell.org/Smart_constructors), after all).