import { Router } from "express";
import Ajv, { type JSONSchemaType } from "ajv";
import { db } from "../db";
import { parseAddress } from "../utils/parseAddress";
import { getBookIdFromAbbr } from "../utils/getBookIdFromAbbr";

const router = Router();
const ajv = new Ajv();

type Verse = {
  id: number;
  book_id: number;
  chapter: number;
  text: string;
  verse: number;
};

router.get("/:address", (req, res) => {
  const { address } = req.params;

  try {
    const { book, chapter, verseFrom, verseTo } = parseAddress(address);
    const bookId = getBookIdFromAbbr(book);
    let rows: Verse[] = [];

    if (!verseFrom && !verseTo) {
      rows = db
        .prepare("SELECT * FROM verses WHERE book_id = ? AND chapter = ?")
        .all(bookId, chapter) as Verse[];
    }

    if (verseFrom && !verseTo) {
      rows = db
        .prepare(
          "SELECT * FROM verses WHERE book_id = ? AND chapter = ? AND verse = ?"
        )
        .all(bookId, chapter, verseFrom) as Verse[];
    }

    if (verseFrom && verseTo) {
      rows = db
        .prepare(
          "SELECT * FROM verses WHERE book_id = ? AND chapter = ? AND verse BETWEEN ? AND ?"
        )
        .all(bookId, chapter, verseFrom, verseTo) as Verse[];
    }

    res.json(rows);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
    return;
  }
});

type FtsPayload = {
  query: string;
};

const ftsPayloadSchema: JSONSchemaType<FtsPayload> = {
  type: "object",
  properties: {
    query: { type: "string", minLength: 1 },
  },
  required: ["query"],
  additionalProperties: true,
};

const validateFtsPayload = ajv.compile(ftsPayloadSchema);

router.post('/fts', (req, res) => {
  if (!validateFtsPayload(req.body)) {
    return res.status(400).json({ error: validateFtsPayload.errors })
  }

  try {
    const { query } = req.body as FtsPayload
    const sanitizedQuery = query.replace(/[.,!@#$%^&*()-]/g, '')
    const body = db.prepare(`
      SELECT id, book_id, chapter, verse, highlight(verses_fts, 1, '<b>', '</br>') as text, rank FROM verses as v
      INNER JOIN verses_fts as s ON s.row_id = v.id
      WHERE verses_fts MATCH ?
      ORDER BY rank;
  `).all(sanitizedQuery) as Verse[]
    res.status(200).json(body)
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
})

export default router;
