import React from 'react';

import PropTypes from 'prop-types'
import 'common/components/form/form-input.styles.scss';

function FormInput({
  id,
  type,
  invalid=false,
  touched=false,
  value,
  onChange,
  label,
}) {
  return (
    <div className='group'>
      <input
        type={type ? type : 'text'}
        value={value}
        onChange={(e) => onChange(e, id)}
        className={`form-input ${invalid && touched ? 'invalid' : ''}`}
      />
      {label && <label className={`form-input-label ${value ? 'shrink' : ''}`}>{label}</label>}
    </div>
  );
}

export default FormInput;

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  invalid: PropTypes.bool,
  touched: PropTypes.bool,
  type: PropTypes.oneOf(['email', 'password', 'search', 'text', 'tel', 'url', 'number', 'range', 'datetime-local', 'month', 'time', 'week', 'date', 'color']),
  label: PropTypes.string,
  placeholder: PropTypes.string
};
