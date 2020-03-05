import _ from 'lodash';
import { 
    EDIT_STREAM, 
    SINGLE_STREAM, 
    FETCH_STREAMS, 
    DELETE_STREAM, 
    CREATE_STREAM 
} from '../actions/types';

export default (state = {}, action) => {
    switch(action.type) {
        case EDIT_STREAM:
            // const newStream = {...state};
            // newStream[action.payload.id] = action.payload;
            // return newStream;

            return { ...state, [action.payload.id]: action.payload }; // This is Key Interpolation. This is identical to the commented lines above. Takes some id that we don't know yet and replaces the contents with the payload 
        case SINGLE_STREAM:
            return { ...state, [action.payload.id]: action.payload }; // Think of it like making a new key: value pair. Makes the Id the new key
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            return _.omit(state, action.payload); // omit creates a new object, spread operator not necessary here
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id') } // mapKeys takes array and converts to a new object. We are pulling id and telling it to use it as the main key to store the payload values
        default:
            return state
    }
    
};