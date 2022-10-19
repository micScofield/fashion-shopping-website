import { useEffect, useState } from 'react';

// import { ProductContext } from 'contexts/product.context';
// import { CartContext } from 'contexts/cart.context';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, setProducts } from 'app/store/product.slice';
import { addItemToCart } from 'app/store/cart.slice';
import CardContainer from 'common/components/card-container/CardContainer';
import { useGetProductsQuery } from 'app/store/api/product.api';

const overlayTextValues = {
  ADD_TO_CART: 'Add to Cart',
  GO_TO_BAG: 'Go to Bag &#x2192'
}

function Shop() {
  // const { products } = useContext(ProductContext);
  // const { addItemToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: products,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductsQuery();

  products && dispatch(setProducts(products));

  const [overlayText, setOverlayText] = useState('Add to Cart')
  const [isCardActive, setIsCardActive] = useState('Add to Cart')

  let productsCopy =
    !isLoading && isSuccess && products && JSON.parse(JSON.stringify(products));

  const onOverlayClickHandler = (e, payload) => {
    const { id, imageUrl, name, price } = payload;
    setOverlayText(overlayTextValues.GO_TO_BAG)

    if (overlayText === overlayTextValues.ADD_TO_CART) {
      dispatch(addItemToCart({ id, imageUrl, name, price }));
    } else {
      navigate('/checkout');
    }
  };

  const formattedProducts =
    productsCopy &&
    Object.keys(productsCopy).map((productCategory) => {
      let res = {};
      for (let i = 0; i < productsCopy[productCategory].length; i++) {
        productsCopy[productCategory][i]['footer'] = {
          value1: productsCopy[productCategory][i].name,
          value2: `$${productsCopy[productCategory][i].price}`,
        };
        productsCopy[productCategory][i]['overlay'] = [overlayText];
        productsCopy[productCategory][i]['onOverlayClick'] = onOverlayClickHandler;
        productsCopy[productCategory][i]['overlayPosition'] = 'bottom';
        productsCopy[productCategory][i]['showOverlayByDefault'] = false;
        productsCopy[productCategory][i]['disableImageTransition'] = true;
      }
      res[productCategory] = productsCopy[productCategory];
      return res;
    });

  const res =
    formattedProducts &&
    formattedProducts.reduce((acc, product) => {
      for (let i in product) acc[i] = product[i];
      return acc;
    }, {});

  const onTitleClickHandler = (route) => navigate(`/shop/${route}`);

  isError && alert('Something went wrong !!!');

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      {/* On the shop landing page, we want limited products to list, hence slicing the products array */}
      {res &&
        Object.keys(res).length !== 0 &&
        Object.keys(res).map((productCategory) => (
          <CardContainer
            key={productCategory}
            title={productCategory}
            titlePosition='left'
            onTitleClick={() => onTitleClickHandler(productCategory)}
            cards={res[productCategory].slice(0, 4)}
            grid={true}
            large={true}
          />
        ))}
    </div>
  );
}

export default Shop;
