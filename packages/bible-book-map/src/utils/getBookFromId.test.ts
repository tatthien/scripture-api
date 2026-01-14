import { getBookFromId } from "./getBookFromId";
import { describe, it, expect } from 'bun:test'

describe("getBookFromId", () => {
  it("should return the correct book info", () => {
    expect(getBookFromId(1)).toEqual({
      bookId: 1,
      bookName: {
        vi: "Sáng-thế Ký",
        en: "Genesis"
      }
    })
    expect(getBookFromId(66)).toEqual({
      bookId: 66,
      bookName: {
        vi: "Khải-huyền",
        en: "Revelation"
      }
    })
  })
  it("should return undefined if the book id is invalid", () => {
    expect(getBookFromId(0)).toBeUndefined()
    expect(getBookFromId(67)).toBeUndefined()
  })
})
