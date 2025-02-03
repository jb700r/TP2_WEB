import { ICarte } from "./Carte";

const ROYAL_FLUSH = 800;
const STRAIGHT_FLUSH = 90;
const FOUR_OF_A_KIND = 25;
const FULL_HOUSE = 9;
const FLUSH = 6;
const STRAIGHT = 4;
const THREE_OF_A_KIND = 3;
const TWO_PAIRS = 2;
const JACK_BETTER = 1;
const HIGH_CARD = 0;

const C10 = "10";
const CA = "ACE";
const CJ = "JACK";

export function verifierMain(
  cards: ICarte[],
  setCards: (cards: ICarte[]) => void
): number {
  const sortedCards = getSortedArray([...cards]);
  const paidCards: ICarte[] = [];
  let hand = HIGH_CARD;

  if (hasRoyalFlush(sortedCards, paidCards)) {
    hand = ROYAL_FLUSH;
  } else if (hasStraightFlush(sortedCards, paidCards)) {
    hand = STRAIGHT_FLUSH;
  } else if (hasFourOfAKind(sortedCards, paidCards)) {
    hand = FOUR_OF_A_KIND;
  } else if (hasFullHouse(sortedCards, paidCards)) {
    hand = FULL_HOUSE;
  } else if (hasFlush(sortedCards, paidCards, true)) {
    hand = FLUSH;
  } else if (hasStraight(sortedCards, paidCards, true)) {
    hand = STRAIGHT;
  } else if (hasThreeOfAKind(sortedCards, paidCards)) {
    hand = THREE_OF_A_KIND;
  } else if (hasTwoPairs(sortedCards, paidCards)) {
    hand = TWO_PAIRS;
  } else if (hasPair(sortedCards, paidCards)) {
    hand = JACK_BETTER;
  }

  markAsPaid(cards, paidCards, setCards);
  return hand;
}

function getSortedArray(cards: ICarte[]): ICarte[] {
  return cards.sort(
    (a, b) => getValueFromCard(a.value) - getValueFromCard(b.value)
  );
}

function markAsPaid(
  originalCards: ICarte[],
  paidCards: ICarte[],
  setCards: (cards: ICarte[]) => void
) {
  const paidSet = new Set(paidCards.map((c) => `${c.value}-${c.suit}`));

  const updatedCards = originalCards.map((card) => ({
    ...card,
    paid: paidSet.has(`${card.value}-${card.suit}`),
  }));

  setCards(updatedCards);
}

function hasPair(cards: ICarte[], paidCards: ICarte[]): boolean {
  const pairCount = checkNbOfPairs(cards);
  if (pairCount === 1 && checkPairIsJackOrBetter(cards, paidCards)) {
    return true;
  }
  return false;
}

function checkPairIsJackOrBetter(
  cards: ICarte[],
  paidCards: ICarte[]
): boolean {
  for (let i = 0; i < cards.length - 1; i++) {
    if (cards[i].value === cards[i + 1].value) {
      if (getValueFromCard(cards[i].value) >= getValueFromCard(CJ)) {
        paidCards.push(cards[i], cards[i + 1]);
        return true;
      }
    }
  }
  return false;
}

function hasTwoPairs(cards: ICarte[], paidCards: ICarte[]): boolean {
  if (checkNbOfPairs(cards) === 2) {
    const pairs = cards.filter(
      (card, _index, array) =>
        array.filter((c) => c.value === card.value).length === 2
    );
    paidCards.push(...pairs);
    return true;
  }
  return false;
}

function checkNbOfPairs(cards: ICarte[]): number {
  let pairCount = 0;
  for (let i = 0; i < cards.length - 1; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      if (cards[i].value === cards[j].value) {
        pairCount++;
      }
    }
  }
  return pairCount;
}

function hasThreeOfAKind(cards: ICarte[], paidCards: ICarte[]): boolean {
  for (let i = 0; i < cards.length - 2; i++) {
    if (
      cards[i].value === cards[i + 1].value &&
      cards[i].value === cards[i + 2].value
    ) {
      paidCards.push(cards[i], cards[i + 1], cards[i + 2]);
      return true;
    }
  }
  return false;
}

function hasFourOfAKind(cards: ICarte[], paidCards: ICarte[]): boolean {
  for (let i = 0; i < cards.length - 3; i++) {
    if (
      cards[i].value === cards[i + 1].value &&
      cards[i].value === cards[i + 2].value &&
      cards[i].value === cards[i + 3].value
    ) {
      paidCards.push(cards[i], cards[i + 1], cards[i + 2], cards[i + 3]);
      return true;
    }
  }
  return false;
}

function hasStraight(
  cards: ICarte[],
  paidCards: ICarte[],
  push: boolean
): boolean {
  for (let i = 0; i < cards.length - 1; i++) {
    if (
      getValueFromCard(cards[i].value) + 1 !==
      getValueFromCard(cards[i + 1].value)
    ) {
      return false;
    }
  }
  if (push) {
    paidCards.push(...cards);
  }

  return true;
}

function hasFlush(
  cards: ICarte[],
  paidCards: ICarte[],
  push: boolean
): boolean {
  const suit = cards[0].suit;
  if (cards.every((card) => card.suit === suit)) {
    if (push) {
      paidCards.push(...cards);
    }

    return true;
  }
  return false;
}

function hasFullHouse(cards: ICarte[], paidCards: ICarte[]): boolean {
  if (
    (cards[0].value === cards[2].value && cards[3].value === cards[4].value) ||
    (cards[0].value === cards[1].value && cards[2].value === cards[4].value)
  ) {
    paidCards.push(...cards);
    return true;
  }
  return false;
}

function hasStraightFlush(cards: ICarte[], paidCards: ICarte[]): boolean {
  if (
    hasFlush(cards, paidCards, false) &&
    hasStraight(cards, paidCards, false)
  ) {
    paidCards.push(...cards);
    return true;
  }
  return false;
}

function hasRoyalFlush(cards: ICarte[], paidCards: ICarte[]): boolean {
  if (
    cards[0].value === C10 &&
    cards[4].value === CA &&
    hasFlush(cards, paidCards, false) &&
    hasStraight(cards, paidCards, false)
  ) {
    paidCards.push(...cards);
    return true;
  }
  return false;
}

function getValueFromCard(value: string): number {
  const valueMap: { [key: string]: number } = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    JACK: 11,
    QUEEN: 12,
    KING: 13,
    ACE: 14,
  };
  return valueMap[value];
}
