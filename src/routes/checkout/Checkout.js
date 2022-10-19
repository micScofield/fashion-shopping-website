// import { CartContext } from 'contexts/cart.context';
import { selectCartItems, selectCartTotal, setCartTotal } from 'app/store/cart.slice';
import { useSelector } from 'react-redux';
import CheckoutItem from 'routes/checkout/CheckoutItem';
import './checkout.styles.scss';

const Checkout = () => {
  // const { cartItems, cartTotal } = useContext(CartContext);
  const cartTotal = useSelector(selectCartTotal)
  const cartItems = useSelector(selectCartItems)

  console.log(cartTotal, cartItems)
  return (
    <div className='checkout-container-wrapper'>
      <div className='checkout-container'>
        <div className='checkout-header'>
          <div className='header-block'>
            <span>Product</span>
          </div>
          <div className='header-block'>
            <span>Description</span>
          </div>
          <div className='header-block'>
            <span>Quantity</span>
          </div>
          <div className='header-block'>
            <span>Price</span>
          </div>
          <div className='header-block'>
            <span>Remove</span>
          </div>
        </div>
        {/* <hr /> */}
        {cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))}
        <div className='total'>TOTAL: ${cartTotal}</div>
      </div>
    </div>
  );
};

export default Checkout;
