# scripture-api

```
# To get a full chapter
GET /verses/sa%201

# To get a verse
GET /verses/sa%201:1

# To get a range of verses
GET /verses/sa%201:1-2
```

## Docker

Build the image:

```bash
docker build -t scripture-api .
```

Run the container:

```bash
docker run -p 3000:3000 scripture-api

# With custom port:
docker run -e APP_PORT=8080 -p 8080:8080 scripture-api

# With env file:
docker run --env-file .env.production -p 3000:3000 scripture-api
```
