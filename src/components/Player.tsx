import * as React from "react";
import styled from "styled-components";

import { Player as Iplayer } from "interfaces";
import { CardsList, PlayerCrown } from "components";

const Wrapper = styled.div`
  position: relative;

  & > .playerName {
    text-align: center;
    font-size: 18px;
    color: #222;
    font-weight: 600;
  }
`;

interface PlayerProps {
  player: Iplayer;
}

export const Player: React.FC<PlayerProps> = ({ player }) => {
  const groups = React.useMemo(() => {
    const combinations = Array.from(player.combinations);

    const cardGroups = combinations.map(
      ([_value, combination]) => `group-${combination.id}`
    );

    return cardGroups;
  }, [player]);

  return (
    <Wrapper data-winner={player?.isWon} data-score={player?.score || 0}>
      <PlayerCrown
        score={player?.score || 0}
        isWon={Boolean(player?.isWon)}
        groups={groups}
      />
      <div className="playerName">Player {player?.name}</div>
      <CardsList cards={player?.cards} />
    </Wrapper>
  );
};
