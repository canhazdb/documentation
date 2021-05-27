---
id: install
title: Quick
sidebar_label: Quick
path: Docs / Installing / Quick
lastModified: 2021-05-27
---

If you want to bring up an instance of canhazdb with the minimal configuration required, you can pass the `--single` argument to the command.

This will not run the server behind TLS, therefore the traffic will not be encrypted or authenticated.

This mode is best used in a learning or development environment, and not for production.

## Install
You can run the command below on any machine that has docker installed:

```bash
docker run -itp 8060:8060 canhazdb/server --single
```

Once running, you can start doing GET, POST, PUT, PATCH, DELETE http
requests at:

[http://localhost:8060/exampleCollection](http://localhost:8060/exampleCollection)
