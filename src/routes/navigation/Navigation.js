import React, { useContext } from 'react';
import { v4 } from 'uuid';

import { ReactComponent as Logo } from 'assets/crown.svg';
import { links } from 'data/nav-links';
import CartIcon from 'features/cart/cart-icon/CartIcon';
import CartDropdown from 'features/cart/cart-dropdown/CartDropdown';
// import { UserContext } from 'contexts/user.context';
// import { CartContext } from 'contexts/cart.context';
import { signOutUser } from 'common/utils/firebase/firebase.utils';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setCurrentUser } from 'app/store/user.slice';
import { selectIsCartOpen, setIsCartOpen } from 'app/store/cart.slice';
import NavigationBar from 'common/components/navigation-bar/NavigationBar';

function Navigation() {
  // const { currentUser, setCurrentUser } = useContext(UserContext);
  // const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  const dispatch = useDispatch()
  const currentUser = useSelector(selectUser)
  const isCartOpen = useSelector(selectIsCartOpen)

  const signOutHandler = async () => {
    await signOutUser();

    dispatch(setCurrentUser(null));
  };

  // cart
  const showCartHandler = () => dispatch(setIsCartOpen(!isCartOpen));

  // identify icons from given links data
  const icons = [];

  // Add IDs to link object
  const formattedLinks =
    links &&
    links.map((link) => {
      if (link.isIcon) {
        icons.push(link);
        if (link.text === 'Cart') {
          return {
            ...link,
            onClick: showCartHandler,
            id: v4(),
          };
        }
      }

      if (link.text === 'Sign Out')
        return {
          ...link,
          id: v4(),
          onClick: signOutHandler,
          show: currentUser ? true : false,
        };

      if (link.text === 'Sign In')
        return { ...link, id: v4(), show: currentUser ? false : true };

      return { ...link, id: v4() };
    });

  return (
    <div>
      <NavigationBar Logo={Logo} links={formattedLinks}>
        {/* In case we have icons in nav bar */}
        {icons.length !== 0 &&
          icons.map((icon) => {
            if (icon.text === 'Cart') return <CartIcon key={icon} />;
            // if (icon.text === 'Test') return <CartIcon /> // Use this space if we have more types of icons in the icons array
            else return null;
          })}

        {/* In case we want some on hover modal to show up */}
        {isCartOpen ? <CartDropdown /> : null}
      </NavigationBar>
    </div>
  );
}

export default Navigation;
