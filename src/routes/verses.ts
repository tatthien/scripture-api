import { Router } from "express";
import Ajv, { type JSONSchemaType } from "ajv";
import { db } from "../db";
import { parseAddress } from "../utils/parseAddress";
import { getBookIdFromAbbr } from "../utils/getBookIdFromAbbr";

const router = Router();
const ajv = new Ajv();

type QueryParams = {
  address: string;
};

const querySchema: JSONSchemaType<QueryParams> = {
  type: "object",
  properties: {
    address: { type: "string", minLength: 1 },
  },
  required: ["address"],
  additionalProperties: true,
};

const validateQuery = ajv.compile(querySchema);

type Verse = {
  id: number;
  book_id: number;
  chapter: number;
  text: string;
  verse: number;
};

router.get("/", (req, res) => {
  if (!validateQuery(req.query)) {
    res.status(400).json({ error: validateQuery.errors });
    return;
  }

  const { address } = req.query;

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

export default router;
