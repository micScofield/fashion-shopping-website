import 'routes/authentication/authentication.styles.scss';
import {
  BUTTON_TYPE_CLASSES,
  SPINNER_SIZES,
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
import DarkSpinner from 'common/components/spinner/dark/DarkSpinner';

const Authentication = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [signInWithGoogle] = useSignInWithGoogleMutation();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPasswordMutation();

  const signInWithGoogleHandler = async () => {
    setIsLoading(true);
    try {
      const {data, error} = await signInWithGoogle();
      setIsLoading(false);

      if (!error) {
        navigate(-1);
      } else {
        console.log(error)
      }
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
      const { data, error } = await signInWithEmailAndPassword({ email, password });
      setIsLoading(false);

      console.log({data, error})

      if (!error) {
        resetFormFields();
        console.log('Navigating from try')
        navigate(-1);
      } else {
        console.log({error})
      }
    } catch (err) {
      setIsLoading(false);
      console.log({err})
    }
  };

  const onSignUpSubmitHandler = async (e, payload, resetFormFields) => {
    e.preventDefault();

    const { email, password, displayName, confirmPassword } = payload;

    if (password !== confirmPassword) {
      console.log("Passwords don't match");
      return;
    }
    setIsLoading(true);
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      setIsLoading(false);
      resetFormFields();
      navigate(-1);
    } catch (error) {
      setIsLoading(false);
      console.log(error.code.split('/')[1]);
      // alert('Error signing in: ', error.code?.split('/')[1]);
    }
  };

  return isLoading ? (
    <DarkSpinner />
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
