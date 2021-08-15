---
title: Notify and License
author: Mark Wylde
authorURL: https://markwylde.com
---

I've just finished implementing the notify logic. Logic has now been implemented to detect a temporary primary replica called `isDocumentPrimaryReplica`.

This can be used from an internal controller, when an action should be performed only once per internal method. For example:

1. When you have `PATCH`ed 1 document that has 3 replicas, it should only `NOTIFY` once.
2. When you need to return the effected documents (not replicas).

The current logic is:
```javascript
function isDocumentPrimaryReplica (context, document) {
  return document._replicatedNodes[0] === context.thisNode.name;
}
```

But ideally, this needs to *also* take into consideration if the actual primary replica is offline/unhealthy. I'll get to that later.

## License change
The main project is deliberately licensed as [AGPL-3](https://github.com/canhazdb/server/blob/master/LICENSE), but I realised the client library was also licensed as AGPL-3 too.

That was not my intention. If you want to use the canhazdb client library, you do not have to release your entire app as AGPL-3. For example, if you run a canhazdb server cluster, and then build a separate app that talks to the server (either using the client library or your own), the project does not have to be licensed as [AGPL-3](https://github.com/canhazdb/server/blob/master/LICENSE).

Therefore, I have changed the [canhazdb client](https://github.com/canhazdb/client) license to be [MIT](https://github.com/canhazdb/client/blob/master/LICENSE).

Note, the license of the [canhazdb server](https://github.com/canhazdb/client) is still [AGPL-3](https://github.com/canhazdb/server/blob/master/LICENSE). The intention being, if you make any changes to the server or embed it into another product, the project should be licensed as [AGPL-3](https://github.com/canhazdb/server/blob/master/LICENSE) and source code released.

## Next - Statistics
The last major feature for me to implement is the `system.collections` collection. I'll try to get that completed this week.

Once that's finished, I'm going to embed a very simple http server (without websocket notify support). Then finally, I can get the [ha branch](https://github.com/canhazdb/server/tree/ha) into master. Milestone reached!
