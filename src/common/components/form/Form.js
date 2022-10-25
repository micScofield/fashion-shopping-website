import Button from 'common/components/button/Button';
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import FormInput from 'common/components/form/FormInput';
import 'common/components/form/form.styles.scss';
import { updateState } from 'common/utils/javascript/updateState';
import { checkValidity } from 'common/utils/javascript/validity';

/*
Idea of extFormData is to enable the feature where we can set form data explicitly. Thus we require a useEffect for it.
*/

function Form(props) {
  const {
    formFields,
    buttons,
    headerData,
    onSubmit,
    extFormData = {},
    validButtons,
  } = props;

  const [actionForm, setActionForm] = useState(formFields);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    let extFormFields = {};
    extFormFields = JSON.parse(JSON.stringify(actionForm));
    if (extFormData && Object.keys(extFormData).length !== 0) {
      for (let i in extFormData) {
        extFormFields[i].value = extFormData[i];
      }
      console.log("shouldn't be here if not passing the form data explicitly");
      setActionForm(extFormFields);
    }
  }, [extFormData, actionForm]);

  const onChange = (e, inputIdentifier) => {
    e.preventDefault();

    const updatedForm = updateState(actionForm, {
      [inputIdentifier]: updateState(actionForm[inputIdentifier], {
        value: e.target.value,
        touched: true,
        valid: checkValidity(
          e.target.value,
          actionForm[inputIdentifier].validation
        ),
      }),
    });

    let isFormValid = true;
    for (let key in updatedForm) {
      isFormValid = updatedForm[key].valid && isFormValid;
    }

    setActionForm(updatedForm);
    setIsFormValid(isFormValid);
  };

  const resetFormFields = () => {
    let resetForm = JSON.parse(JSON.stringify(actionForm));
    for (let i in resetForm) {
      resetForm[i].value = '';
    }

    setActionForm(resetForm);
  };

  // we receive form as an object, converting it to an array =
  let formArray = [];
  for (let i in actionForm) {
    const formElement = {
      id: i,
      config: actionForm[i],
    };
    formArray.push(formElement);
  }

  // customising on submit handler from the one we receive as prop
  const onSubmitHandler = (e, resetFormFields) => {
    let payload = {};
    for (let i in actionForm) {
      payload[i] = actionForm[i].value;
    }

    // call the handler provided to this form as prop
    onSubmit(e, payload, resetFormFields);
  };

  return (
    <div className='form-container'>
      {headerData &&
        headerData.map((element) => {
          const { text, type } = element;
          switch (type) {
            case 'h2':
              return (
                <Fragment key={text}>
                  <h2>{text}</h2>
                </Fragment>
              );
            case 'span':
              return (
                <Fragment key={text}>
                  <span>{text}</span>
                </Fragment>
              );
            default:
              return (
                <Fragment key={text}>
                  <p>{text}</p>
                </Fragment>
              );
          }
        })}
      {formArray && (
        <form onSubmit={(e) => onSubmitHandler(e, resetFormFields)}>
          {formArray.map((field) => {
            const {
              id,
              config: {
                touched,
                type,
                value,
                valid,
                placeholder,
                validation,
                htmlType,
                label,
              },
            } = field;
            return (
              <Fragment key={id}>
                <FormInput
                  htmlType={htmlType}
                  type={type}
                  touched={touched}
                  invalid={!valid}
                  id={id}
                  label={label}
                  value={value}
                  onChange={onChange}
                  placeholder={placeholder}
                  isRequired={validation?.required ? true : false}
                />
              </Fragment>
            );
          })}

          {buttons && (
            <div className='buttons-container'>
              {buttons.map((button) => {
                return (
                  <Fragment key={button.text}>
                    <Button
                      {...button}
                      disabled={!isFormValid}
                      validButtons={validButtons}
                    />
                  </Fragment>
                );
              })}
            </div>
          )}
        </form>
      )}
    </div>
  );
}

export default Form;

// const { formFields, buttons, headerData, onSubmit, extFormData = {}, buttonTypeClasses } = props;

Form.propTypes = {
  formFields: PropTypes.objectOf(PropTypes.object),
  buttons: PropTypes.arrayOf(PropTypes.object),
  headerData: PropTypes.arrayOf(PropTypes.object),
  onSubmit: PropTypes.func,
  buttonTypeClasses: PropTypes.object,
  validButtons: PropTypes.array,
};
