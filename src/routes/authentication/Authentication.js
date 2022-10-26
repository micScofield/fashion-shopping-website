import 'routes/authentication/authentication.styles.scss';
import {
  ALERT_TYPES,
  BUTTON_TYPE_CLASSES,
  signInButtonTexts,
  validButtons,
} from 'common/constants';

import {
  signInFormButtons,
  signInFormHeaderData,
  signInFormFields,
} from 'routes/authentication/formInfo/signIn';
import {
  signUpFormButtons,
  signUpFormFields,
  signUpFormHeaderData,
} from 'routes/authentication/formInfo/signUp';
import Form from 'common/components/form/Form';
import { useNavigate } from 'react-router-dom';
import {
  useSignInWithEmailAndPasswordMutation,
  useSignInWithGoogleMutation,
  useSignUpWithEmailAndPasswordMutation,
} from 'app/store/services/user.api';
import { Fragment, useState } from 'react';
import {
  selectAlertMsg,
  selectAlertType,
  setAlert,
} from 'app/store/slices/alert.slice';
import { useDispatch, useSelector } from 'react-redux';
import { formatAlertMessage } from 'common/utils/javascript/formatAlertMessage';
import Alert from 'common/components/alert/Alert';

const Authentication = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signInButtonLoader, setSignInButtonLoader] = useState(false);
  const [signInWithGoogleButtonLoader, setSignInWithGoogleButtonLoader] =
    useState(false);
  const [signUpButtonLoader, setSignUpButtonLoader] = useState(false);

  const [signInWithGoogle] = useSignInWithGoogleMutation();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPasswordMutation();
  const [signUpWithEmailAndPassword] = useSignUpWithEmailAndPasswordMutation();

  // Alert selector
  const alertMsg = useSelector(selectAlertMsg);
  const alertType = useSelector(selectAlertType);

  // sign in with google handler
  const signInWithGoogleHandler = async () => {
    setSignInWithGoogleButtonLoader(true);
    try {
      const { data, error } = await signInWithGoogle();
      setSignInWithGoogleButtonLoader(false);
      if (!error) {
        navigate(-1);
      } else {
        console.log(error);
      }
    } catch (err) {
      setSignInWithGoogleButtonLoader(false);
      console.log(err);
    }
  };

  // setting additional props/info on sign in form buttons
  for (let i in signInFormButtons) {
    if (signInFormButtons[i].text === signInButtonTexts.SIGN_IN) {
      signInFormButtons[i].isLoading = signInButtonLoader;
    }
    if (
      signInFormButtons[i].secondaryButtonClass === BUTTON_TYPE_CLASSES.google
    ) {
      signInFormButtons[i].onClick = signInWithGoogleHandler;
      signInFormButtons[i].isLoading = signInWithGoogleButtonLoader;
    }
  }

  // setting additional props/info on sign up form buttons
  for (let i in signUpFormButtons) {
    if (signUpFormButtons[i].text === signInButtonTexts.SIGN_UP) {
      signUpFormButtons[i].isLoading = signUpButtonLoader;
    }
  }

  // sign in with email handler
  const onSignInSubmitHandler = async (e, payload, resetFormFields) => {
    e.preventDefault();
    setSignInButtonLoader(true);
    const { email, password } = payload;

    try {
      const { data, error } = await signInWithEmailAndPassword({
        email,
        password,
      });

      setSignInButtonLoader(false);
      if (!error) {
        resetFormFields();
        navigate(-1);
      } else {
        dispatch(
          setAlert({ msg: formatAlertMessage(error), type: ALERT_TYPES.ERROR })
        );
        console.log({ error });
      }
    } catch (err) {
      setSignInButtonLoader(false);
      console.log({ err });
    }
  };

  // sign up handler
  const onSignUpSubmitHandler = async (e, payload, resetFormFields) => {
    e.preventDefault();

    const {
      signUpEmail,
      signUpPassword,
      signUpDisplayName,
      signUpConfirmPassword,
    } = payload;

    if (signUpPassword !== signUpConfirmPassword) {
      console.log("Passwords don't match");
      // alert
      return;
    }

    setSignUpButtonLoader(true);

    console.log({
      signUpEmail,
      signUpPassword,
      signUpDisplayName,
      signUpConfirmPassword,
    });

    try {
      // redux call expects payload to say email, password and displayName
      const { data, error } = await signUpWithEmailAndPassword({
        email: signUpEmail,
        password: signUpPassword,
        displayName: signUpDisplayName,
      });

      setSignUpButtonLoader(false);

      if (!error) {
        resetFormFields();
        navigate(-1);
      } else {
        console.log({ error });
      }
    } catch (error) {
      setSignUpButtonLoader(false);

      console.log(error.code.split('/')[1]);
    }
  };

  return (
    <Fragment>
      {alertMsg && <Alert msg={alertMsg} type={alertType} />}
      <div className='authentication-container'>
        <Form
          formFields={signInFormFields}
          buttons={signInFormButtons}
          buttonTypeClasses={BUTTON_TYPE_CLASSES}
          validButtons={validButtons}
          headerData={signInFormHeaderData}
          onSubmit={onSignInSubmitHandler}
          // extFormData = {{...formData}}
        />

        <Form
          formFields={signUpFormFields}
          buttons={signUpFormButtons}
          buttonTypeClasses={BUTTON_TYPE_CLASSES}
          headerData={signUpFormHeaderData}
          onSubmit={onSignUpSubmitHandler}
          // extFormData = {{...formData}}
        />
      </div>
    </Fragment>
  );
};

export default Authentication;
