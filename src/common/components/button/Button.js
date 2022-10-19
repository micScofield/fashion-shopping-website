import React from 'react';

import PropTypes from 'prop-types'

import 'common/components/button/button.styles.scss';

function Button(props) {
  const { type, onClick, secondaryButtonClass, disabled, children, validButtons } = props;

  // determining if button needs to be disabled
  let flag = disabled
  if (validButtons?.includes(secondaryButtonClass)) flag = false

  return (
    <button
      className={`button ${secondaryButtonClass ? secondaryButtonClass : ''}`}
      type={type}
      onClick={onClick}
      disabled={flag}
    >
      {children}
    </button>
  );
}

export default Button;

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
  secondaryButtonClass: PropTypes.string,
  validButtons: PropTypes.array
}
