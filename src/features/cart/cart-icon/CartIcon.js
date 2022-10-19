import { useEffect } from 'react';

import { ReactComponent as ShoppingIcon } from 'assets/shopping-bag.svg';
// import { CartContext } from 'contexts/cart.context';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount, selectCartItems, selectIsCartOpen, setCartCount, setIsCartOpen } from 'app/store/cart.slice';

const CartIcon = () => {
  // const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const dispatch = useDispatch()
  const isCartOpen = useSelector(selectIsCartOpen)
  const cartCount = useSelector(selectCartCount)

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <div className='cart-icon-container' onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count-container'>
        <span className='item-count'>{cartCount}</span>
      </span>
    </div>
  );
};

export default CartIcon;
