import { parseAddress, ADDRESS_REGEX } from './parseAddress'
import { expect, describe, it } from "bun:test";

describe('parseAddress', () => {
  describe('valid addresses', () => {
    it('parses book and chapter only', () => {
      expect(parseAddress('John 3')).toEqual({
        book: 'John',
        chapter: 3,
        verseFrom: undefined,
        verseTo: undefined,
      })
    })

    it('parses book, chapter, and single verse', () => {
      expect(parseAddress('John 3:16')).toEqual({
        book: 'John',
        chapter: 3,
        verseFrom: 16,
        verseTo: undefined,
      })
    })

    it('parses book, chapter, and verse range', () => {
      expect(parseAddress('John 3:16-17')).toEqual({
        book: 'John',
        chapter: 3,
        verseFrom: 16,
        verseTo: 17,
      })
    })

    it('parses numbered books (e.g., 1John)', () => {
      expect(parseAddress('1John 1:1')).toEqual({
        book: '1John',
        chapter: 1,
        verseFrom: 1,
        verseTo: undefined,
      })
    })

    it('parses numbered books with verse range', () => {
      expect(parseAddress('2Corinthians 5:17-21')).toEqual({
        book: '2Corinthians',
        chapter: 5,
        verseFrom: 17,
        verseTo: 21,
      })
    })

    it('trims whitespace from input', () => {
      expect(parseAddress('  John 3:16  ')).toEqual({
        book: 'John',
        chapter: 3,
        verseFrom: 16,
        verseTo: undefined,
      })
    })
  })

  describe('invalid addresses', () => {
    it('throws error for empty string', () => {
      expect(() => parseAddress('')).toThrow('Invalid address')
    })

    it('throws error for book only', () => {
      expect(() => parseAddress('John')).toThrow('Invalid address')
    })

    it('throws error for invalid format', () => {
      expect(() => parseAddress('123')).toThrow('Invalid address')
    })
  })
})

describe('ADDRESS_REGEX', () => {
  it('exports the regex pattern', () => {
    expect(ADDRESS_REGEX).toBeInstanceOf(RegExp)
  })
})
