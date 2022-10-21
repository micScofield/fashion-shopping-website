
// import { CartContext } from 'contexts/cart.context';
import {
  addItemToCart, clearItemFromCart, removeItemFromCart
} from 'app/store/slices/cart.slice';
import { useDispatch } from 'react-redux';
import 'routes/checkout/checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  // const { clearItemFromCart, addItemToCart, removeItemToCart } = useContext(CartContext);

  const dispatch = useDispatch()

  const clearItemHandler = () => dispatch(clearItemFromCart(cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartItem));
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItem));

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'> {name} </span>
      <span className='quantity'>
        <div className='arrow' onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className='price'> {price}</span>
      <div className='remove-button-wrapper' onClick={clearItemHandler}>
        <span className='remove-button'>&#10005;</span>
      </div>
    </div>
  );
};

export default CheckoutItem;
