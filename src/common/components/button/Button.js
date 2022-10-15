import React from 'react';

import PropTypes from 'prop-types'

import 'common/components/button/button.styles.scss';

function Button(props) {
  const { type, onClick, secondaryButtonClass, disabled, children } = props;
  return (
    <button
      className={`button ${secondaryButtonClass ? secondaryButtonClass : ''}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
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
  secondaryButtonClass: PropTypes.string
}
