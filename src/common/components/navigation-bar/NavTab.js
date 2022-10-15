import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function NavTab({ navTab, children }) {
  const { route, text, onClick, isIcon } = navTab;

  if (isIcon)
    return (
      <Link className='nav-link' onClick={onClick}>
        {children[0]}
      </Link>
    );

  if (text === 'Sign Out')
    return (
      <Link className='nav-link' onClick={onClick}>
        {text}
      </Link>
    );

  return (
    <Link className='nav-link' to={`${route}`}>
      {text}
    </Link>
  );
}

NavTab.propTypes = {
  navTab: PropTypes.shape({
    route: PropTypes.string,
    text: PropTypes.string,
  }),
  children: PropTypes.array
};

export default NavTab;
