export const LoaderReducer = (load = false, action) => {
    if (action.type === 'LOADER_PENDING') {
         return true;
     }
     if (action.type === 'LOADER_REJECTED') {
        return false;
    }
    if (action.type === 'LOADER_RESLOVED') {
        return false;
    }
         return load;
   };
 
 
   