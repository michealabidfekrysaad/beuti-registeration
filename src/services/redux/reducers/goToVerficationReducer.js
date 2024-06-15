export const VervicationReducer = (goToVervication = false, action) => {
  if (action.type === 'GO_VERFICATION_SCREEN') {
       return  action.payload;
   }
       return goToVervication;
 };