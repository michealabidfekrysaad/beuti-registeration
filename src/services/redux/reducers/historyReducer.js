

export const getHistory = ( history = null , action) => {
    if ( action.type === 'GET_HISTORY') {
        return action.history
    }
    return history
};
