import styled from "styled-components";

export const ButtonBase = styled.button`
  background-color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  height: 48px;
  width: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.2s ease-out;

  &:hover {
    background-color: #eee;
  }
  &:active {
    background-color: #ccc;
  }
`;
