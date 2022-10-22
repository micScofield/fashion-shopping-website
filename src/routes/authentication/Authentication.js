import 'routes/authentication/authentication.styles.scss';
import { BUTTON_TYPE_CLASSES, SPINNER_SIZES, validButtons } from 'common/constants';
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
import DarkSpinner from 'common/components/spinner/dark/DarkSpinner';

const Authentication = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [signInWithGoogle] = useSignInWithGoogleMutation();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPasswordMutation();

  const signInWithGoogleHandler = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      setIsLoading(false);
      navigate(-1);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  for (let i in signInFormButtons) {
    if (
      signInFormButtons[i].secondaryButtonClass === BUTTON_TYPE_CLASSES.google
    ) {
      signInFormButtons[i].onClick = signInWithGoogleHandler;
    }
  }

  const onSignInSubmitHandler = async (e, payload, resetFormFields) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, password } = payload;

    try {
      await signInWithEmailAndPassword({ email, password });
      resetFormFields();
      setIsLoading(false);
      navigate(-1);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const onSignUpSubmitHandler = async (e, payload, resetFormFields) => {
    e.preventDefault();
    console.log('onSignUpSubmitHandler', payload);

    const { email, password, displayName, confirmPassword } = payload;

    if (password !== confirmPassword) {
      console.log("Passwords don't match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
      navigate(-1);
    } catch (error) {
      console.log(error.code.split('/')[1]);
      alert('Error signing in');
    }
  };

  return isLoading ? (
    <DarkSpinner size='s' />
  ) : (
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
