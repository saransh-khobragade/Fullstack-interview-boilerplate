# NestJS CRUD

## How to start
```
yarn install
yarn start
```

### GET user curl
```
curl --location 'http://localhost:8080/api/users'
```

### CREATE user curl
```
curl --location 'http://localhost:8080/api/users' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Saransh",
  "email": "abc@test.com",
  "password": "123456",
  "age":20
}'
```

### UPDATE user curl
```
curl --location --request PUT 'http://localhost:8080/api/users/0198f012-2e05-7370-a0b4-e7409ea75aa7' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Saransh",
  "email": "abc@test.com",
  "password": "123456",
  "age":20,
  "isActive":true
}'
```

### DELETE user curl
```
curl --location --request DELETE 'http://localhost:8080/api/users/0198f012-2e05-7370-a0b4-e7409ea75aa7'
```