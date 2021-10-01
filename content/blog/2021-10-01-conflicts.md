---
title: Conflicts
author: Mark Wylde
authorURL: https://markwylde.com
---

I've been slowly working through the last of the issues and feel like version 8 is very close to getting merged into master and released.

## Conflicts
Conflict's have been completed, and will now attempt to resolve when a node recovers. The cleanup logic took a lot longer than I thought, but due to my own over complication of the strategy.

While resolving conflicts was as easy as letting all other nodes know about the resolution, and syncing with other nodes on startup, the deletion was trickier. We can only delete a conflict, once all other nodes have successfully received the conflict resolutions.

I'm sure there are improvements that can be made to the efficiency of the conflict implementation, but I'm happy that for now conflicts seem to be working well.

## System Collections
The main system collections have been implemented:
  - `system.collections`
  - `system.notifys`
  - `system.locks`
  - `system.nodes`

The schema has changed a little from my initial idea, but the main information is still there.

It did identify one issue that I need to seed the system collections to the `system.collections`. I don't want to hard code this in, and would prefer each module is responsible for its own seeding.

But as there isn't the concept of "installing" the database, I might have to just check on every node start, if the collection has been added. It seems a little inefficient, but efficiency can be improved later.

## Http Endpoints
The http server for issue [#61](https://github.com/canhazdb/server/issues/61) has been implemented, but I've only managed to write the get collections and get documents endpoints. It went pretty smoothly, and I hope the other endpoints will not take too long.

## Required Certs
I've been trying to keep both `TLS` and `unencrypted tcp` to allow for easier development environments. But I'm becoming more uncomfortable with having this mix and match of tcp/http that can be secure or insecure. Plus, the NodeJS http2 library doesn't support none TLS communication.

Therefore, certs/TLS is now required for all instances running. You will not be able to connect to the http or TLS ports without full TLS validation.

The one exception will be the web UI client. That will use the same certs and be delivered over TLS, but it will not verify the client certificate. This means, you can access the web UI in your browser, but not the http api endpoints.

## Next
Currently, I'm working on finishing the http endpoints, then will put a simple version check to ensure all nodes are on the same major version.

That will complete the last of the issues for the v8 release.

But before I merge and release, I need to properly update the documentation. Most importantly, I want to document the "canhazdb protocol".
