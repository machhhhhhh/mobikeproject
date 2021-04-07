import {RESULT_FAIL,RESULT_SUCCESS, REMOVE_FAIL,REMOVE_SUCCESS} from '../actions/resultAction'

const initialState = {
    data : {},
    errors : {}
}
export default function(state = initialState, action){

    switch(action.type) {

        case RESULT_SUCCESS : 
            return {
                ...state,
                data : action.payload
            }

        case RESULT_FAIL :
            return {
                ...state,
                errors : true
            }
        case REMOVE_SUCCESS : 
            return {
                ...state,
                data : action.payload
            }

        case REMOVE_FAIL :
            return {
                ...state,
                errors : true
            }

        
    }

    return state

}