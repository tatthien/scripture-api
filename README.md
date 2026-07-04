# scripture-api

A Vietnamese Bible API backed by SQLite. Look up verses by book/chapter reference, or search the full text with SQLite FTS5.

This monorepo includes:

- `@heythien/scripture-api` — HTTP API for verse lookup and full-text search
- `@heythien/bible-book-map` — Vietnamese/English book names and abbreviations

## Endpoints

### Verse lookup

Look up verses by book abbreviation, chapter, and optional verse or verse range. Use `%20` for spaces in the URL.

```
GET /verses/sa%201        # full chapter
GET /verses/sa%201:1      # single verse
GET /verses/sa%201:1-2    # verse range
```

Example response:

```json
{
  "reference": "Sáng-thế Ký 1:1",
  "verses": [
    {
      "id": 1,
      "book_id": 1,
      "chapter": 1,
      "verse": 1,
      "text": "Ban đầu Đức Chúa Trời dựng nên trời và đất.",
      "reference": "Sáng-thế Ký 1:1"
    }
  ]
}
```

Book abbreviations use Vietnamese short forms (for example, `sa` is Sáng-thế Ký / Genesis).

### Full-text search

Search verse text with SQLite FTS5. The request body must include a non-empty `query` string. Punctuation is stripped before the query is run.

```
POST /verses/fts
{ "query": "Đức Chúa Trời" }
```

Example response:

```json
[
  {
    "id": 1,
    "book_id": 1,
    "chapter": 1,
    "verse": 1,
    "text": "Ban đầu Đức Chúa Trời dựng nên trời và đất.",
    "highlighted_text": "Ban đầu <b>Đức</b> <b>Chúa</b> <b>Trời</b> dựng nên trời và đất.",
    "rank": -1.234,
    "reference": "Sáng-thế Ký 1:1"
  }
]
```

Results are ordered by relevance (`rank`). Matching terms are wrapped in `<b>` tags in `highlighted_text`.

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
