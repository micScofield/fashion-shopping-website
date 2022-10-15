import React from 'react';

import PropTypes from 'prop-types'

import 'components/button/button.styles.scss';

function Button(props) {
  const { type, onClick, secondaryButtonClass, children } = props;
  return (
    <button
      className={`button ${secondaryButtonClass ? secondaryButtonClass : ''}`}
      type={type}
      onClick={onClick}
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
