export const localizationReducer = ( localization = null , action) => {
    if (action.type === 'LOAD_LOCALIZATION') {
       return action.localization
     }
   return localization;
};