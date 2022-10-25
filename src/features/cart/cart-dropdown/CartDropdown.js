// import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'common/components/button/Button';
import 'features/cart/cart-dropdown/cart-dropdown.styles.scss';
import CartItem from 'features/cart/cart-item/CartItem.js';
// import { CartContext } from 'contexts/cart.context';
import {
  selectCartItems,
  selectIsCartOpen,
  setIsCartOpen
} from 'app/store/slices/cart.slice';
import { useDispatch, useSelector } from 'react-redux';

const CartDropdown = () => {
  // const { cartItems, setIsCartOpen, isCartOpen } = useContext(CartContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectIsCartOpen);
  const cartItems = useSelector(selectCartItems);

  const goToCheckoutHandler = () => {
    navigate('/checkout');
    dispatch(setIsCartOpen(!isCartOpen));
  };

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.length !== 0 ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <h2>No items added yet !</h2>
        )}
      </div>
      <Button disabled={!cartItems.length} onClick={goToCheckoutHandler} text={'CHECKOUT'} />
    </div>
  );
};

export default CartDropdown;
