import { Fragment } from 'react';

import { categories } from 'data/categories';
import CardContainer from 'common/components/card-container/CardContainer';

const Home = () => {
  for (let i = 0; i < categories?.length; i++) {
    categories[i].overlay = [categories[i].title, categories[i].subText];
    categories[i].overlayPosition = 'middle'; // default
    categories[i].showOverlayByDefault = true;
  }

  return (
    <Fragment>
      {categories && categories.length !== 0 && (
        <CardContainer cards={categories} />
      )}
    </Fragment>
  );
};

export default Home;
