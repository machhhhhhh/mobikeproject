import React from 'react'
import {Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput ,Image, TouchableOpacity, Platform, Alert} from 'react-native'
import {Formik} from 'formik'
import * as yup from 'yup'
import {useDispatch} from 'react-redux'
//import { AsyncStorage } from '@react-native-community/async-storage';
import {AsyncStorage} from 'react-native'

import * as authAction from '../Redux/actions/authAction'

const formSchema = yup.object({
    fullname : yup.string().required().min(2),
    email : yup.string().email().required(),
    password : yup.string().required().min(2)
})

const RegisterScreen = navData => {

    const dispatch = useDispatch()
    
    return (
        <KeyboardAvoidingView
            behavior = {Platform.OS === 'ios' ? 'padding' : 'height'}
            style = {{flex : 1}}
        >

            <ScrollView>
                <Formik

                    initialValues ={{
                        fullname : '',
                        email : "",
                        password : "",
                        typeUser : "customer"
                    }}

                    validationSchema ={formSchema}

                    onSubmit = {value =>{
                        //console.log(value)

                        dispatch(authAction.registerUser(value))
                            .then( async result => {

                               // console.log(result)

                            if(result.success) {
                                try{
                                    await AsyncStorage.setItem('token', result.token)
                                    navData.navigation.navigate("Home")
                                }
                                catch(err){
                                    console.log(err)
                                }
                            }
                            else {
                                Alert.alert("Registion Fail Please try again")
                            }
                                
                            })
                            .catch( err => console.log(err))   
  
                    }}
                >

                        {
                            props => (
                                <View style = {styles.container}>

                <Image
          source={require("../../assets/authFooter.png")}
          style={{ position: "absolute", bottom: -325, right: -225 }}
        ></Image>
        <Image
          source={require("../../assets/logo.png")}
          style={{ marginTop: 200, marginBottom:30,alignSelf: "center",backgroundColor:"#FF6600",borderRadius: 30 }}></Image>

                                    <View>

                                        <TextInput
                                            style = {styles.input}
                                            placeholder = "Full Name"
                                            placeholderTextColor ="#fff"
                                            keyboardType ="email-address"
                                            onChangeText = {props.handleChange('fullname')}
                                            value = {props.values.fullname}
                                            onBlur = {props.handleBlur('fullname')}
                                        />
                                        <Text style ={styles.errors}>{props.touched.fullname && props.errors.fullname}</Text>

                                        <TextInput
                                            style = {styles.input}
                                            placeholder = "Email"
                                            placeholderTextColor ="#fff"
                                            keyboardType ="email-address"
                                            onChangeText = {props.handleChange('email')}
                                            value = {props.values.email}
                                            onBlur = {props.handleBlur('email')}
                                        />
                                        <Text style ={styles.errors}>{props.touched.email && props.errors.email}</Text>

                                        <TextInput
                                            style = {styles.input}
                                            placeholder = "Password"
                                            placeholderTextColor ="#fff"
                                            secureTextEntry = {true}
                                            onChangeText = {props.handleChange('password')}
                                            value = {props.values.password}
                                            onBlur = {props.handleBlur('password')}
                                        />
                                        <Text style ={styles.errors}>{props.touched.password && props.errors.password}</Text>

                                        <TouchableOpacity 
                                            style={styles.button}
                                            onPress = {props.handleSubmit}
                                            >
                                            <Text style ={styles.bottonText}>Register</Text>
                                        </TouchableOpacity>

                                        <View style={styles.registerContainer}>
                                            <Text style = {styles.registerText}>Have account?</Text>
                                            <TouchableOpacity
                                                onPress ={ () => navData.navigation.navigate("Login")}
                                            >
                                                <Text style={styles.registerButton}> Login </Text>
                                            </TouchableOpacity>
                                        </View>

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
    container : {
        flex : 1,
        justifyContent : "center",
        alignItems : 'center',
        backgroundColor : '#ffffff',

    },
    logo : {
        alignItems : 'center',
        marginBottom : 200,
        backgroundColor:"#FF6600",
        borderRadius: 30 
    },
    image : {
        width : 300,
        height : 300
    },
    input : {
        textAlign : 'center',
        width : 300,
        backgroundColor : '#ff8737',
        borderRadius : 25,
        padding : 16,
        fontSize : 16,
        marginVertical : 10
    },
    button : {
        width : 300,
        backgroundColor : '#ff8737',
        borderRadius : 25,
        marginVertical : 10,
        paddingVertical : 13
    },
    bottonText: {
        fontSize : 16,
        fontWeight : "500",
        color : '#ffffff',
        textAlign : 'center'
    },
    registerContainer : {
        alignItems : 'flex-end',
        justifyContent : 'center',
        paddingVertical : 16,
        flexDirection : 'row'
    },
    registerText : {
        color : '#738289',
        fontSize : 16,
     

    },
    registerButton : {
        color : '#738289',
        fontSize : 16,
        fontWeight : 'bold'
    },
    errors : {
        color : 'red'
    }
})

export default RegisterScreen