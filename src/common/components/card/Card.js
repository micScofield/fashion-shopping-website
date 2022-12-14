import PropTypes from "prop-types";
import "common/components/card/card.styles.scss";
/*
Overlay supports upto 2 values
Footer needs 2 values
*/

const Card = ({ cardData, large }) => {
  let {
    imageUrl,
    footer,
    overlay,
    onOverlayClick,
    overlayPosition,
    showOverlayByDefault, // for hover effect
    disableImageTransition,
  } = cardData;

  // Determining CSS classes for card wrapper
  let cardWrapperCssClasses = ["card-wrapper"];
  if (disableImageTransition)
    cardWrapperCssClasses.push("disable-image-transition");
  if (large) cardWrapperCssClasses.push("large");
  if (footer) cardWrapperCssClasses.push("shortened-image-wrapper");

  // Determining CSS classes for image
  let backgroundImageClasses = ["background-image"];

  // Determining CSS classes for card container
  let cardContainerCssClasses = [];
  if (showOverlayByDefault)
    cardContainerCssClasses.push("card-body-container-with-overlay");
  else cardContainerCssClasses.push("card-body-container-without-overlay");
  if (overlay && overlay.length < 2)
    cardContainerCssClasses.push("overlay-header-small");
  if (overlayPosition === "bottom")
    cardContainerCssClasses.push("overlay-position-bottom");

  if (!onOverlayClick) {
    onOverlayClick = () => {};
  }

  return (
    <>
      <div className={cardWrapperCssClasses.join(" ")}>
        {imageUrl && (
          <div
            className={`image-wrapper ${
              footer ? "shortened-image-wrapper" : ""
            }`}
          >
            <div
              className={backgroundImageClasses.join(" ")}
              style={{
                backgroundImage: `url(${imageUrl})`,
              }}
            />
          </div>
        )}

        {overlay && (
          <div
            className={cardContainerCssClasses.join(" ")}
            onClick={(e) =>
              onOverlayClick(e, { cardData, currentText: overlay[0] })
            }
          >
            {overlay[0] && (
              <h2 dangerouslySetInnerHTML={{ __html: overlay[0] }} />
            )}
            {overlay[1] && <p>{overlay[1]}</p>}
          </div>
        )}

        {footer && (
          <div className='footer'>
            <span className='value1'>{footer.value1}</span>
            <span className='value2'>{footer.value2}</span>
          </div>
        )}
      </div>
    </>
  );
};

Card.propTypes = {
  cardData: PropTypes.shape({
    imageUrl: PropTypes.string,
    footer: PropTypes.shape({
      value1: PropTypes.string,
      value2: PropTypes.string,
    }),
    overlayPosition: PropTypes.string,
    showOverlayByDefault: PropTypes.bool,
    onOverlayClick: PropTypes.func,
  }),
  large: PropTypes.bool,
  disableImageTransition: PropTypes.bool,
};

export default Card;
