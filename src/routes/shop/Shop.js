import { useContext, useEffect } from 'react';

// import { ProductContext } from 'contexts/product.context';
// import { CartContext } from 'contexts/cart.context';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, setProducts } from 'app/store/product.slice';
import { addItemToCart } from 'app/store/cart.slice';
import { getCategoriesAndDocuments } from 'common/utils/firebase/firebase.utils';
import CardContainer from 'common/components/card-container/CardContainer';

function Shop() {
  // const { products } = useContext(ProductContext);
  // const { addItemToCart } = useContext(CartContext);

  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  let productsCopy = JSON.parse(JSON.stringify(products));
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      const response = await getCategoriesAndDocuments();
      dispatch(setProducts(response));
    };

    getCategories();
  }, []);

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
