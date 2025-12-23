import { bibleBookMap } from "../bookMap"

export function getBookFromAbbr(abbr: string) {
  const book = bibleBookMap[abbr.toLowerCase()]
  if (!book) {
    throw new Error(`Invalid book abbreviation: ${abbr}`)
  }
  return book
}
