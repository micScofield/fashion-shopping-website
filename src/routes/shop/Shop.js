import { useContext } from 'react';

import CardContainer from 'components/card-container/CardContainer';
import { ProductContext } from 'contexts/product.context';
import { CartContext } from 'contexts/cart.context';
import { useNavigate } from 'react-router-dom';

function Shop() {
  const { products } = useContext(ProductContext);
  const { addItemToCart } = useContext(CartContext);
  const navigate = useNavigate()

  const onOverlayClickHandler = (e, payload) => {
    const { id, imageUrl, name, price } = payload;
    addItemToCart({ id, imageUrl, name, price });
  };

  const formattedProducts =
    products &&
    Object.keys(products).map((productCategory) => {
      let res = {};
      for (let i = 0; i < products[productCategory].length; i++) {
        products[productCategory][i]['footer'] = {
          value1: products[productCategory][i].name,
          value2: `$${products[productCategory][i].price}`,
        };
        products[productCategory][i]['overlay'] = ['Add to Cart'];
        products[productCategory][i]['onOverlayClick'] = onOverlayClickHandler;
        products[productCategory][i]['overlayPosition'] = 'bottom';
        products[productCategory][i]['showOverlayByDefault'] = false;
        products[productCategory][i]['disableImageTransition'] = true;
      }
      res[productCategory] = products[productCategory];
      return res;
    });

  const res =
    formattedProducts &&
    formattedProducts.reduce((acc, product) => {
      for (let i in product) acc[i] = product[i];
      return acc;
    }, {});

    const onTitleClickHandler = (route) => navigate(`/shop/${route}`)

  return (
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
