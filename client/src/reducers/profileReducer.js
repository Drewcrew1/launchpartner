import {GET_PROFILE,GET_PROFILES} from '../actions/types';
const initState = {
    profile: null,
    profiles: null,
    loading: false
};

export default function(state = initState,action){
switch (action.type){

    case GET_PROFILE:
        return {
            ...state,
            profile: action.payload,
            loading: false
        };
    case GET_PROFILES:
        return {
            ...state,
            profiles: action.payload,
            loading: false
        };
    default:
        return state;
}
}