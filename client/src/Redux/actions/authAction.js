export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL'
export const LOGIN_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const LOGIN_USER_FAIL = 'REGISTER_USER_FAIL'

const BASE_URL = 'http://10.80.146.237:5000'

export const registerUser = (authData) => {
    const {fullname, email, password, typeUser} = authData

    return async dispatch => {

        // logic to make a post to create user
        const result = await fetch(`${BASE_URL}/api/user/register` ,{
            method : "POST",
            headers : {
                'Content-Type' : "application/json"
            },
            body : JSON.stringify ({
                fullname,
                email,
                password,
                typeUser
            })
        })

        const resultData = await result.json()

        if(resultData.success){
            dispatch({
                type : REGISTER_USER_SUCCESS,
                payload : resultData
            })
        }
        else {
            dispatch({
                type : REGISTER_USER_FAIL
            })
        }


        

        return resultData

    }
}

export const loginUser = (authData) => {
    const {email, password, typeUser} = authData

    return async dispatch => {

        // logic to make a post to log in the user
        const result = await fetch(`${BASE_URL}/api/user/login` ,{
            method : "POST",
            headers : {
                'Content-Type' : "application/json"
            },
            body : JSON.stringify ({
                email,
                password,
                typeUser
            })
        })

        const resultData = await result.json()

        if(resultData.success){
            dispatch({
                type : LOGIN_USER_SUCCESS,
                payload : resultData
            })
        }
        else {
            dispatch({
                type : LOGIN_USER_FAIL
            })
        }

        return resultData

    }
}