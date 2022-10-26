import { ALERT_TYPES } from 'common/constants';
import React from 'react';

import 'common/components/alert/alert.styles.scss'

function Alert({ msg, type }) {
  const alertCssClasses = ['alert'];

  switch (type) {
    case ALERT_TYPES.SUCCESS:
      alertCssClasses.push('success');
      break;
    case ALERT_TYPES.ERROR:
      alertCssClasses.push('error');
      break;
    case ALERT_TYPES.WARNING:
      alertCssClasses.push('warning');
      break;
    default:
      break;
  }
  return <div className={alertCssClasses.join(' ')}>{msg}</div>;
}

export default Alert;
