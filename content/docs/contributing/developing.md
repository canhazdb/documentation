---
id: install
title: Developing
sidebar_label: Developing
path: Docs / Contributing / Developing
lastModified: 2021-10-02
---

As a developer, you will probably want to install the database on your local machine, so you can edit the source code and run the tests immediately.

## Dependencies
Other than a working operating system, the only dependency you need to have installed is [NodeJS](https://nodejs.org/en/) ([14 or higher](https://github.com/nvm-sh/nvm)).

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

Alternatively you can link the cli globally:

```bash
npm link
```

This will allow you to run from anywhere on your computer:

```bash
canhazdb-server --help
```

## Need help?
I really care about the "developer experience" of the canhazdb project. If this page doesn't work perfectly first time, please [raise an issue](https://github.com/canhazdb/server/issues/new).