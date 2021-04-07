import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Button, KeyboardAvoidingView, ScrollView, RefreshControl, SafeAreaView} from 'react-native'
import {AsyncStorage} from 'react-native'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { Formik } from 'formik'
import {useDispatch} from 'react-redux'

import * as confirmAction  from '../Redux/actions/comfirmAction'
import * as detailAction from '../Redux/actions/detailAction'

import { Alert } from 'react-native'
import { log } from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native'

const BASE_URL = 'http://10.80.146.237:5000'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const GetOrder = navData  => {
    const dispatch = useDispatch()
    const [refesh, setRefreshing] = useState(false)

    const [problem, setProblem] = useState('')
    const [brand, setbrand] = useState('')
    const [arrive, setArrive] = useState('')
    const [note, setNote] = useState('')

    const [userToken, setUserToken] = useState('')
    const [customerName, setCustomerName] = useState('')
    const [customerEmail, setCustomerEmail] = useState()
    const [shopToken, setShopToken] = useState('')
    const [eventDetail, setEvent] =useState([])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(10).then(() => setRefreshing(false));
      }, []);


    const loadOrder = async () => {
        
        try {
            const result = await axios.get(`${BASE_URL}/detail/detailId`)
            
            

                const event = result.data.data

                //if (event== undefined) {Alert.alert("No have Detail")}
                //console.log(event);
        
                const shopToken = await AsyncStorage.getItem('token')
                setShopToken(shopToken)

                //console.log(event);
            
            
            
                setArrive(event.arrive)
                setProblem(event.problem)
                setbrand(event.brand)
                setNote(event.note)
                setUserToken(event.userToken)
                setEvent(event)
            

                if ( userToken ){
                    const customer = jwtDecode(userToken)

                    setCustomerName(customer.fullname)
                    setCustomerEmail(customer.email)
                }
           
            
        } catch (error) {
            console.log(error);
        }

  

    }
    const backToMenu = () => {
       // Alert.alert('Cant Push Confirm detail')
        navData.navigation.navigate("ShopMainScreen")
    }

    useEffect(()=>{
        
        
            loadOrder()
        
    })

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
                            problem : '',
                            arrive : '',
                            brand : '',
                            note : '',
                            userToken : '',
                            shopToken : ''

                        }}
                        onSubmit ={ value => {
                            value.problem = problem
                            value.arrive = arrive
                            value.brand = brand,
                            value.note = note
                            value.shopToken = shopToken
                            value.userToken = userToken
                            //console.log(value)



                            dispatch(confirmAction.sendDetail(value))
                                .then( result => {
                                    //console.log(result)

                                    if(result.success) {

                                        try {
                                            dispatch(detailAction.removeDetail())
                                                .then(result =>{
                                                    if(result.success) {
                                                        // navigate 
                                                        navData.navigation.navigate('Match')
                                                    }
                                                    else {
                                                        Alert.alert("Cant remove detail")
                                                    }
                                                })
                                                .catch(err => console.log(err))

                                        }
                                        catch (err) {
                                            console.log(err)
                                        }
                                    }
                                    else {
                                        
                                        backToMenu()
                                    }

                                })
                                .catch(err => console.log(err))
                            // dispatch(detailAction.removeDetail())
                        }}
                    
                    >

                        {props => (
                            <View>

                            
                            
                            {problem  ? (
                                <View style = {styles.container} >
                                <View>
                                    <Text style= {styles.text}>ปัญหา {problem ? problem : '' }</Text>
                                </View>
                                <View>
                                    <Text style= {styles.text}>ให้ช่างมารับ {arrive ? arrive : '' }</Text>
                                </View>

                                <View>
                                    <Text style= {styles.text}>รถรุ่น {brand ? brand : '' }</Text>
                                </View>
                                <View>
                                    <Text style= {styles.text}>หมายเหตุ {note ? note : '' }</Text>
                                </View>

                                <View>
                                    <Text style= {styles.textCus}>The Order come from {customerName}</Text>
                                    <Text style= {styles.textCus}>Which have email {customerEmail}</Text>
                                </View>

                                <Button 
                                    title ="Get Order"
                                    onPress = { props.handleSubmit}
                                />
                                <Button 
                                    title ="CANCEL"
                                    onPress = { () => navData.navigation.navigate("ShopMainScreen")}
                                />
                                
                                </View>
                                    

                            ) : (
                                
                            
                            
                            <Text>Waiting Customer Request -- (Slide หน้าจอเพื่อตรวจสอบ)</Text>
                            
                            
                            
                                
                            
                            
                                
                            

                            )}

                                
                                    

                            
                
                                
                                
                            </View>
                        )}

                    </Formik>


                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
    text : {
        fontSize : 22
    },
    textCus : {
        fontSize : 30,
        color :'red'
    },
    container : {
        flex : 1,
        justifyContent : "center",
        alignItems : 'center',
        backgroundColor : '#ffffff',

    },
})

export default GetOrder