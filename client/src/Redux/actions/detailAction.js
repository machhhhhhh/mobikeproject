export const SEND_SUCCESS = 'SEND_SUCCESS'
export const SEND_FAIL = 'SEND_FAIL'
export const CONFIRM_FAIL = 'CONFIRM_FAIL'
export const CONFIRM_SUCCESS = 'CONFIRM_SUCCESS'
export const REMOVE_SUCCESS = 'REMOVE_SUCCESS'
export const REMOVE_FAIL = 'REMOVE_FAIL'

const BASE_URL = 'http://10.80.146.237:5000'

// export const seeDetail = (detailData) => {

//     return async dispatch => {

//         const result = await fetch(`${BASE_URL}/detail` ,{
//             method : "GET",
//             headers : {
//                 'Content-Type' : "application/json"
//             },
//             body : JSON.stringify ({
//                 arrive,
//                 problem,
//                 brand,
//                 note
//             })
//         })

//         const resultData = await result.json()

//         return resultData

//     }
// }

export const sendDetail = (detailData) => {
    const { arrive, problem,  brand, note, userToken} = detailData

    return async dispatch => {

        // logic to make a post detail
        const result = await fetch(`${BASE_URL}/detail` ,{
            method : "POST",
            headers : {
                'Content-Type' : "application/json"
            },
            body : JSON.stringify ({
                arrive,
                problem,
                brand,
                note,
                userToken
            })
        })

        const resultData = await result.json()

        
        if(resultData.success){
            dispatch({
                type : SEND_SUCCESS,
                payload : resultData
            })
        }
        else {
            dispatch({
                type : SEND_FAIL
            })
        }

        return resultData
    }

}
export const pushDetail = (detailData) => {
    const { arrive, problem,  brand, note, userToken} = detailData

    return async dispatch => {

        // logic to make a post detail
        const result = await fetch(`${BASE_URL}/detail/push` ,{
            method : "POST",
            headers : {
                'Content-Type' : "application/json"
            },
            body : JSON.stringify ({
                arrive,
                problem,
                brand,
                note,
                userToken
            })
        })

        const resultData = await result.json()

        
        if(resultData.success){
            dispatch({
                type : SEND_SUCCESS,
                payload : resultData
            })
        }
        else {
            dispatch({
                type : SEND_FAIL
            })
        }

        return resultData
    }

}

export const removeDetail = () => {
    //const { arrive, problem,  brand, note, userToken} = detailData

    return async dispatch => {
        const result = await fetch(`${BASE_URL}/detail/remove` ,{
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