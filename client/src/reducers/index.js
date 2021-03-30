import { REFRESH_ROUTES_LIST } from '../constants/action-types';

const initialState = {
    routesList: []
};
  
function rootReducer(state = initialState, action) {
    if (action.type === REFRESH_ROUTES_LIST) {
        return Object.assign({}, state, {
            routesList: action.payload
        });
    }
    return state;
}

export default rootReducer;