import { configureStore, getDefaultMiddleware, createAction, createReducer } from '@reduxjs/toolkit';

export const refreshRoutesList = createAction('REFRESH_ROUTES_LIST');
export const addOrUpdateHumannameCache = createAction('ADD_OR_UPDATE_HUMANNAME_CACHE');

const middleware = [
    ...getDefaultMiddleware()
];

const initialState = {
    routesList: [],
    humannameCache: {}
};

const rootReducer = createReducer(initialState, {
    [refreshRoutesList]: (state, action) => {
        state.routesList = action.payload;
    },
    [addOrUpdateHumannameCache]: (state, action) => {
        state.humannameCache[action.payload.cachePath] = action.payload.cacheValue;
    }
});

const store = configureStore({
    reducer: {
        root: rootReducer
    },
    middleware
});

export default store;