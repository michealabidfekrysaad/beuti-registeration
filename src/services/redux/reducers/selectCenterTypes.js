import { SET_CENTER_TYPE  }   from './../actions/types';

// const initialState = {
// }

export const selectCenterTypesReducer = ( centerTypes = [] , action) => {
  // switch(action.type) {
  //   case SET_CENTER_TYPE:
  //     return action.payload;

  //   default:
  //     return initialState;
  // };

  if (action.type === SET_CENTER_TYPE  ) {
    return action.payload;
  }
  return centerTypes;
};
 