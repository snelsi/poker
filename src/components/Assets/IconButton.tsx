import styled from "styled-components";

import { ButtonBase } from "./ButtonBase";

export const IconButton = styled(ButtonBase)`
  & > img,
  & > svg {
    width: 24px;
    height: 24px;
  }
`;
