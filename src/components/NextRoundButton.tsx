import * as React from "react";
import styled from "styled-components";

import { IconButton } from "components/Assets/IconButton";

const Button = styled(IconButton)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

interface NextRoundButtonProps {
  onClick: () => void;
}

export const NextRoundButton: React.FC<NextRoundButtonProps> = ({
  onClick,
}) => (
  <Button type="button" onClick={onClick}>
    <img src="images/Restart.svg" alt="Restart game icon" />
  </Button>
);
