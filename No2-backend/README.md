# Running Backend

Run backend with docker by:

```[bash]
docker compose up
```

# API Endpoint

Use ```Tes-TTG-PostMan.postman_collection.json``` by import to Postman\

**User routes**:\
`POST /v1/users` - create a user\
`GET /v1/users` - get all users\
`GET /v1/users/:userId` - get user\
`DELETE /v1/users/:userId` - delete user

By default backend run at port ```8000```