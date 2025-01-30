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

export function verifierMain(cards: ICarte[]): number {
  const sortedCards = getSortedArray([...cards]);

  let hand = HIGH_CARD;

  if (hasRoyalFlush(sortedCards)) {
    hand = ROYAL_FLUSH;
  } else if (hasStraightFlush(sortedCards)) {
    hand = STRAIGHT_FLUSH;
  } else if (hasFourOfAKind(sortedCards)) {
    hand = FOUR_OF_A_KIND;
  } else if (hasFullHouse(sortedCards)) {
    hand = FULL_HOUSE;
  } else if (hasFlush(sortedCards)) {
    hand = FLUSH;
  } else if (hasStraight(sortedCards)) {
    hand = STRAIGHT;
  } else if (hasThreeOfAKind(sortedCards)) {
    hand = THREE_OF_A_KIND;
  } else if (hasTwoPairs(sortedCards)) {
    hand = TWO_PAIRS;
  } else if (hasPair(sortedCards)) {
    hand = JACK_BETTER;
  }

  return hand;
}

function getSortedArray(cards: ICarte[]): ICarte[] {
  return cards.sort(
    (a, b) => getValueFromCard(a.value) - getValueFromCard(b.value)
  );
}

function hasPair(cards: ICarte[]): boolean {
  const pairCount = checkNbOfPairs(cards);
  return pairCount === 1 && checkPairIsJackOrBetter(cards);
}

function checkPairIsJackOrBetter(cards: ICarte[]): boolean {
  let pairFound = false;
  for (let i = 0; i < cards.length - 1; i++) {
    if (cards[i].value === cards[i + 1].value) {
      if (getValueFromCard(cards[i].value) >= getValueFromCard(CJ)) {
        pairFound = true;
      }
    }
  }
  return pairFound;
}

function hasTwoPairs(cards: ICarte[]): boolean {
  return checkNbOfPairs(cards) === 2;
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

function hasThreeOfAKind(cards: ICarte[]): boolean {
  return (
    cards[0].value === cards[2].value ||
    cards[1].value === cards[3].value ||
    cards[2].value === cards[4].value
  );
}

function hasFourOfAKind(cards: ICarte[]): boolean {
  return cards[0].value === cards[3].value || cards[1].value === cards[4].value;
}

export function hasStraight(cards: ICarte[]): boolean {
  let hasStraight = true;

  for (let i = 0; i < cards.length - 1; i++) {
    const current = getValueFromCard(cards[i].value);
    const next = getValueFromCard(cards[i + 1].value);

    if (i === 3 && current === 5 && next === 14) {
      hasStraight = true;
    } else if (current + 1 !== next) {
      hasStraight = false;
    }
  }
  return hasStraight;
}

function hasFlush(cards: ICarte[]): boolean {
  const suit = cards[0].suit;
  let hasFlush = true;
  for (let i = 1; i < cards.length && hasFlush; i++) {
    if (cards[i].suit !== suit) {
      hasFlush = false;
    }
  }
  return hasFlush;
}

function hasFullHouse(cards: ICarte[]): boolean {
  return (
    (cards[0].value === cards[2].value && cards[3].value === cards[4].value) ||
    (cards[0].value === cards[1].value && cards[2].value === cards[4].value)
  );
}

function hasStraightFlush(cards: ICarte[]): boolean {
  return hasFlush(cards) && hasStraight(cards);
}

export function hasRoyalFlush(cards: ICarte[]): boolean {
  return (
    cards[0].value === C10 &&
    cards[4].value === CA &&
    hasFlush(cards) &&
    hasStraight(cards)
  );
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
