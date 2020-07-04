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
  min-height: 100vh;
  position: relative;
  z-index: 1;
`;

interface BoardProps {}

export const Board: React.FC<BoardProps> = () => {
  const { players, pool, startNextRound } = usePoker(2);

  return (
    <>
      <BoardBackground />
      <Wrapper>
        <NextRoundButton onClick={startNextRound} />

        <div className="boardPool">
          <CardsList cards={pool} />
        </div>

        <Players players={players} />
      </Wrapper>
    </>
  );
};
