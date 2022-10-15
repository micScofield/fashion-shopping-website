// import SHOP_DATA from 'data/products';
import {
  // addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from 'common/utils/firebase/firebase.utils';

const { createContext, useState, useEffect } = require('react');

export const ProductContext = createContext({
  products: null,
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  const value = { products };

  // One off thing - to add data to the db
  // useEffect(() => { addCollectionAndDocuments('categories', SHOP_DATA) }, [])

  useEffect(() => {
    const getCategories = async () => {
      const response = await getCategoriesAndDocuments();
      setProducts(response);
    };

    getCategories();
  }, []);

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
