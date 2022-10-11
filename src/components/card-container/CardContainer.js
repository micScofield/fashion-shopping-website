import React from 'react';
import PropTypes from 'prop-types';

import Card from 'components/card/Card';
import 'components/card-container/card-container.styles.scss';

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
    ? 'card-container-grid'
    : 'card-container-flex';

  // determine class for title
  let titleClasses = [];
  if (onTitleClick) titleClasses.push('card-container-title');
  titlePosition === 'left'
    ? titleClasses.push('card-container-title-position-left')
    : titleClasses.push('card-container-title-position-center');

  if (!onTitleClick) onTitleClick = () => {};

  return (
    <>
      {title && (
        <h2 onClick={onTitleClick} className={titleClasses.join(' ')}>
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </h2>
      )}
      <div className={cardContainerClassName}>
        {cards.length !== 0 &&
          cards.map((card) => (
            <Card key={card.id} cardData={card} large={large} />
          ))}
      </div>
    </>
  );
}

CardContainer.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  grid: PropTypes.bool,
  large: PropTypes.bool,
};

export default CardContainer;
