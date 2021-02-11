---
id: drivers
title: Drivers
path: Docs / Architecture / Drivers
lastModified: 2021-02-11
---

## What are drivers?
Canhazdb can not actually store data itself. It simply provides
the sharding and clustering mechanism.

Every time a node needs to perform some actions with data, it
is deferred to the driver.

Just as canhazdb does not worry about the storing or data, the drivers
do not need to worry about clustering or sharding data. It is only
concerned with it's own data.

## Official drivers
Currently, three official drivers are provided.

|   | name | description |
| - | ---- | ----------- |
| 1 | [ejdb](https://github.com/canhazdb/driver-ejdb)     | A fast document store |
| 2 | [sqlite](https://github.com/canhazdb/driver-sqlite) | A fast embedded relational database |
| 3 | [nedb](https://github.com/canhazdb/driver-nedb)     | An in memory document store persisted to disk |

If you do not specify a driver to use, the default (ejdb) will be used.

## Custom drivers
It should be fairly straight forward to create your own driver.

Start by cloning the [nedb](https://github.com/canhazdb/driver-nedb) driver, then tweaking the
main index file to suite the needs of your database.

You can verify it will work as expected by running the tests.

```bash
git clone https://github.com/canhazdb/driver-ejdb.git driver-mycustomdriver
cd driver-mycustomdriver
npm install
npm run test
```
