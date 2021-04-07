import React ,{useState, useEffect} from 'react'
import {Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput ,Image, TouchableOpacity, Platform, Alert, Button} from 'react-native'
import {Formik} from 'formik'
import RNPickerSelect from 'react-native-picker-select'
import * as yup from 'yup'
import {useDispatch} from 'react-redux'
import {AsyncStorage} from 'react-native'
import jwtDecode from 'jwt-decode'

import * as detailAction  from '../Redux/actions/detailAction'

const formSchema = yup.object({
    problem : yup.string().required(),
    arrive : yup.string().required(),
    brand : yup.string().required()
})

const OrderScreen = navData => {

    const dispatch = useDispatch()

    const [userToken, setUserToken] =useState('')
   
    const arrive = [
        {
            label: 'ใช่',
            value: 'ใช่'
        },
        // {
        //     label: 'ไม่',
        //     value: 'ไม่'
        // }
    ]

    const brand = [
        {
            label: 'Honda',
            value: 'Honda'
        },
        {
            label: 'Yamaha',
            value: 'Yamaha'
        },
        {
            label: 'อื่นๆ',
            value: 'อื่นๆ'
        }
    ]

    

    const problem = [
        {
            label: 'ยางแตก',
            value: 'ยางแตก'
        },
        {
            label: 'รถสตาร์ทไม่ติด',
            value: 'รถสตาร์ทไม่ติด'
        },
        {
            label: 'อื่นๆ',
            value: 'อื่นๆ'
        }
    ]

    const loadProfile = async () => {
        const tokenUser = await AsyncStorage.getItem('token')
        setUserToken(tokenUser)
        
    }
    
    useEffect(() => {
        loadProfile()
    })

    return (
        <KeyboardAvoidingView
                behavior = {Platform.OS === 'ios' ? 'padding' : 'height'}
                style = {{flex : 1}}
        >
            <ScrollView>

                <Formik
                    initialValues = {{
                        problem : "",
                        arrive : "",
                        brand : "",
                        note : "",
                        userToken : "",
                    }}
                    onSubmit ={  value =>{
                        value.userToken = userToken

                        dispatch(detailAction.sendDetail(value))
                            .then( async result => {
                                //console.log(result)
                                if (result.success) {
                                    try {
                                       // console.log("Detail id Before push  " + result.token)

                                        await AsyncStorage.setItem('detail_token', result.token)
                                        navData.navigation.navigate('Search')
                                    }
                                    catch(err) {
                                        console.log(err)
                                    }
                                }
                                else {
                                    Alert.alert("Invalid input detail")
                                }
                            })
                            .catch(err => console.log(err))
                    
                        
                    }}
                    validationSchema = {formSchema}
                >

                    {
                        props => (

                            <View style = {styles.container}>

                                <View>
                                    <Text>ปัญหา </Text>
                                    <RNPickerSelect
                                        placeholder={{
                                                label: 'Select The Problem',
                                                value: null,
                                            }}
                                        onValueChange ={props.handleChange("problem")}
                                        value = {props.values.problem}
                                        items = {problem}
                                        key = {problem}
                                    />
                                    <Text style ={styles.errors}>{props.touched.problem && props.errors.problem}</Text>
                                </View>
                                
                                <View>
                                    <Text>ยี่ห้อ </Text>
                                    <RNPickerSelect
                                        onValueChange ={props.handleChange("brand")}
                                        value = {props.values.brand}
                                        items = {brand}
                                        key = {brand}
                                    />
                                    <Text style ={styles.errors}>{props.touched.brand && props.errors.brand}</Text>
                                </View>
                                <View>
                                    <Text>เรียกช่างมารับ </Text>
                                    <RNPickerSelect
                                        onValueChange ={props.handleChange("arrive")}
                                        value = {props.values.arrive}
                                        items = {arrive}
                                        key = {arrive}
                                    />
                                    <Text style ={styles.errors}>{props.touched.arrive && props.errors.arrive}</Text>
                                </View>

                                <TextInput
                                            style = {styles.input}
                                            placeholder = "หมายเหตุ"
                                            placeholderTextColor ="green"
                                            onChangeText = {props.handleChange('note')}
                                            value = {props.values.note}
                                            onBlur = {props.handleBlur('note')}
                                        />
                                

                                
                                <TouchableOpacity style={styles.commandButton} onPress ={ props.handleSubmit } >
          <Text style={styles.title}>Confirm</Text>
        </TouchableOpacity>  
                                

                                <View>
                                <TouchableOpacity style={styles.commandButton} onPress ={()=> navData.navigation.navigate("Home") } >
          <Text style={styles.title}>CANCEL</Text>
        </TouchableOpacity>  
                                </View>

                                
                            </View>

                            
                        )
                    }

                </Formik>

            </ScrollView>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent : "center",
        alignItems : 'center',
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color:"#ffff"
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100,
    },
    infoBox: {
        borderTopColor: '#dddddd',
        borderBottomColor: '#dddddd',
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuWrapper: {
      marginTop: 10,
    },
    commandButton: {
        width : 300,
      padding: 15 ,
      borderRadius: 10,
      backgroundColor: '#FF6347',
      justifyContent : "center",
        alignItems : 'center',
      marginTop: 20,
      marginLeft: 50
    },
    panel: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      paddingTop: 20,
    },
    errors :{
        color : 'red'
    }
   
  },);


export default OrderScreen