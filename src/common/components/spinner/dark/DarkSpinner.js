import PropTypes from 'prop-types';

import 'common/components/spinner/dark/dark-spinner.styles.scss';
import { SPINNER_SIZES } from 'common/constants';

function DarkSpinner({ size }) {
  const spinnerCssClasses = ['loader'];
  switch (size) {
    case SPINNER_SIZES.EXTRA_SMALL:
      spinnerCssClasses.push('xs');
      break;
    case SPINNER_SIZES.SMALL:
      spinnerCssClasses.push('s');
      break;
    case SPINNER_SIZES.MEDIUM:
      spinnerCssClasses.push('m');
      break;
    default:
      spinnerCssClasses.push('absolute');
  }
  return <div className={spinnerCssClasses.join(' ')}>Loading...</div>;
}

export default DarkSpinner;

DarkSpinner.propTypes = {
  size: PropTypes.string,
};
