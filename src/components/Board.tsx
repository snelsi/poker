import * as React from "react";
import styled from "styled-components";

import { usePoker } from "scripts";
import {
  BoardBackground,
  CardsList,
  NextRoundButton,
  Players,
} from "components";

const Wrapper = styled.div`
  min-height: max(640px, 100vh);

  @media (max-height: 640px) {
    min-height: 640px;
  }

  position: relative;
  & > div.content {
    z-index: 1;
  }
`;

interface BoardProps {}

export const Board: React.FC<BoardProps> = () => {
  const { players, pool, startNextRound } = usePoker(2);

  return (
    <>
      <Wrapper>
        <BoardBackground />
        <div className="content">
          <NextRoundButton onClick={startNextRound} />

          <div className="boardPool">
            <CardsList cards={pool} />
          </div>

          <Players players={players} />
        </div>
      </Wrapper>
    </>
  );
};
