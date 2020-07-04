import * as React from "react";

import { CardSuit } from "interfaces";

interface SuitProps {
  suit: CardSuit;
}

export const Suit: React.FC<SuitProps> = ({ suit }) => {
  const imageSrc = React.useMemo(() => {
    if (suit === "hearts") return "images/Hearts.svg";
    if (suit === "diamonds") return "images/Diamonds.svg";
    if (suit === "clubs") return "images/Clubs.svg";
    if (suit === "spades") return "images/Spades.svg";

    return undefined;
  }, [suit]);

  return <img src={imageSrc} alt="Card suit icon" />;
};
