import { Fragment } from 'react';

import { categories } from 'data/categories';
import CardContainer from 'common/components/card-container/CardContainer';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate()

  const onOverlayClickHandler = (e, payload) => {
    navigate(`/shop${payload.urlRedirect}`)
  }

  for (let i = 0; i < categories?.length; i++) {
    categories[i].overlay = [categories[i].title, categories[i].subText];
    categories[i].onOverlayClick = onOverlayClickHandler;
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
