import {
  Player,
  Card,
  CardValueArray,
  Combination,
  CardValue,
} from "interfaces";

/**
 * Randomly shuffles all elements in the array
 */
export const shuffleArray = (a: any[]) => {
  const array = [...a];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getNewPlayer = (
  id: number,
  name?: string,
  cards = [],
  isWon = false,
  combinations = new Map(),
  highestCard = null
): Player => ({
  id,
  name: name || String(id + 1),
  cards,
  isWon,
  combinations,
  highestCard,
});

export const getArrayOfPlayers = (amount: number) => {
  const players = [];
  for (let i = 0; i < amount; i++) {
    players.push(getNewPlayer(i));
  }
  return players;
};

export const cardToKey = (card: Card) => `${card.value}-${card.suit}`;

/** Convert card value to ranked number */
export const getValueIndex = (value: CardValue): number =>
  CardValueArray.findIndex((cardValue) => value === cardValue);

/** Find highest rank in cards array */
export const getHighestRank = (cards: Card[]) => {
  if (!cards || cards.length === 0) return undefined;

  let highestIndex = getValueIndex(cards[0].value);

  for (let i = 1; i < cards.length; i++) {
    const index = getValueIndex(cards[i].value);
    if (highestIndex < index) {
      highestIndex = index;
    }
    if (index === CardValueArray.length - 1) {
      break;
    }
  }

  return CardValueArray[highestIndex];
};

export function getCombinations(
  cards: Card[],
  index = 0,
  valuesToCheck = CardValueArray
): Map<CardValue, Combination> {
  // Prepare combinations object
  const combinations: Map<CardValue, Combination> = new Map();

  // Group id
  let i = index;

  // For each unique value in the deck
  for (const value of valuesToCheck) {
    // Count amount of same value cards
    const group = cards.filter((card) => card.value === value);

    // If more than one card found - iterate identifier and push cards to combinations
    if (group.length > 1) {
      i++;

      combinations.set(value, {
        id: i,
        cards: group,
      });
    }
  }

  return combinations;
}
