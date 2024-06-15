import axios from 'axios';

export default {
    setupInterceptors: (store) => {
      // Add a response interceptor
      axios.interceptors.response.use(function (response) {
          return response;
      }, function (error) {
          //catches if the session ended!
   
          return Promise.reject(error);
      });
  
    }
  };

// const isHandlerEnabled = (config={}) => {
//     return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ? 
//       false : true
//   }


// const setupInterceptors = (store) => {
//     console.log('store from interceptor' , store)
//     axios.interceptors.request.use(
//         // console.log("interceptors")
//        response => { successHandler(response);
//          console.log('response' ,response)
//         },
//        error => {
//          console.log('error' ,error)

//            errorHandler(error)
//        }
//     );
//   };


//   const errorHandler = (error) => {
//     // Handle errors
//     if (isHandlerEnabled(error.config)) {

//         console.log('an error accured')
//      }

//       return Promise.reject({ ...error })
//   }
  
//   const successHandler = (response) => {
//     // Handle responses
//     if (isHandlerEnabled(response.config)) {
//         console.log('request was sent')
//       }

//       return response
//   }

//   export default setupInterceptors;




