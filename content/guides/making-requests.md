---
id: making-requests
title: Making Requests
sidebar_label: Making Requests
lastModified: 2021-05-24
---

You can make requests using any http library in any language. For this example
we'll use JavaScript, as you can test it right in the browser of your local machine.

## 1) Run a local server
If you don't already have a canhazdb server to play with, you can use docker to
quickly bring up a single test instance.

<pre><code class="language-bash">docker run -itp 8060:8060 canhazdb/server --single</code></pre>

## 2) Open your browser
In Chromium, navigate to http://localhost:8060/ and open the devtools.

You should see some basic information about your server, such as the version and name.

## 3) List documents
In the DevTools console, enter the following code:

```javascript
fetch('/tests')
  .then(response => response.json())
  .then(console.log);
```

This will list all the documents in the `tests` collection. Of course, at this stage we
won't have any, so this should return an empty array.

## 4) Create a document
In the DevTools console, enter the following code:

```javascript
fetch('/tests', {
  method: 'post',
  body: JSON.stringify({
    name: 'Mark'
  }) 
})
  .then(response => response.json())
  .then(console.log);
```

This will create a new document in the `tests` collection. If it works successfully, if will return
the new document, with an `id` field.

## 5) List your document again
In the DevTools console, enter the following code:

```javascript
fetch('/tests')
  .then(response => response.json())
  .then(console.log);
```

This will list all the documents in the `tests` collection. As we have created one
in the previous step, the result should be an array containing one item.
