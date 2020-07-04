import * as React from "react";

import { Card, Combination, Player, Combinations } from "interfaces";
import { cardToKey, getHighestRank, getCombinations } from "scripts";

export const useCombinations = (
  pool: Card[],
  players: Pick<Player, "id" | "cards">[]
) => {
  // Amount of found combinations
  const i = React.useRef(0);

  const poolCards = React.useMemo(
    () => pool.map((card) => ({ ...card, from: "pool" })),
    [pool]
  );

  // Get combinations from pool only
  const poolCombinations: Combinations = React.useMemo(() => {
    const combinations = getCombinations(poolCards, i.current);
    const highestCard = getHighestRank(poolCards);

    i.current += combinations.size;

    return { combinations, highestCard };
  }, [poolCards]);

  // Combinations for each player
  const playersCombinations = React.useMemo(() => {
    const playersCombinations: Pick<
      Player,
      "id" | "combinations" | "highestCard"
    >[] = [];

    for (const player of players) {
      // Combine pool cards and player cards
      const cards = [
        ...poolCards,
        ...player.cards.map((card) => ({ ...card, from: player.id })),
      ];

      // Get all unique values from player cards
      const playerValues = Array.from(
        new Set(player.cards.map((card) => card.value))
      );

      const combinations = getCombinations(cards, i.current, playerValues);
      const highestCard = getHighestRank(player.cards);
      i.current += combinations.size;

      playersCombinations.push({
        id: player.id,
        combinations,
        highestCard,
      });
    }

    return playersCombinations;
  }, [poolCards, players]);

  // cards, that are in group
  const taggedCards = React.useMemo(() => {
    const groups: Combination[] = [];

    // Get players combinations
    for (const player of playersCombinations) {
      const array = Array.from(player.combinations);
      const combinations = array.map(([_, group]) => group);
      groups.push(...combinations);
    }

    // Get combinations in pool
    const array = Array.from(poolCombinations.combinations);
    const combinations = array.map(([_, group]) => group);
    groups.push(...combinations);

    // Desctruct groups into separate cards
    const cards: Card[] = [];

    for (const group of groups) {
      const groupCards = group.cards.map((card) => ({
        ...card,
        groups: [String(group.id)],
      }));
      cards.push(...groupCards);
    }

    // Dedupe same cards in one object
    const dedupedCards = new Map<string, Card>();
    for (const card of cards) {
      const key = cardToKey(card);
      if (dedupedCards.has(key)) {
        const cardInMap = dedupedCards.get(key);
        cardInMap.groups.push(...card.groups);
      } else {
        dedupedCards.set(key, card);
      }
    }

    return dedupedCards;
  }, [poolCombinations.combinations, playersCombinations]);

  return {
    poolCombinations,
    playersCombinations,
    taggedCards,
  };
};
