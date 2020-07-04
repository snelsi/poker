import React from "react";
import styled from "styled-components";

import { Board, GitHubLink } from "components";

const Wrapper = styled.div``;

export const App = () => (
  <main>
    <GitHubLink />
    <Wrapper>
      <Board />
    </Wrapper>
  </main>
);
