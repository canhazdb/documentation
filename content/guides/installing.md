---
id: install
title: Installing
sidebar_label: Installing
lastModified: 2021-02-08
---

There are a few different ways you can install canhazdb, depending on your individual use case.

# Developers
As a developer, you will probably want to install the database on your local machine, so you can edit source code and run the tests immediately.

## Dependencies
Other than a working operating system, the only dependency you need to have installed is [NodeJS](https://nodejs.org/en/) ([12 or higher](https://github.com/nvm-sh/nvm).

## Source Code
You can clone and install the code base by running the following commands in your terminal.

```bash
git clone https://github.com/canhazdb/server.git canhazdb-server
cd canhazdb-server
npm install
```

Once installed, you should run the tests, to make sure everything is working fine.

```bash
npm run test
```

To run the database normally, you can execute the CLI using the command below:

```bash
node lib/cli.js --help
```
