const identity = `${process.env.REACT_APP_ASSETS}`;
const registrationWizard = `${process.env.REACT_APP_DOMAIN}`;


const config =   {
    Idintity : identity,
    RW : registrationWizard ,
    headers: {
        // Headers type
        'Content-Type': 'application/json',
        'Accept-Language': 'ar-SA'
    }
}

export default config;
