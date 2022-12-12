import React from 'react';

import PropTypes from 'prop-types';

import 'common/components/button/button.styles.scss';
// import LightSpinner from 'common/components/spinner/light/LightSpinner';
// import { SPINNER_SIZES } from 'common/constants';
// import DarkSpinner from '../spinner/dark/DarkSpinner';

function Button(props) {
  const {
    type,
    text,
    onClick,
    secondaryButtonClass,
    disabled,
    validButtons,
    isLoading,
  } = props;

  // determining button classes
  const buttonCssClasses = ['button'];
  if (isLoading) buttonCssClasses.push('buttonLoading');
  if (secondaryButtonClass) buttonCssClasses.push(`${secondaryButtonClass}`);

  // determining if button needs to be disabled
  let flag = disabled;
  if (validButtons?.includes(secondaryButtonClass)) flag = false;

  return (
    <button
      className={buttonCssClasses.join(' ')}
      type={type}
      onClick={onClick}
      disabled={flag}
      test-id='button'
    >
      <span className='button-text'>{text}</span>
    </button>
  );
}

export default Button;

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  secondaryButtonClass: PropTypes.string,
  validButtons: PropTypes.array,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool
};