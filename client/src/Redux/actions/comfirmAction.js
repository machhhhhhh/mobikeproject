

export const COMFIRM_SUCCESS = 'COMFIRM_SUCCESS'
export const COMFIRM_FAIL = 'COMFIRM_FAIL'
export const MATCH_FAIL = 'MATCH_FAIL'
export const MATCH_SUCCESS = 'MATCH_SUCCESS'
export const REMOVE_FAIL ='REMOVE_FAIL'
export const REMOVE_SUCCESS = 'REMOVE_SUCCESS'
export const RESULT_SUCCESS = "RESULT_SUCCESS"
export const RESULT_FAIL ="RESULT_FAIL"


const BASE_URL = 'http://10.80.146.237:5000'
export const sendDetail = (detailData) => {
    const { arrive, problem,  brand, note, userToken, shopToken} = detailData

    return async dispatch => {

        // logic to make a post detail
        const result = await fetch(`${BASE_URL}/confirm` ,{
            method : "POST",
            headers : {
                'Content-Type' : "application/json"
            },
            body : JSON.stringify ({
                arrive,
                problem,
                brand,
                note,
                userToken,
                shopToken
            })
        })

        const resultData = await result.json()

        
        if(resultData.success){
            dispatch({
                type : COMFIRM_SUCCESS,
                payload : resultData
            })
        }
        else {
            dispatch({
                type : CONFIRM_FAIL
            })
        }

        return resultData
    }


}
export const resultDetail =(detailData) => {
    const { arrive, problem,  brand, note, userToken, shopToken, timeToArrive, timeToFinish} = detailData

    return async dispatch => {

        // logic to make a match detail
        const result = await fetch(`${BASE_URL}/result` ,{
            method : "POST",
            headers : {
                'Content-Type' : "application/json"
            },
            body : JSON.stringify ({
                arrive,
                problem,
                brand,
                note,
                userToken,
                shopToken,
                timeToArrive,
                timeToFinish
            })
        })

        const resultData = await result.json()

        
        if(resultData.success){
            dispatch({
                type : RESULT_SUCCESS,
                payload : resultData
            })
        }
        else {
            dispatch({
                type : RESULT_FAIL
            })
        }

        return resultData

    }
}

export const matchDetail =(detailData) => {
    const { arrive, problem,  brand, note, userToken, shopToken, timeToArrive} = detailData

    return async dispatch => {

        // logic to make a match detail
        const result = await fetch(`${BASE_URL}/confirm/match` ,{
            method : "POST",
            headers : {
                'Content-Type' : "application/json"
            },
            body : JSON.stringify ({
                arrive,
                problem,
                brand,
                note,
                userToken,
                shopToken,
                timeToArrive
            })
        })

        const resultData = await result.json()

        
        if(resultData.success){
            dispatch({
                type : MATCH_SUCCESS,
                payload : resultData
            })
        }
        else {
            dispatch({
                type : MATCH_FAIL
            })
        }

        return resultData

    }
}

export const removeDetail = () => {
    //const { arrive, problem,  brand, note, userToken} = detailData

    return async dispatch => {
        const result = await fetch(`${BASE_URL}/confirm/remove` ,{
            method : "POST",
            headers : {
                'Content-Type' : "application/json"
            },
            // body : JSON.stringify ({
            //     arrive,
            //     problem,
            //     brand,
            //     note,
            //     userToken
            // })
        })

        const resultData = await result.json()

        if(resultData.success){
            dispatch({
                type : REMOVE_SUCCESS,
                payload : resultData
            })
        }
        else {
            dispatch({
                type : REMOVE_FAIL
            })
        }

        return resultData

    }
}