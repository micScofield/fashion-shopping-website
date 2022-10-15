import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import 'common/components/navigation-bar/navigation.styles.scss';
import NavTab from 'common/components/navigation-bar/NavTab';

// supports only one on hover modal 

function NavigationBar({ Logo, links, children }) {
  return (
    <div className='navigation'>
      {Logo && (
        <Link className='logo-container' to='/'>
          <Logo />
        </Link>
      )}

      <div className='nav-links-container'>
        {links.length !== 0 &&
          links.map((link) => {
            if (link.show) {
              return (
                <Fragment key={link.id}>
                  <NavTab navTab={link}>
                    {children}
                  </NavTab>
                </Fragment>
              );
            } else return null;
          })}
      </div>

      {/* Meant to be a conditional modal. Only one supported */}
      { children && children.length !== 0 && children[children.length-1] } 
    </div>
  );
}

NavigationBar.propTypes = {
  Logo: PropTypes.any,
  links: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.array
};

export default NavigationBar;
