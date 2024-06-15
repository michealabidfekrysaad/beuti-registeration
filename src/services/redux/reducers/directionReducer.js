export const directionReducer = (dir = 'ltr', action) => {
     if (action.type === 'CHANGE_LANGUAGE') {
        return dir === 'ltr' ? 'rtl' : 'ltr';
      }
    return dir;
};