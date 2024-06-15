import { combineForms  } from 'react-redux-form';
const verficationFormState = {
  mobileNumber: '',
};

export const verficationForm =  combineForms({
  verficationForm: verficationFormState,
}, 'verficationForm')
