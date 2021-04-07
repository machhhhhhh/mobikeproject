import {SEND_FAIL, SEND_SUCCESS, CONFIRM_FAIL, CONFIRM_SUCCESS, REMOVE_SUCCESS,REMOVE_FAIL} from '../actions/detailAction'

const initialState = {
    data : {},
    errors : {}
}

export default function(state = initialState, action){

    switch(action.type) {

        case SEND_SUCCESS : 
            return {
                ...state,
                data : action.payload
            }

        case SEND_FAIL :
            return {
                ...state,
                errors : true
            }

        case CONFIRM_FAIL : 
            return {
                ...state,
                errors : true
            }

        case CONFIRM_SUCCESS : 
            return {
                ...state,
                data : action.payload
            }

        case REMOVE_FAIL : 
            return {
                ...state,
                errors : true
            }

        case REMOVE_SUCCESS : 
            return {
                ...state,
                data : action.payload
            }
    }

    return state

}