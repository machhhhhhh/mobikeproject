import React ,{useState, useEffect} from 'react'
import {Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput ,Image, TouchableOpacity, Platform, Alert, Button} from 'react-native'
import {Formik} from 'formik'
import {AsyncStorage} from 'react-native'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import {useDispatch} from 'react-redux'

import * as detailAction from '../Redux/actions/detailAction'

const BASE_URL = 'http://10.80.19.165:5000'

const SearchScreen = navData => {

    const dispatch = useDispatch()

    const [problem, setProblem] = useState('')
    const [brand, setbrand] = useState('')
    const [arrive, setArrive] = useState('')
    const [note, setNote] = useState('')
    const [userToken, setUserToken] = useState('')
    

    const loadDetail = async () => {

        try {
            const tokenDetail = await AsyncStorage.getItem('detail_token')

        
        //const shopToken = await axios.get(`${BASE_URL}/detail`)

        //console.log("Detail after push   " + tokenDetail);

        if (!tokenDetail) {
            navData.navigation.navigate("Home")
        }

        //console.log(detailID)
        const decode = jwtDecode(tokenDetail)
        
       // console.log(decode)

        setArrive(decode.arrive)
        setProblem(decode.problem)
        setbrand(decode.brand)
        setNote(decode.note)
        setUserToken(decode.userToken)

        } catch (error) {
            console.log(error);
        }
        

    }

    useEffect(()=>{
        loadDetail()
    })

    // when each token finish
    // const finishOrder = () => {
    //     AsyncStorage.removeItem('detail_id')
    //         .then(()=>{
    //             // clear to home
    //             props.navigation.replace("Home")
    //         })
    //         .catch(err => console.log(err))
    // }

    const calcelOrder =  () => {
        AsyncStorage.removeItem('detail_token')
            .then(()=>{
                navData.navigation.replace("Home")
            })
            .catch(err => console.log(err))
        
    }
    const backToMenu = () => {
        navData.navigation.navigate("Home")
    }
    

    return (
        <KeyboardAvoidingView>
            <ScrollView>
                    <Formik
                        initialValues ={{
                            problem : '',
                            arrive : '',
                            brand : '',
                            note : '',
                            userToken : ''
                        }}
                        onSubmit ={ value => {
                            value.problem = problem
                            value.arrive  = arrive
                            value.brand = brand,
                            value.note = note,
                            value.userToken = userToken

                            //console.log(value)
                            dispatch(detailAction.pushDetail(value))
                                .then( async result => {
                                    // console.log(result)
                                    // navigate to shop
                                    if(result.success)
                                    {
                                        navData.navigation.navigate("Result")
                                    }
                                    else {
                                        Alert.alert("Cant push Detail")
                                    }

                                })
                                .catch(err => console.log(err))

                        }}
                        
                        >

                            {props => (
                                    <View style = {styles.container} >
                                            <Text>Search Screen</Text>
                                            <View>
                                                <Text style= {styles.text}>ปัญหา </Text>
                                                <Text style = {styles.detail}>{ problem ? problem : '' }</Text>
                                            </View>
                                            <View>
                                                <Text style= {styles.text}>ให้ช่างมารับ </Text>
                                                <Text style = {styles.detail}>{arrive ? arrive : '' }</Text>
                                            </View>

                                            <View>
                                                <Text style= {styles.text}>รถรุ่น </Text>
                                                <Text style = {styles.detail}>{brand ? brand : '' }</Text>
                                            </View>
                                            <View>
                                                <Text style= {styles.text}>หมายเหตุ </Text>
                                                <Text style = {styles.detail}>{note ? note : '' }</Text>
                                            </View>

                                            <Button 
                                                title ="Confirm Order"
                                                onPress = { props.handleSubmit}
                                            />

                                            <Button 
                                                title ="CANCEL"
                                                onPress = { () => calcelOrder()}
                                            />
                                            
                                        </View>
                            )}


                    </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    )


}
const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : 40
    },
    text : {
        fontSize : 22
    },
    detail : {
        fontSize : 22,
        color : 'red'
    }

})
export default SearchScreen