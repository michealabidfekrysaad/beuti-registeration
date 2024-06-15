import { combineForms  } from 'react-redux-form';
const initialregistrationFormState = {
  centerName: '',
  mobile: '',
  password: ''
};

export const registrationForm =  combineForms({
  registrationForm: initialregistrationFormState,
}, 'registrationForm')
