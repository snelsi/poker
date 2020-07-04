import * as React from "react";

import {
  cardToKey,
  shuffleArray,
  defaultDeck,
  getArrayOfPlayers,
  useCombinations,
  useRank,
} from "scripts";

import { Card, CardValue, Player } from "interfaces";

export const usePoker = (
  numberOfPlayers: number,
  initialDeck = defaultDeck
) => {
  const deck = React.useRef<Card[]>(initialDeck);
  const [players, setPlayers] = React.useState<Player[]>(() =>
    getArrayOfPlayers(numberOfPlayers)
  );
  const [pool, setPool] = React.useState<Card[]>(() => []);

  const {
    playersCombinations,
    poolCombinations,
    taggedCards,
  } = useCombinations(pool, players);

  const winners = useRank(playersCombinations, poolCombinations);

  const getTopDeckCard = () => {
    if (deck.current?.length > 0) {
      const deckCopy = [...deck.current];
      const card = deckCopy.pop();
      deck.current = deckCopy;
      return card;
    }
    return null;
  };

  /** Trying to get card from the deck with given value */
  const getCardFromSleeve = (value: CardValue): Card => {
    for (let i = 0; i < deck.current.length; i++) {
      if (deck.current[i].value === value) {
        const card = deck.current[i];
        deck.current.splice(i, 1);
        return card;
      }
    }
    // if not found, just get top card
    return getTopDeckCard();
  };

  const startNextRound = () => {
    // Reset deck
    deck.current = shuffleArray(initialDeck);

    // Give players new cards
    const newPlayers = [];

    for (const player of players) {
      const cards: Card[] = [];

      cards.push(getTopDeckCard());

      // Немножко сжульничаем
      cards.push(
        Math.random() <= 0.4
          ? getCardFromSleeve(cards[0].value)
          : getTopDeckCard()
      );

      newPlayers.push({ ...player, cards });
    }

    setPlayers(newPlayers);

    // Give pool new cards
    const newPool: Card[] = [];
    for (let j = 0; j < 5; j++) {
      newPool.push(getTopDeckCard());
    }
    setPool(newPool);
  };

  React.useEffect(() => {
    startNextRound();
  }, []);

  const cardsLeft = React.useMemo(() => deck.current?.length || 0, [deck]);

  // Add group tags to pool cards
  const poolCardsWithGroup = React.useMemo(
    () =>
      pool.map((card) => {
        const key = cardToKey(card);
        if (taggedCards.has(key)) {
          const { groups } = taggedCards.get(key);
          return { ...card, groups };
        }
        return card;
      }),
    [pool, taggedCards]
  );

  // Add group tags to players cards
  const playersComputed = React.useMemo(
    () =>
      players.map((player) => {
        // Add groups to cards
        const cards = player.cards.map((card) => {
          const key = cardToKey(card);
          if (taggedCards.has(key)) {
            const { groups } = taggedCards.get(key);
            return { ...card, groups };
          }
          return card;
        });

        // Add score, combinations and isWon
        const stats = winners.find((score) => player.id === score.id);

        return { ...player, cards, ...stats };
      }),
    [players, taggedCards, winners]
  );

  return {
    cardsLeft,
    pool: poolCardsWithGroup,
    players: playersComputed,
    startNextRound,
  };
};
