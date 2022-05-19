<h1 align="center">
  <a href="https://github.com/cachecleanerjeet/CloudflareDB"><img src="https://telegra.ph/file/9883b51597e9c4f825269.png" alt="whatsbot" width="240"></a>
  <br>
</h1>
<h3 align="center">The low latency database powered by Cloudflare Worker and KV</h3>
<br><br>

### *Features :*

- Globally Available
- Lowest Latancy
- Serverless
- Rest API
- Token Based Authenticated Request Support

### *API :*

#### 1. Save a Payload (JSON)

- Request:

```
Method: POST
Content-Type: application/json
URL (Secured with Token): https://<your-app>.workers.dev/?key=<key>
URL (Not Secured): https://<your-app>.workers.dev/
BODY: Json Data (Not Parsed)
```

- Response:

```
{
    "status": true,
    "_id": "16125252787azq",
    "query": "https://<your-app>.workers.dev/16125252787azq",
    "data": {
        "i_am": "writing a readme"
    }
}
```

- Set an ID manually:

```
Send this 👇

"_id":"my-unique-id"

with Body
```

- Bash example

```
curl -X POST 'https://example.example.workers.dev/?key=examplekey' \
    -d '{"_id":"example","value": "example"}' \
    -H "Content-Type: application/json"
```

#### 2. Get a saved Data

- Request:

```
Method: GET
URL: https://<your-app>.workers.dev/<_id>?key=<key>
```

- Response:

```
{
    "status": true,
    "_id": "16125252787azq",
    "data": {
        "i_am": "writing a readme"
    }
}
```

- Bash example

```
curl 'https://example.example.workers.dev/example?key=examplekey' 
```

#### 3. Delete a Data

- Request:

```
Method: DELETE
URL (Secured with Token): https://<your-app>.workers.dev/<_id>?key=<key>
URL (Not Secured): https://<your-app>.workers.dev/<_id>
```

- Response:

```
{
    "status": true,
    "msg": "Deleted Successfully"
}
```

- Bash example

```
curl -X DELETE 'https://example.example.workers.dev/example?key=examplekey' 
```

### *Deploy :*

- Open [Cloudflare Worker](https://workers.cloudflare.com "Cloudflare Worker") Page
- Click on KV
- In <code>Namespace Name</code> section Type a Name & Click on <code>Add</code>, a namespace will created.
- Now click on Workers & Create a worker
- Copy the code of <code>[worker.js](https://github.com/cachecleanerjeet/CloudflareDB/blob/main/worker.js "worker.js")</code> , paste into Worker & Click on Save & Deploy
- Now go back to worker main page, here you will see that your created worker listed there, click on that.
- Click on <code>Settings</code>
- In <code>KV Namespace Bindings</code> section click on <code>Add Binding</code>
- Write <code>JSONBASE</code> in Variable name & select your recently created Namespace for KV namespace.
- You just made your Cloudflare DB, Now Read the API Endpoint and use it in your Project 😪

### *Secure with Token :*

*You can impliment token based authentication system for requests*

- Write your key in <code>KEY</code> & <code>GETKEY</code> to secure requests with a Token (Line No: 2, 5)

### *Note for Kangers :*

Kanging will not make you a developer. So, don't be a kanger ⚠

### *License & Copyright :*

- This Project is [Apache-2.0](https://github.com/cachecleanerjeet/CloudflareDB/blob/main/LICENSE) Licensed
- Copyright 2021 by [Tuhin Kanti Pal](https://github.com/cachecleanerjeet)

### *Connect :*

- [Channel](https://telegram.dog/tprojects)
- [Support Group](https://telegram.dog/t_projects)

### Thanks to Cloudflare to give these services for free 🥰
