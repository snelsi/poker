import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";

import { Card as ICard, CardValue } from "interfaces";
import { Suit } from "components";

interface HighlightPairsProps {
  hovered: boolean;
  value: CardValue;
}
const HighlightPairs = createGlobalStyle<HighlightPairsProps>`
  ${({ hovered, value }) =>
    hovered
      ? `.card:not([data-value="${value}"]) {
  opacity: 0.4;
  }`
      : ""}
`;

const CardWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  width: 140px;
  height: 200px;

  transition: all 0.2s ease-out;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);

  color: #000;
  user-select: none;

  &[data-suit="diamonds"],
  &[data-suit="hearts"] {
    color: red;
  }

  &:hover {
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.12);
    transform: scale(1.02);
  }
  &:active {
    transform: scale(0.98);
  }

  & .cardInfo {
    position: absolute;
    font-size: 24px;
    font-weight: 600;
    text-align: center;

    & img {
      height: 16px;
      width: 16px;
    }

    &.top {
      top: 10px;
      left: 20px;
    }

    &.bottom {
      bottom: 10px;
      right: 20px;
      transform: rotate(180deg);
    }
  }

  & .cardSuit img {
    height: 32px;
    width: 32px;
  }

  &[data-highlight="true"] {
    box-shadow: 0 0 1px 3px rgb(255, 8, 75);
  }

  display: flex;
  align-items: center;
  justify-content: center;
`;

interface CardProps {
  card: ICard;
}

export const Card: React.FC<CardProps> = ({ card }) => {
  const [hovered, setHovered] = React.useState(false);

  const title = React.useMemo(() => {
    if (
      card.value === "Jack" ||
      card.value === "Queen" ||
      card.value === "King" ||
      card.value === "Ace"
    ) {
      return card.value[0];
    }
    return card.value;
  }, [card.value]);

  return (
    <>
      <HighlightPairs hovered={hovered} value={card.value} />
      <CardWrapper
        className={`card ${
          card?.groups
            ? card.groups.map((group) => `group-${group}`).join(" ")
            : ""
        }`}
        data-suit={card.suit}
        data-value={card.value}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="cardInfo top">
          <div>{title}</div>
          <Suit suit={card.suit} />
        </span>
        <div className="cardSuit">
          <Suit suit={card.suit} />
        </div>
        <span className="cardInfo bottom">
          <div>{title}</div>
          <Suit suit={card.suit} />
        </span>
      </CardWrapper>
    </>
  );
};
