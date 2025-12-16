export const ADDRESS_REGEX = /^(?<book>(?:[0-9]{1})?[A-Za-z]+)\s+(?<chapter>\d+)(?::(?<verseFrom>\d+)?(?:-(?<verseTo>\d+))?)?$/;

type Address = {
  book: string;
  chapter: number;
  verseFrom?: number;
  verseTo?: number;
};

export function parseAddress(address: string): Address {
  const trimmedAddress = address.trim();

  const match = trimmedAddress.match(ADDRESS_REGEX);

  if (match && match[1] && match[2]) {
    const verseFrom = match[3] ? Number(match[3]) : undefined;
    const verseTo = match[4] ? Number(match[4]) : undefined;

    return {
      book: match[1],
      chapter: Number(match[2]),
      verseFrom,
      verseTo,
    };
  }

  throw new Error("Invalid address");
}
