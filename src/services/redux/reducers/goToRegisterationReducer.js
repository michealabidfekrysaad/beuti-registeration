export const RegesterationReducer = (goToRegistration = false, action) => {
    if (action.type === 'GO_REGISTERATION_SCREEN') {
         return  action.payload;
     }
         return goToRegistration;
   };