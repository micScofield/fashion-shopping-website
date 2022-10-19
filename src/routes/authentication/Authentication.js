import './authentication.styles.scss';
import { BUTTON_TYPE_CLASSES } from 'common/constants';
import {
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
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
import { useNavigate, use } from 'react-router-dom';

const Authentication = () => {

  const navigate = useNavigate()

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);
      navigate(-1)
    } catch(err) {
      alert(err)
    }
  };

  for (let i in signInFormButtons) {
    if (
      signInFormButtons[i].secondaryButtonClass === BUTTON_TYPE_CLASSES.google
    ) {
      signInFormButtons[i].onClick = signInWithGoogle;
    }
  }

  const onSignInSubmitHandler = async (e, payload, resetFormFields) => {
    e.preventDefault();
    const { email, password } = payload;
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
      navigate(-1)
    } catch (error) {
      console.log(error.code.split('/')[1]);
      alert('Error signing in');
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
      navigate(-1)
    } catch (error) {
      console.log(error.code.split('/')[1]);
      alert('Error signing in');
    }
  };

  // let test = {
  //   email: 'a@a.com',
  //   password: '123456'
  // }

  return (
    <div className='authentication-container'>
      <Form
        formFields={signInFormFields}
        buttons={signInFormButtons}
        buttonTypeClasses={BUTTON_TYPE_CLASSES}
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
