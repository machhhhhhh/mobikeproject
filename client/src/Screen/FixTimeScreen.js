import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, RefreshControl, SafeAreaView, Button, TouchableHighlight} from 'react-native'
import {Formik} from 'formik'
import {AsyncStorage} from 'react-native'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { KeyboardAvoidingView } from 'react-native'
import { ScrollView } from 'react-native'
import { Alert } from 'react-native'
import {Stopwatch, Timer} from 'react-native-stopwatch-timer'

import* as resultAction from '../Redux/actions/resultAction'
//import * as confirmAction from '../Redux/actions/comfirmAction'

const BASE_URL = 'http://10.80.146.237:5000'

const FixTimeScreen = navData => {

    const dispatch = useDispatch()

    const [stopWatch, setStopWatch] = useState(false);
    const [isStopwatchStart, setIsStopwatchStart] = useState(true);
    let getTime

    const [problem, setProblem] = useState('')
    const [brand, setbrand] = useState('')
    const [arrive, setArrive] = useState('')
    const [note, setNote] = useState('')
    const [shopToken ,setShopToken] = useState('')
    const [user, setUserToken] = useState('')
    const [timeFormDatabase, setTimeFromDatabase] = useState('')

    const loadDetail = async () =>{

        try {

            const result = await axios.get(`${BASE_URL}/result/resultId`)
            const event = result.data
            //const timeFormAsync = await AsyncStorage.getItem('arrive')
            //console.log(event);

            setProblem(event.problem)
            setbrand(event.brand)
            setArrive(event.arrive)
            setNote(event.note)
            setUserToken(event.userToken),
            setShopToken(event.shopToken)
            setTimeFromDatabase(event.timeToArrive)

            //console.log(timeFormAsync);
            
            
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        loadDetail()
    })


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView>
                <ScrollView
                    //  contentContainerStyle={styles.scrollView}
                    // refreshControl = {
                    //     <RefreshControl
                    //         refreshing = {refesh}
                    //         onRefresh={onRefresh}
                    //     />
                    // }
                    >
                    <Formik 
                        initialValues = {{
                            timeToFinish : '',
                            problem : '',
                            brand : '',
                            note : '',
                            arrive :'',
                            userToken : '',
                            shopToken : "",
                            timeToArrive : '',

                        }}
                        onSubmit = { value => {
                            value.timeToFinish = getTime
                            value.problem = problem,
                            value.brand = brand,
                            value.note = note,
                            value.arrive = arrive,
                            value.userToken = user,
                            value.shopToken = shopToken
                            value.timeToArrive = timeFormDatabase

                            
                           
                            
                            dispatch(resultAction.resultDetail(value))
                                .then(async result =>{
                                   // console.log(result)
                                   if(result.success) {
                                       // remove
                                       dispatch(resultAction.removeDetail())
                                            .then( async result => {
                                                if (result.success) {
                                                    // Finish
                                                    navData.navigation.navigate("Home")

                                                }
                                                else {
                                                    Alert.alert('cant remove matching detail')
                                                }
                                            })
                                            .catch(err => console.log(err))
                                   }
                                   else {
                                       Alert.alert('cant push finish detail')
                                   }
                                })
                                .catch(err => console.log(err))

                            //console.log(value)
                        }}
                        >
                        {props => (
                            <View style = {styles.container}>
                                <Text>Fix Time Screen</Text>
                                            <Stopwatch
                                                laps
                                                msecs
                                                start={isStopwatchStart}
                                                
                                                getTime={ time => {
                                                    try {
                                                        if (stopWatch){
                                                        //console.log(time);
                                                        getTime = time
                                                        
                                                        

                                                        //setTimeDetail(time)
                                                        //setIsStopwatchStart(false)
                                                         // console.log('get time   ', getTime)
                                                    }
                                                    }catch (err){
                                                        console.log('error in stop watch' , err)
                                                    }
                                                
                                                }}
                                            />
                                            <Button
                                                style = {styles.button}
                                                onPress={() => {
                                                    setIsStopwatchStart(!isStopwatchStart);
                                                    setStopWatch(true)
                                                    //props.handleSubmit
                                                    // setResetStopwatch(false);
                                                    }}
                                                    title = {!isStopwatchStart ? '' : 'Stop Time'}
                                                
                                            />
                                            <Button
                                                style = {styles.button}
                                                onPress={props.handleSubmit }
                                                    title = {stopWatch ? 'Fix Finish' : ''}
                                                
                                            />
                            </View>
                        )}

                    </Formik>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>

    )

}
export default FixTimeScreen

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : "center",
        alignItems : 'center',
        backgroundColor : '#ffffff',

    },

})