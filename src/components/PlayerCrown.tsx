import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";

const colors = ["#ff0808", "#0030e8", "#2cb124", "#7539ff", "#ffb529"];

interface HighlightPairsProps {
  hovered: boolean;
  groups: string[];
}
const HighlightGroups = createGlobalStyle<HighlightPairsProps>`
    ${({ hovered, groups }) => {
      if (!hovered) return "";
      const borders = groups.map(
        (group, i) =>
          `.card.${group} { box-shadow: 0 0 1px 4px ${
            colors[i % colors.length]
          }; opacity: 1 !important;}`
      );

      return `.card {
            opacity: 0.4;
            }

            ${borders.join("\n")}`;
    }}
  `;

const Crown = styled.div`
  content: attr(data-score);
  cursor: pointer;

  display: block;
  height: 125px;
  position: absolute;
  left: auto;
  width: 100%;
  top: -140px;
  font-size: 40px;
  line-height: 125px;
  color: #fff;

  transition: transform 0.2s ease-out;

  &[data-won="true"] {
    background: center no-repeat url(images/Crown.svg);
    opacity: 1;
  }

  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(0.98);
  }
`;

interface PlayerCrownProps {
  isWon: boolean;
  score: number;
  groups: string[];
}

export const PlayerCrown: React.FC<PlayerCrownProps> = ({
  isWon,
  score,
  groups,
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <>
      <HighlightGroups hovered={hovered} groups={groups} />
      <Crown
        data-won={isWon}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {score}
      </Crown>
    </>
  );
};
