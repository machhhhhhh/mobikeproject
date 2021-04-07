import {COMFIRM_SUCCESS, COMFIRM_FAIL,MATCH_FAIL,MATCH_SUCCESS, REMOVE_FAIL,REMOVE_SUCCESS, RESULT_FAIL,RESULT_SUCCESS} from '../actions/comfirmAction'

const initialState = {
    user : {},
    errors : {}
}
export default function(state = initialState, action){

    switch(action.type){

        case COMFIRM_SUCCESS:
            return {
                ...state,
                user : action.payload
            }

        case COMFIRM_FAIL:
            return {
                ...state,
                errors : true
            }

        case MATCH_SUCCESS:
            return {
                ...state,
                user : action.payload
            }

        case MATCH_FAIL:
            return {
                ...state,
                errors : true
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
        case RESULT_FAIL : 
            return {
                ...state,
                errors : true
            }

        case RESULT_SUCCESS : 
            return {
                ...state,
                data : action.payload
            }
        
    }

    return state

}