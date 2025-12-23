export function buildAddress({
  bookName,
  chapter,
  verseFrom,
  verseTo
}: {
  bookName: string
  chapter: number
  verseFrom?: number
  verseTo?: number
}) {
  if (!verseFrom && !verseTo) {
    return `${bookName} ${chapter}`
  }

  if (verseFrom && !verseTo) {
    return `${bookName} ${chapter}:${verseFrom}`
  }

  return `${bookName} ${chapter}:${verseFrom}-${verseTo}`
}
