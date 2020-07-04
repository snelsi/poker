import * as React from "react";
import styled from "styled-components";

import { IconButton } from "components/Assets/IconButton";

const Button = styled(IconButton)`
  background: none;
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 2;

  & > img {
    width: 28px;
    height: 28px;
  }
`;

interface GitHubLinkProps {}

export const GitHubLink: React.FC<GitHubLinkProps> = () => (
  <Button
    as="a"
    href="https://github.com/snelsi/poker"
    target="_blank"
    rel="noreferrer noopener"
  >
    <img src="images/GitHub.svg" alt="GitHub icon" />
  </Button>
);
