---
title: Reducing Noise
author: Mark Wylde
authorURL: https://markwylde.com
---

I've been wanted to get high availability into canhazdb for quite a while now, but I had been unsure of exactly how I was going to implement it.

There's still some unknowns, but in general I feel I've got a good idea of where I want it to go.

This week I started a new branch, which is essentially a complete rewrite of the server.

Some major changes are in that branch:

### No http(s)/ws(s) servers
When I wrote the first version, I kept juggling between the http(s) server, and the tcp servers. I decided for the rewrite, they really shouldn't have anything to do with each other.

I still want canhazdb to come with the option of a lightweight http server, but I'll put it in at the end, and it'll be abstracted out a lot more.

### Protocol rewrite
The current stable version talks exclusively over JSON. So every time a node is asked to do something, it must receive the command in JSON and send a respones in JSON.

I still believe the biggest risk to the theory of canhazdb is network noise. Specially the noise of nodes that have no data to send back.

For example, when filtering on records (GET:/exampleCollection), a request is sent out to all nodes. In the current version is looks like this:

```json
[10, {
  "COMMAND": "GET",
  "COLLECTION_ID": "exampleCollection",
  "LIMIT": 10
}]
```

| n.b. the keys are shorted into numbers, but you get the idea.

In the latest version of [tcpocket](https://github.com/markwylde/tcpocket), I've reduced the protocol to be a pure buffer. At least, for the first 3 bytes.

The above turns into:

```text
<Buffer>[0x01, 0x00, 0x09, ...optionalBufferSegments]
```

The first two bytes make up an `Int16Array`, which resolves to the correlation id (a number between 3 and 65535), to allow for request and responses. The third byte is a command (an `Int8Array`) which is a number between 2 and 255.

Look back at the `GET` example above, this will make the request a little smaller.

But I feel the main benefit comes from the response, especially for nodes with no information to return.

Currently if a node does not have any results to send, it returns:

```json
[10, {
  "STATUS": "200",
  "DOCUMENTS": []
}]
```

With the new protocol, a node with no results to give can send:

```text
<Buffer>[0x01, 0x00, 0x06]
```

This would mean for a filter that has to go out to a cluster of (for example) 10 nodes, if only 1 node has the document we are looking for, we have only wasted 9 bytes of ingres traffic.

There is much more to do on this, but I'm pretty happy so far. I have even noticed an improvement in the test speeds.

### High Availability
With the rewrite, I've currently implemented the `info`, `get`, and `post` commands.

#### POST's
Performing a `POST` is one of the easiest commands on a database. The logic is basically, select $REPLICATION_FACTOR nodes at random (default 3), and insert the document.

Along with the document, each node is also told about all other nodes holding that replica.

#### GET's
When performing a `GET`, the request still gets forwarded to every node in the cluster. However, now, a node will only return a document, if they are the first healthy node in the documents replica list.

So far this is all working really well, and I'm happy with the performance (for now).

My next steps will be to implement locking again (as this is needed for PUT/PATCH/DELETE's), and then implement the rest of the commands.

### EJDB vs SQLite
One thing that's been bothering me about EJDB is the restriction on indexing.

Every field is indexed in canhazdb, and EJDB supports really good and fast indexing. However, you can only use them under certain conditions.

For this reason I'm considering testing SQLite again, but using a different strategy from last time. I'm concerned though that the overhead of a relational database engine will give a considerable performance loss. But I think it's worth a test.

Failing that, I might raise an issue with the EJDB author to find out any better solution for filtering on multiple indexes.
