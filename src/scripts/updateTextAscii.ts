import { db } from '../db'
import { removeVnDiacritics } from '../utils/removeVnDiacritics'

const rows = db.prepare('SELECT * from verses').all() as any

console.time('execution time')
for (const row of rows) {
  const nonDiacriticText = removeVnDiacritics(row.text)
  if (row.text_ascii === nonDiacriticText) continue
  db.prepare('UPDATE verses SET text_ascii = ? WHERE id = ?').run(nonDiacriticText, row.id)
}
console.timeEnd('execution time')
