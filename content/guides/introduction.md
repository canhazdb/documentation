---
id: introduction
title: Introduction
sidebar_label: Introduction
lastModified: 2021-02-10
---

I want canhazdb to have the following high level goals.

## Reliable
The first obvious goal, is it should work. The project needs to be able to store and retrieve data objects over a RESTful API. If we can’t do that, we have failed.

## Intuitive
While I want this project to be fully documented, you should not need **intense** documentation to know how things work. It should be intuitive.

For example, to create a new data object, you perform a standard HTTP post to `http://your_db_server/collectionName`.

## Manageable
You shouldn’t have to have multiple projects and systems to host a database. This project should provide a full and complete database system, all in one.

If you have to spend hours creating other nodes, discovering them, linking them together, health checking them, choosing replication factors, and other database admin jobs, then we have failed.

## Simple
The project doesn’t have to do everything. Schema’s, validation’s, relationships, stored procedures are not within the scope of this project.

A database should provide you with a production ready system that stores data reliably.

## Welcoming
Anyone, no matter your level of experience, can ask questions, raise issues, give opinions and be involved in the project.
