import * as React from "react";
import styled from "styled-components";

import { Card } from "components";
import { Card as ICard } from "interfaces";
import { cardToKey } from "scripts";

const Wrapper = styled.div`
  overflow: auto;
  text-align: center;
  & > ul {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: none;
    width: fit-content;
    padding: 20px;
    margin: auto;

    & > li {
      margin: 10px;
    }
  }
`;

interface CardsListProps {
  cards: ICard[];
}

export const CardsList: React.FC<CardsListProps> = ({ cards }) => (
  <Wrapper>
    <ul>
      {cards.map((card) => (
        <li key={cardToKey(card)}>
          <Card card={card} />
        </li>
      ))}
    </ul>
  </Wrapper>
);
