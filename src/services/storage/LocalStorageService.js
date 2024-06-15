import { access_token , 
         refresh_token  ,
         active_language      
} from './../../constants/constants';


const LocalStorageService = ( () => {
    var _service;


    function _getService() {
        if(!_service) {
          _service = this;
          return _service;
      }
      return _service;
    }


    function _setToken(tokenObj) {
      localStorage.setItem(access_token, tokenObj.access_token);
       // if we have refresh token
      //  localStorage.setItem('refresh_token', tokenObj.refresh_token);
    }


    function _getAccessToken() {
      return localStorage.getItem(access_token);
    }

    function _getRefreshToken() {
      return localStorage.getItem(refresh_token);
    }

    function _clearToken() {
      localStorage.removeItem(access_token);
      localStorage.removeItem(refresh_token);
    }

    function _setLanguage(lang) {
      localStorage.setItem(active_language , lang);
    }

    function _getLanguage() {
      return localStorage.getItem(active_language);
    }

   return {
      getService : _getService,
      setToken : _setToken,
      getAccessToken : _getAccessToken,
      getRefreshToken : _getRefreshToken,
      clearToken : _clearToken,
      getLanguage: _getLanguage,
      setLanguage: _setLanguage
    }

   })();

   
   export default LocalStorageService;