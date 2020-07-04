import * as React from "react";
import styled from "styled-components";

import { Player } from "components";
import { Player as IPlayer } from "interfaces";

const PlayersWrapper = styled.div`
  overflow: auto;
  text-align: center;
  padding-top: 20vh;

  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  & > ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
    gap: 20px;

    align-items: center;
    justify-content: center;
    flex-wrap: none;
    margin: auto;

    & > li {
      margin: 20px;
      position: relative;
    }
  }
`;

interface PlayersProps {
  players: IPlayer[];
}

export const Players: React.FC<PlayersProps> = ({ players }) => (
  <PlayersWrapper>
    <ul>
      {players.map((player) => (
        <li key={player.id}>
          <Player player={player} />
        </li>
      ))}
    </ul>
  </PlayersWrapper>
);
