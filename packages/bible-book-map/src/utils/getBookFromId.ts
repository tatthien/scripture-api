import { bibleBookMap } from "../bookMap";

export function getBookFromId(bookid: number) {
  return Object.values(bibleBookMap).find((book) => book.bookId === bookid);
}
