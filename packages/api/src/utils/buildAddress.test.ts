import { buildAddress } from './buildAddress'
import { expect, describe, it } from "bun:test";

describe('buildAddress', () => {
  it('builds an address string', () => {
    const address = buildAddress({
      bookName: 'John',
      chapter: 3,
      verseFrom: 16,
      verseTo: 17
    })
    expect(address).toBe('John 3:16-17')

    const address2 = buildAddress({
      bookName: 'John',
      chapter: 3,
      verseFrom: 16
    })
    expect(address2).toBe('John 3:16')

    const address3 = buildAddress({
      bookName: 'John',
      chapter: 3
    })
    expect(address3).toBe('John 3')
  })
})
