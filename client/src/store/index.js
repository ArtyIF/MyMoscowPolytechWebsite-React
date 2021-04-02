import { configureStore, getDefaultMiddleware, createAction, createReducer } from '@reduxjs/toolkit';

export const refreshRoutesList = createAction('REFRESH_ROUTES_LIST');

const middleware = [
    ...getDefaultMiddleware()
];

const initialState = {
    routesList: []
};

const rootReducer = createReducer(initialState, {
    [refreshRoutesList]: (state, action) => {
        state.routesList = action.payload;
    }
});

const store = configureStore({
    reducer: {
        root: rootReducer
    },
    middleware
});

export default store;