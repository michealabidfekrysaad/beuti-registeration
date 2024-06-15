import axios                   from 'axios';
import config                  from './config';
import store                   from './../redux/store';
import { rejesterAppToken , 
         verifyUserFailure ,
         registerUserFailure,
         validateEmailUniqunessFailure
      }  from './../redux/actions/index'

 class HTTPClient {
   
   static client = axios.create({
    baseURL: config.Idintity,
    headers: config.headers,
    responseType: 'json'
  });
 
  static client2 = axios.create({
    baseURL: config.RW,
    headers: config.headers,
    responseType: 'json'
  });
 
  static fetch(url , handlerEnabledValue , baseUrl) {
    switch (baseUrl) { 
      case 1 : 
      return HTTPClient.client.get(url , { handlerEnabled: handlerEnabledValue });
      
      case 2 :
      return HTTPClient.client2.get(url, { handlerEnabled: handlerEnabledValue });

      default : return null;

    }
    
  }

  static postFun(url, payload , handlerEnabledValue  , baseUrl) {
    switch (baseUrl) {
      case 1 : 
      return HTTPClient.client.post(url, payload , { handlerEnabled: handlerEnabledValue });

      case 2 :
      return HTTPClient.client2.post(url, payload , { handlerEnabled: handlerEnabledValue });

      default : return null;
    }

  }

   static put(url, payload , handlerEnabledValue) {
    return HTTPClient.client.put(url, payload , { handlerEnabled: handlerEnabledValue });
  }

   static delete(url , handlerEnabledValue) {
    return HTTPClient.client.delete(url ,  { handlerEnabled: handlerEnabledValue });
  }
}


// INTERCEPTOR IMPLEMENTATION
  const isHandlerEnabled = (config={}) => {
    return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ? 
      false : true
  }




// USE AXIOS INTERCEPTOR
  HTTPClient.client.interceptors.request.use(
    request => requestHandler(request),
  );

  HTTPClient.client.interceptors.response.use(
    response => successHandler(response),
    error =>    errorHandler(error)
     
  );


  HTTPClient.client2.interceptors.request.use(
    request => requestHandler(request),
  );

  HTTPClient.client2.interceptors.response.use(
    response => successHandler(response),
    error =>    errorHandler(error)
     
  );


// USE THIS FUNCTION IF YOU WANT TO MODIFY THE REQUEST  
const requestHandler = (request) => {
  // HTTPClient.client.setBaseURL(config.IbaseURL)
  if (isHandlerEnabled(request)) {
      if ( request.url.includes('Authorization/clientAuth') ) {
            request.headers['ClientId']          = 'RegistrationWizard';
            request.headers['ClientSecret']      = 'secret';
            request.headers['GrantType']         = 'client_credentials';
            request.headers['Scope']             = 'registration_wizard';
      } else {
        const state = store.getState();
        let lang = 'ar-SA'
        state.language === 'en' ? lang = 'en-US' : lang = 'ar-SA';
        const appToken = state.appToken;
              request.headers['Authorization']   = `Bearer ${appToken}`;
              request.headers['Accept-Language']   =  lang;
      }
  }
  return request
}

// REQUEST ERROR HANDLLING
  const errorHandler = (error) => {
    if (isHandlerEnabled(error.config)) {
      // Handle errors
      switch ( error.response && error.response.status ) {
        case 401 :
             handelUnauthorizedCase(error.config)
             break;
        case 422 :
            unprocessableEntity(error.response.data)
            break;
        case 400 :
            handelBadRequest(error.response.data)
        default: return null;     
        
      }
    }
    return Promise.reject({ ...error })
}

// REQUEST SUCCESS HANDLLING
  const successHandler = (response) => {
    if (isHandlerEnabled(response.config)) {
      // Handle responses
      // store.dispatch()
      }
    return response
  }


  // Request failed with status code 401 Unauthorized
  const handelUnauthorizedCase = async (config)  =>  {
    // REQUEST NEW CLIENT TOKEN (SERVICE PROVIDER SCOPE)
    await store.dispatch(rejesterAppToken());
     
  }

  // Request failed with status code 422 unprocessableEntity
  const unprocessableEntity = (error) => {
    switch ( error.error.code) {
      case 1110 :
          store.dispatch(validateEmailUniqunessFailure(error))
          break;

      case 1102 :
          store.dispatch(verifyUserFailure(error));
          break;

      case 1107 :
          store.dispatch(verifyUserFailure(error));
          break;

      case 1114 : 
        store.dispatch(validateEmailUniqunessFailure(error));
        break;

        default: return null;     
  
    }

  }


  // Request faild with status code 400 Bad Request
  const handelBadRequest = (error) => {
    switch ( error.error.code) {
      case 1101 :
          store.dispatch(registerUserFailure(error.error.message))
          break;

      default: return null;     
  
    }

  }
export default HTTPClient;