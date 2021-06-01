---
title: Websockets (POST)
author: Mark Wylde
authorURL: https://markwylde.com
---

I have spent a few days benchmarking thd database, and using new https connections every time, yields around 300 inserts a second, without batching, for a one node cluster.

Without further testing and comparing to other databases, I'm not sure what to expect right now. But it did lead me to the latest release I've done tonight.

## Websockets (POST)
Current all internal communication between nodes is done over pure TCP, to reduce the overhead of http headers.

So the current flow of information goes:

Client -> HTTPS Handler -> TCP Connection -> Database Driver

With the new release, the new flow goes:

Client -> WS Handler -> TCP Connection -> Database Driver

This should further reduce the overhead of a new connection every time.

I feel HTTP/2 might further reduce overhead for http requests.

## Next up
- I want to continue stress testing, this time using the new web socket posting
- I want to add all methods to the websocket handle
