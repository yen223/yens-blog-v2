---
title: "Pinning your dependencies in Javascript projects"
slug: "pinning-dependencies-javascript"
date: "2024-11-21"
published: true
tags:
  - Javascript
  - NodeJS
  - npm
description: "Get closer to reproducible builds in your Javascript projects"
---

When creating a new NodeJS project, it's a good idea to do these two things first:

### Pin the project's node version using nvm

```bash
# This will pin the project's node version to the current latest LTS version
nvm use --lts
node -v > .nvmrc
```
`nvm` ([docs](https://github.com/nvm-sh/nvm)) is the Node Version Manager. It allows you to install and switch between different versions of node.

The commands above adds a `.nvmrc` file to the project that indicates which version of node the project requires. 

The next time you come back to the project,`nvm use` will use this version of node.

### Add `save-exact` to the `.npmrc` file

```bash
cat "save-exact=true" >> .npmrc
```

This means that when I install a dependency using `npm install`, it will pin the exact major.minor.patch version of the dependency to the `package.json` file. 

It's the equivalent of always adding the `--save-exact` flag ([docs](https://docs.npmjs.com/cli/v8/commands/npm-install#save-exact)) to every `npm install` command.

### Why?

If you read complaints about people struggling to rebuild a NodeJS project that they haven't touched in a while, the most common reasons are:

1. They are using a different version of node from what they were using originally.
2. They didn't pin their dependencies, and now some of the newer dependencies are breaking their build. By default, `npm install` installs `^version` dependencies, which only pins the major version of the dependency. Unfortunately, a lot of dependencies do break on minor or patch versions.

These two steps prevent both of these issues.

### Caveat

This only applies to **application** projects, not **library** projects. 

If you are building a library that will be used by other projects, you absolutely should not pin your dependencies, because you want to allow flexibility for consumers of your library to use the versions they want.
