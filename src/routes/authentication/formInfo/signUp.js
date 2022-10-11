export let signUpFormHeaderData = [
  {
    type: 'h2',
    text: "Don't have an account?",
  },
  {
    type: 'span',
    text: 'Sign up with your email and password',
  },
];

export let signUpFormButtons = [
  {
    type: 'submit',
    text: 'Sign Up',
  },
];

export let signUpFormFields = {
  displayName: {
    type: 'text',
    htmlType: 'input',
    placeholder: 'Display Name',
    value: '',
    label: 'Display Name',
  },
  email: {
    type: 'email',
    htmlType: 'input',
    placeholder: 'Email',
    value: '',
    validation: {
      required: true,
      isEmail: true,
    },
    label: 'Email',
    valid: false,
    touched: false,
  },
  password: {
    type: 'password',
    htmlType: 'input',
    placeholder: 'Password',
    validation: {
      required: true,
      minLength: 6,
    },
    value: '',
    label: 'Password',
    valid: false,
    touched: false,
  },
  confirmPassword: {
    type: 'password',
    htmlType: 'input',
    placeholder: 'Confirm Password',
    validation: {
      required: true,
      minLength: 6,
    },
    value: '',
    label: 'Confirm Password',
    valid: false,
    touched: false,
  },
};
