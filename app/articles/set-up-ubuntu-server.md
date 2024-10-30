---
title: "Set up SSH access for an Ubuntu server"
slug: "set-up-ubuntu-server"
date: "2015-05-24"
published: true
tags:
  - guide
  - ssh
  - ubuntu
  - server
description: "This guide explains how to set up ssh access for an Ubuntu server."
---

You've signed up for a VPS, and now you have received `root` access into the server. Before you do anything else, it's always a good idea to properly set up ssh access, because it's more secure **and** more convenient.

*Note: This guide assumes you are running OSX or Linux locally. The instructions for Windows will be different.*

Here's how:

## Step 1

If you haven't already, generate a public-private keypair on your local client.

```bash
ssh-keygen -t rsa
```

Feel free to leave all the options blank. You should get an output that looks like this:

```bash
Your identification has been saved in /home/vagrant/.ssh/id_rsa.
Your public key has been saved in /home/vagrant/.ssh/id_rsa.pub.
The key fingerprint is:
15:0b:f4:36:08:de:df:cb:7d:72:04:0e:7c:3d:97:51 vagrant@vagrant-ubuntu-trusty-64
The key's randomart image is:
+--[ RSA 2048]----+
|      ..o .    .E|
|     . o + +   .o|
|      . o * o ooo|
|         + o + .o|
|        S . . . .|
|           . o . |
|            o o o|
|               + |
|                 |
+-----------------+
```

Take note of the path to the public key, which in my case is `/home/vagrant/.ssh/id_rsa.pub`.

## Step 2

Log into the VPS using `ssh`, replacing *"123.456.789.12"* with your VPS IP address:

```bash
ssh root@123.456.789.12
```

## Step 3

Once you're in, create a new user account on the target server.

```bash
sudo adduser <username>
```

Follow the onscreen instructions to set up the account.

## Step 4

Grant that user sudo access by adding it to the `sudo` group:

```bash
sudo adduser <username> sudo
```

## Step 5

While you're here, it's always a good idea to disable root ssh access.

```bash
cp /etc/sshd_config /etc/backup_sshd_config
sudo nano /etc/sshd_config
```

Look for the line that begins with `PermitRootLogin`, and make sure it says

```bash
PermitRootLogin without-password
```

Restart the sshd service:

```bash
service ssh restart
```

## Step 6

Return to your local terminal by typing `exit`. Now you need to copy your public key into the server, like so:

```bash
ssh-copy-id <username>@123.456.78.10
```

Enter that user's password when requested.

Congratulations, you're done! Check that you can access your server via SSH by entering

```bash
ssh <username>@123.456.78.10
```