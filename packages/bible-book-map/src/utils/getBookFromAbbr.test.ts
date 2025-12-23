import { getBookFromAbbr } from "./getBookFromAbbr"
import { describe, it, expect } from "bun:test"

describe("getBookFromAbbr", () => {
  it("should return the correct book info", () => {
    expect(getBookFromAbbr("sa")).toEqual({
      bookId: 1,
      bookName: {
        vi: "Sáng-thế Ký",
        en: "Genesis"
      }
    })
  })

  it('should throw an error if the book abbreviation is invalid', () => {
    expect(() => getBookFromAbbr("gen")).toThrowError("Invalid book abbreviation: gen")
  })
})
