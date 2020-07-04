import * as React from "react";
import { Combinations, Player } from "interfaces";
import { getValueIndex } from "scripts";

type PlayerComb = Pick<Player, "id" | "combinations" | "highestCard">;

export const useRank = (
  playersCombinations: PlayerComb[],
  poolCombinations: Combinations
) => {
  // Combine player combinations with pool combinations
  const players = React.useMemo(() => {
    const players: PlayerComb[] = [];

    for (const player of playersCombinations) {
      const combinations = new Map(poolCombinations.combinations);

      player.combinations.forEach((k, v) => {
        combinations.set(v, k);
      });

      players.push({ ...player, combinations });
    }

    return players;
  }, [playersCombinations, poolCombinations]);

  // Count a point for each card that have a pair
  const playersCount = React.useMemo(() => {
    const scores: Pick<
      Player,
      "id" | "combinations" | "highestCard" | "score"
    >[] = [];
    let highestScore: Combinations = {
      score: 0,
      highestCard: "6",
    };

    for (const player of players) {
      let score = 0;
      const combinations = Array.from(player.combinations);

      for (const combination of combinations) {
        const [_value, comb] = combination;
        score += comb.cards.length;
      }

      if (score > highestScore.score) {
        highestScore = {
          score,
          highestCard: player.highestCard,
        };
      } else if (score === highestScore.score) {
        if (
          getValueIndex(player.highestCard) >
          getValueIndex(highestScore.highestCard)
        ) {
          highestScore.highestCard = player.highestCard;
        }
      }

      scores.push({ ...player, score });
    }

    // Determine who won
    const whoWon: Pick<
      Player,
      "id" | "combinations" | "highestCard" | "score" | "isWon"
    >[] = scores.map((player) => {
      // Won if
      // 1) player score is same as highest score
      // 2) player highest card is same as highest card
      const isWon =
        player.score >= highestScore.score &&
        getValueIndex(player.highestCard) >=
          getValueIndex(highestScore.highestCard);

      return { ...player, isWon };
    });

    return whoWon;
  }, [players]);

  return playersCount;
};
