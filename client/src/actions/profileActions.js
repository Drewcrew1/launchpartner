import axios from 'axios';
import {CLEAR_CURRENT_PROFILE,GET_PROFILES,GET_PROFILE,GET_ERRORS,SET_CURRENT_USER} from './types';

export const getCurrentProfile = () => dispatch => {

    axios.get('/api/users/current').then((res) => {
        dispatch({
           type: GET_PROFILE,
           payload: res.data
        });
    }).catch((err) => dispatch({
        type: GET_PROFILE,
        payload: {}
    }));

}


export const createProfile = (profileData, history) => dispatch => {
    axios.post('/api/users/edit', profileData).then((res) => {
        history.push('/dashboard');
    }).catch((err) => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
}
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};




export const getProfiles = () => dispatch => {

    axios.get(`/api/users/all`).then(res => dispatch({
        type: GET_PROFILES,
        payload: res.data
    })).catch(err => dispatch({
        type: GET_ERRORS,
        payload: null
    }));

};