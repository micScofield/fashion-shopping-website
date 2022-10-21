import { useState } from 'react';

// import { ProductContext } from 'contexts/product.context';
// import { CartContext } from 'contexts/cart.context';
import { addItemToCart } from 'app/store/slices/cart.slice';
import { selectProducts, setProducts } from 'app/store/slices/product.slice';
import CardContainer from 'common/components/card-container/CardContainer';
import { overlayTextValues } from 'data/overlayTextValues';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from 'app/store/services/product.api';

function Shop() {
  // const { products } = useContext(ProductContext);
  // const { addItemToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // fetching products here so that both Shop and Category screens can make use of it using redux
  const { data: products } = useGetProductsQuery();

  products && dispatch(setProducts(products));

  const [activeCard, setActiveCard] = useState(null);

  let productsCopy = products && JSON.parse(JSON.stringify(products));

  const onOverlayClickHandler = (e, payload) => {
    // If user added to cart, check current text ie. add to cart and click handler should add the item otherwise redirect to bag/checkout
    const {
      cardData: { id, imageUrl, name, price },
      currentText,
    } = payload;
    setActiveCard(id);

    if (currentText === overlayTextValues.ADD_TO_CART) {
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
        if (productsCopy[productCategory][i].id !== activeCard) {
          productsCopy[productCategory][i]['overlay'] = [
            overlayTextValues.ADD_TO_CART,
          ];
        } else {
          productsCopy[productCategory][i]['overlay'] = [
            overlayTextValues.GO_TO_BAG,
          ];
        }
        productsCopy[productCategory][i]['onOverlayClick'] =
          onOverlayClickHandler;
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

  return !products ? (
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
