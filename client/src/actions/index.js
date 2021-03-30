import { REFRESH_ROUTES_LIST } from '../constants/action-types';

export function refreshRoutesList(payload) {
    return { type: REFRESH_ROUTES_LIST, payload };
}