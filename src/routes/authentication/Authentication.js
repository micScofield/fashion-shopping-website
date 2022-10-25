import 'routes/authentication/authentication.styles.scss';
import {
  BUTTON_TYPE_CLASSES,
  signInButtonTexts,
  validButtons,
} from 'common/constants';
import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from 'common/utils/firebase/firebase.utils';

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
} from 'app/store/services/user.api';
import { useState } from 'react';

const Authentication = () => {
  const navigate = useNavigate();
  const [signInButtonLoader, setSignInButtonLoader] = useState(false);
  const [signInWithGoogleButtonLoader, setSignInWithGoogleButtonLoader] =
    useState(false);
  const [signUpButtonLoader, setSignUpButtonLoader] = useState(false);

  const [signInWithGoogle] = useSignInWithGoogleMutation();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPasswordMutation();

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

  const onSignInSubmitHandler = async (e, payload, resetFormFields) => {
    e.preventDefault();
    setSignInButtonLoader(true);
    const { email, password } = payload;

    try {
      const { data, error } = await signInWithEmailAndPassword({
        email,
        password,
      });

      if (!error) {
        resetFormFields();
        navigate(-1);
      } else {
        console.log({ error });
      }
    } catch (err) {
      console.log({ err });
    }
  };

  const onSignUpSubmitHandler = async (e, payload, resetFormFields) => {
    e.preventDefault();

    const { email, password, displayName, confirmPassword } = payload;

    if (password !== confirmPassword) {
      console.log("Passwords don't match");
      return;
    }

    setSignUpButtonLoader(true);

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      setSignUpButtonLoader(false);
      resetFormFields();
      navigate(-1);
    } catch (error) {
      setSignUpButtonLoader(false);
      console.log(error.code.split('/')[1]);
    }
  };

  return (
    <div className='authentication-container'>
      <Form
        formFields={signInFormFields}
        buttons={signInFormButtons}
        buttonTypeClasses={BUTTON_TYPE_CLASSES}
        validButtons={validButtons}
        headerData={signInFormHeaderData}
        onSubmit={onSignInSubmitHandler}
        // extFormData = {test}
      />

      <Form
        formFields={signUpFormFields}
        buttons={signUpFormButtons}
        buttonTypeClasses={BUTTON_TYPE_CLASSES}
        headerData={signUpFormHeaderData}
        onSubmit={onSignUpSubmitHandler}
        // extFormData = {test}
      />
    </div>
  );
};

export default Authentication;
