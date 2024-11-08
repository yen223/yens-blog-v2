---
title: "Useful built-in macOS command-line utilities"
slug: "useful-macos-cmd-line-utilities"
date: "2024-11-06"
published: true
tags:
  - macOS
description: "macOS comes with a lot of built-in utilities. Here's a list of some that I find interesting."
---

Sometimes when I'm bored, I like to look at the list of [macOS Bash commands](https://ss64.com/mac/). Here's some commands that I found interesting:


## Access your Keychain programmatically

If you store your secrets in the Keychain (and you should!), you can access them programmatically using `security`.

```bash
security find-internet-password -s "https://example.com"
```

I found this useful for writing automated scripts that used locally-stored credentials.

Link: [https://ss64.com/mac/security.html](https://ss64.com/mac/security.html)

Bonus tip: If you are using 1Password, there is a [1Password CLI](https://developer.1password.com/docs/cli/get-started/) that you can use to access your 1Password items from the command line.

## Open files from the terminal

If you want to open a file from the terminal, you can use the `open` command.

```bash
open file.txt
```

This will open the file in the default application for that file type, as if you had double-clicked it in the Finder.

Link: [https://ss64.com/mac/open.html](https://ss64.com/mac/open.html)

## Copy and paste

`pbcopy` and `pbpaste` are command-line utilities that allow you to copy and paste text to the pasteboard (what other operating systems might call the "clipboard").

`pbcopy` takes whatever was given in the standard input, and places it in the pasteboard.

```bash
echo "Hello, world!" | pbcopy;
```

`pbpaste` takes whatever is in the pasteboard and prints it to the standard output.

```bash
pbpaste
>> Hello, world!
```

This is very useful for getting data from files into the browser, or other GUI applications.

#### Links:
- [https://ss64.com/mac/pbcopy.html](https://ss64.com/mac/pbcopy.html)
- [https://ss64.com/mac/pbpaste.html](https://ss64.com/mac/pbpaste.html)


## UTC date

If you work with servers a lot, it can be useful to know the current time in UTC, when e.g. looking at
server logs.

This is a one-liner in the terminal:

```bash
date -u
```

Alternatively, you can use 

```bash
TZ=UTC date
```

Link: [https://ss64.com/mac/date.html](https://ss64.com/mac/date.html)

## Internet speedtest

If you want to run an Internet speedtest, you can run one directly from the terminal with

```bash
networkQuality  # Note the capital "Q"!
```

Link: [https://ss64.com/mac/networkquality.html](https://ss64.com/mac/networkquality.html)

## Prevent your Mac from sleeping

If you want to keep your Mac from sleeping, you can run `caffeinate` in the terminal.

```bash
caffeinate
```

`caffeinate` will keep your Mac awake until you stop it, e.g. by pressing Ctrl+C. `caffeinate` used to
be a third-party tool, but it is now built-in to macOS.

I use this mostly to prevent my Mac from sleeping when I am running a server.

Link: [https://ss64.com/mac/caffeinate.html](https://ss64.com/mac/caffeinate.html)

## Generate UUIDs

If you need to generate a UUID, you can use the `uuidgen` command.

```bash
uuidgen
```

By default `uuidgen` outputs a UUID in uppercase. You can combine this with `tr` and `pbcopy` to copy the UUID to the clipboard in lowercase.

```bash
uuidgen | tr '[:upper:]' '[:lower:]' | pbcopy
```

I use this a lot when writing unit tests that require IDs.

Link: [https://ss64.com/mac/uuidgen.html](https://ss64.com/mac/uuidgen.html)
## Honourable mentions

- `mdfind`: Spotlight search, but in the terminal. I generally use Spotlight itself (or rather the excellent [Raycast](https://www.raycast.com/)). [Link](https://ss64.com/mac/mdfind.html)
- `say`: This command makes your Mac speak the text you give it. [Link](https://ss64.com/mac/say.html)
- `screencapture`: This command allows you to take screenshots and save them to a file. I prefer using `cmd-shift-5` for this. [Link](https://ss64.com/mac/screencapture.html)
- `networksetup`: This command allows you to configure your network settings programmatically. I found its API very intimidating, and so I haven't really used it much. [Link](https://ss64.com/mac/networksetup.html)
