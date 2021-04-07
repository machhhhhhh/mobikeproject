import React, {useEffect, useState} from 'react'
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

import * as confirmAction from '../Redux/actions/comfirmAction'

const BASE_URL = 'http://10.80.146.237:5000'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const ResultScreen = navData => {
    const dispatch = useDispatch()

    const [refesh, setRefreshing] = useState(false)

    const [stopWatch, setStopWatch] = useState(false);
    const [isStopwatchStart, setIsStopwatchStart] = useState(true);
    let getTime

    //let result
    const [shopName, setShopName] = useState('')
    const [shopEmail, setShopEmail] = useState('')
    const [haveDetail, setDetail] = useState(false)

    const [problem, setProblem] = useState('')
    const [brand, setbrand] = useState('')
    const [arrive, setArrive] = useState('')
    const [note, setNote] = useState('')
    const [shopToken ,setShopToken] = useState('')
    const [user, setUserToken] = useState('')
    //const [phone ,setPhone] = useState('')

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(10).then(() => setRefreshing(false));
      }, []);

    const loadConfirmDetail = async () => {

        try {
           const result = await axios.get(`${BASE_URL}/confirm/confirmId`)
            
                    const tokenUser = await AsyncStorage.getItem('token')
                    const event = result.data

                    

                    const userToken = event.userToken

                    const nameFromAsyncStorage = jwtDecode(tokenUser)
                    const nameFromDatabase = jwtDecode(userToken)

                    // if match detail
                    if (nameFromAsyncStorage.id === nameFromDatabase.id){

                        const shopToken = event.shopToken
                        const nameFromShopkeeper = jwtDecode(shopToken)
                        //console.log(nameFromShopkeeper);
                        setShopEmail(nameFromShopkeeper.email)
                        setShopName(nameFromShopkeeper.fullname)
                        setDetail(true)

                        //console.log(event)
                        setArrive(event.arrive)
                        setProblem(event.problem)
                        setbrand(event.brand)
                        setNote(event.note)
                        setShopToken(event.shopToken)
                        setUserToken(event.userToken)
                        //

                    }

                        // console.log(nameFromDatabase);
                        // console.log('tokenuserfrom Asynv', nameFromAsyncStorage);
                
                
                    
            
            
        } catch (error) {
            console.log( 'ersdfsdfsdfsdf', error);
        }
        
    }
    const loadData = async (havedetail) => {
        
        if(havedetail == false) {
            loadConfirmDetail()
        }

    }

    const getTimeDetail = (time) => {
        setTimeDetail(time)
    }

    useEffect(() => {
        loadConfirmDetail()
    })
    // useEffect(() =>{
    //     loadData()
    // })

    const OrderMap = () => {
        navData.navigation.navigate("OrderMap")
    }
    return (

        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView>
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    refreshControl = {
                        <RefreshControl
                            refreshing = {refesh}
                            onRefresh={onRefresh}
                        />
                    }
                    
                    >
                    <Formik
                        initialValues ={{
                            timeToArrive : '',
                            brand : '',
                            arrive : '',
                            problem :'',
                            note : '',
                            userToken : '',
                            shopToken : ''

                        }}
                        onSubmit = { (value) => {
                            //console.log(getTime)
                             value.timeToArrive = getTime
                             value.brand = brand
                             value.arrive = arrive
                             value.problem = problem
                             value.note = note
                             value.userToken = user
                             value.shopToken = shopToken


                            

                             dispatch(confirmAction.matchDetail(value))
                                .then(async result => {
                                   // console.log(result)
                                    //await AsyncStorage.setItem('arrive', result.timeToArrive)

                                    try {
                                        if ( result.success){
                                            dispatch(confirmAction.removeDetail())
                                                .then(async result => {
                                                    if (result.success) {
                                                        // navigate to Time Fix
                                                        
                                                        navData.navigation.navigate('Fix')
                                                    }
                                                    else {
                                                        Alert.alert('Cant remove Confirm Detail')
                                                    }
                                                })
                                                .catch(err => console.log(err))

                                        }
                                        else {
                                            Alert.alert('Cant send time to arrive')
                                        }
                                    }
                                    catch(err) {
                                        console.log(err)
                                    }

                                })
                                .catch(err => console.log(err))

                             //console.log(value)

                        }}
                    >
                        {props => (
                            
                            <View style = {styles.container}>
                            {shopName  ? (
                                    <View>
                                            <Text>Result</Text>
                                                
                                            <Text> ช่างชื่อ {shopName ? shopName : '' }</Text>
                                                
                                            <Text> Email {shopEmail ? shopEmail : '' }</Text>
                                            <Button 
                                                title ="MAP"
                                                onPress = { () => OrderMap()}
                                            />
                                            <Stopwatch
                                                laps
                                                msecs
                                                start={isStopwatchStart}
                                                // To start
                                                // reset={resetStopwatch}
                                                // To reset
                                                //options={options}
                                                // Options for the styling
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
                                                    title = {stopWatch ? 'END' : ''}
                                                
                                            />
                                    </View>
                            ):(
                                
                                    
                                    <Text>Waiting Shop Accept -- (Slide หน้าจอเพื่อตรวจสอบ)</Text>
                                    
                                
                            )}
                            
                            
                            
                                

                            </View>
                    )}

                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )

}
export default ResultScreen

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : "center",
        alignItems : 'center',
        backgroundColor : '#ffffff',

    },
    button : {
        color : 'red'
    }
})