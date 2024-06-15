// import  LocalStorageService  from './../../storage/LocalStorageService';
export const languageReducer = (lang = 'en', action) => {
   if (action.type === 'CHANGE_LANGUAGE') {
        lang =  lang === 'en' ? 'ar' : 'en';
        // LocalStorageService.setLanguage(lang);
        return lang;
    }
        return lang;
  };


  