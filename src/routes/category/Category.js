// import { ProductContext } from 'contexts/product.context';
// import { CartContext } from 'contexts/cart.context';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts } from 'app/store/product.slice';
import CardContainer from 'common/components/card-container/CardContainer';
import { addItemToCart } from 'app/store/cart.slice';

function Category() {
  // const { products } = useContext(ProductContext);
  // const { addItemToCart } = useContext(CartContext);

  // identify product category from the URL
  const { category } = useParams();

  // const { products } = useContext(ProductContext);
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  let productsCopy = JSON.parse(JSON.stringify(products));

  const onOverlayClickHandler = (e, payload) => {
    const { id, imageUrl, name, price } = payload;
    dispatch(addItemToCart({ id, imageUrl, name, price }));
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
        productsCopy[productCategory][i]['overlay'] = ['Add to Cart'];
        productsCopy[productCategory][i]['onOverlayClick'] =
          onOverlayClickHandler;
        productsCopy[productCategory][i]['overlayPosition'] = 'bottom';
        productsCopy[productCategory][i]['showOverlayByDefault'] = false;
        productsCopy[productCategory][i]['disableImageTransition'] = false;
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
