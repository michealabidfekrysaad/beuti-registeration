import  LocalStorageService  from './../../storage/LocalStorageService';
export const defaultLanguageReducer = (lang = 'en', action) => {
    if (action.type === 'SET_DEFAULT_LANGUAGE') {
         if ( !LocalStorageService.getLanguage() ) {
            LocalStorageService.setLanguage(lang);
            return lang
         } 
     }
         return lang;
   };