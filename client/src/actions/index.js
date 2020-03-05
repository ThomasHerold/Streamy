import { 
    SIGN_IN, 
    SIGN_OUT, 
    CREATE_STREAM, 
    SINGLE_STREAM, 
    FETCH_STREAMS, 
    EDIT_STREAM,
    DELETE_STREAM 
} from './types';

import streams from '../apis/streams';
import history from '../history';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

// Action creators for creating, deleting, updating, and fetching streams. REST conventions kept in mind here. Reminder that payloads are sent to the reducers

export const createStream = (formValues) => async (dispatch, getState) => {
    const { userId } = getState().auth; // we only want the userId from the auth state, so we are destructuring here and adding it to the form values. This is to associate user with stream
    const response =  await streams.post('/streams', { ...formValues, userId });

    dispatch({ type: CREATE_STREAM, payload: response.data });
    history.push('/'); // send user to route specified after stream is created
};

export const fetchStreams = () => async (dispatch) => {
    const response = await streams.get('/streams');

    dispatch({ type: FETCH_STREAMS, payload: response.data });
};  

export const fetchSingleStream = (id) => async (dispatch) => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({ type: SINGLE_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async (dispatch) => {
    const response = await streams.patch(`/streams/${id}`, formValues);

    dispatch({ type: EDIT_STREAM, payload: response.data });
    history.push('/');
};

export const deleteStream = (id) => async (dispatch) => {
    await streams.delete(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id });
    history.push('/');
};