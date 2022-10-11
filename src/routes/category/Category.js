import { useContext } from 'react';

import CardContainer from 'components/card-container/CardContainer';
import { ProductContext } from 'contexts/product.context';
import { CartContext } from 'contexts/cart.context';
import { useParams } from 'react-router-dom';

function Category() {
  const { products } = useContext(ProductContext);
  const { addItemToCart } = useContext(CartContext);

  // identify product category from the URL
  const { category } = useParams();

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
        products[productCategory][i]['disableImageTransition'] = false;
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

  return (
    <div>
      {res &&
        Object.keys(res).length !== 0 &&
        Object.keys(res).map((productCategory) => {
          if (productCategory === category)
            return (
              <CardContainer
                key={productCategory}
                title={productCategory}
                titlePosition='center' // optional
                cards={res[productCategory]}
                grid={true}
                large={true}
              />
            );
          else return null;
        })}
    </div>
  );
}

export default Category;
