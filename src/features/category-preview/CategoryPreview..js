import { Link } from 'react-router-dom';

import 'components/app-specific/category-preview/category-preview.styles.scss';
import Card from 'components/card/Card';

const CategoryPreview = ({ title, products }) => {
  return (
    <div className='category-preview-container'>
      <h2>
        <Link className='title' to={title}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className='preview'>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <Card key={product.id} cardDara={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
