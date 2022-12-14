import React from "react";
import PropTypes from "prop-types";

import Card from "common/components/card/Card";
import "common/components/card-container/card-container.styles.scss";

function CardContainer({
  title,
  cards,
  grid,
  large,
  onTitleClick,
  titlePosition,
}) {
  // determine class for container
  let cardContainerClassName = grid
    ? "card-container-grid"
    : "card-container-flex";

  // determine class for title
  let titleClasses = [];
  if (onTitleClick) titleClasses.push("card-container-title");
  titlePosition === "left"
    ? titleClasses.push("card-container-title-position-left")
    : titleClasses.push("card-container-title-position-center");

  if (!onTitleClick) onTitleClick = () => {};

  const formattedTitle = title ? title.charAt(0).toUpperCase() + title.slice(1) : ''

  return (
    <>
      {title && (
        <h2 onClick={onTitleClick} className={titleClasses.join(" ")}>
          {formattedTitle}
        </h2>
      )}
      {cards && cards.length !== 0 && (
        <div className={cardContainerClassName} test-id='card-container'>
          {cards.map((card) => (
            <Card key={card.id} cardData={card} large={large} />
          ))}
        </div>
      )}
    </>
  );
}

CardContainer.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  grid: PropTypes.bool,
  large: PropTypes.bool,
};

export default CardContainer;
