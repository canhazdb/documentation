---
id: install
title: Cluster
sidebar_label: Cluster
path: Docs / Installing / Cluster
lastModified: 2021-05-27
---

This document will explain how to setup a secure canhazdb cluster.

## Generating certificates

To run a secure cluster, we first need to generate some public/private certificates.

For this example, I'll create a folder in my documents.

```bash
cd ~/Documents
mkdir canhazdb-example
```

Let's use the script to create our certificates.

Replace the IP address `192.168.1.6` with the correct IP address (the one your database will listen on).

Because of how containers work, using `localhost` with docker will not work.

```bash
openssl genrsa -out ca.privkey.pem 2048

openssl req \
  -x509 \
  -new \
  -nodes \
  -key \
  ca.privkey.pem \
  -days \
  1024 -out ca.cert.pem -subj "/C=US/ST=Utah/L=Provo/O=ACME Signing Authority Inc/CN=example.com"

openssl genrsa -out 192.168.1.6.privkey.pem 2048

openssl req -new \
 -key 192.168.1.6.privkey.pem \
 -out 192.168.1.6.csr.pem \
 -subj "/C=US/ST=Utah/L=Provo/O=ACME Tech Inc/CN=192.168.1.6"

openssl x509 \
 -req -in 192.168.1.6.csr.pem \
 -extfile <(printf "subjectAltName=IP:192.168.1.6") \
 -CA ca.cert.pem \
 -CAkey ca.privkey.pem \
 -CAcreateserial \
 -out 192.168.1.6.cert.pem \
 -days 500
```

This command should create the following files in the current working directory.

```
192.168.1.6.cert.pem  192.168.1.6.csr.pem  192.168.1.6.privkey.pem  ca.cert.pem  ca.cert.srl  ca.privkey.pem
```

## Starting the first node

The following command will start your first canhazdb node in your new cluster.

```bash
docker run -v `pwd`:/app/certs -p 7061:7061 -p 8061:8061 canhazdb/server \
  --driver canhazdb-driver-ejdb \
  --host 192.168.1.6 \
  --port 7061 \
  --query-port 8061 \
  --join 192.168.1.6:7061 \
  --data-dir ./canhazdb/one \
  --tls-ca ./certs/ca.cert.pem \
  --tls-cert ./certs/192.168.1.6.cert.pem \
  --tls-key ./certs/192.168.1.6.privkey.pem
```

Once running, you can start doing GET, POST, PUT, PATCH, DELETE http
requests at:

[http://192.168.1.6:8060/exampleCollection](http://192.168.1.6:8060/exampleCollection)

## Adding an additional node

The following command will add an additional node node to your new cluster.

```bash
docker run -v `pwd`:/app/certs -p 7062:7062 -p 8062:8062 canhazdb/server \
  --driver canhazdb-driver-ejdb \
  --host 192.168.1.6 \
  --port 7062 \
  --query-port 8062 \
  --join 192.168.1.6:7061 \
  --join 192.168.1.6:7062 \
  --data-dir ./canhazdb/two \
  --tls-ca ./certs/ca.cert.pem \
  --tls-cert ./certs/192.168.1.6.cert.pem \
  --tls-key ./certs/192.168.1.6.privkey.pem
```
