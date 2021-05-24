---
title: Stability
author: Mark Wylde
authorURL: http://twitter.com/markiswylde
---

I have updated the dependencies of canhazdb and worked on this docs website, to:
- improve the branding
- add a new [making-requests](/guides/making-requests) guide

I've been using canhazdb for [puzed](https://github.com/puzed/puzed-api) and a commercial SaaS ecommerce product.

While developing, the database has been pretty stable. There have been a few commits over the last six months, but mostly dependency updates and small improvements.

As the other products are still in development, there's not really any production workloads going through the database, so it's still not proven to work with high data loads.

## Stress testing
I really want to stress test the project, and think my next steps will be to bombard a local instance with as many requests as I can.

Hopefully the next blog article will be about those results.

## Standalone executables
A few weeks ago, I also tried to use [pkg](https://www.npmjs.com/package/pkg) to create a standalone executable.

The idea is, you could download straight from the github releases page, the latest version of canhazdb, and just run the database.

Unfortunatly, this didn't work out as easy as I'd planned, because of how the drivers are abstracted.

In the end, I think I might make a release for each official driver. For example:
- canhazdb-x86-linux-ejdb
- canhazdb-x86-darwin-ejdb
- canhazdb-x86-windows-ejdb
- canhazdb-x86-linux-sqlite
- canhazdb-x86-darwin-sqlite
- canhazdb-x86-windows-sqlite

I would also make docker containers to match the above releases.

Again, I'm not sure when this will happen, and it might require a bit of code refactoring.
