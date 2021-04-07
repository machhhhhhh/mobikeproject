import React , {useCallback} from 'react'
import {Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput ,Image, TouchableOpacity, Platform, Alert, Linking, Button} from 'react-native'
import {Formik} from 'formik'
import * as yup from 'yup'
import {useDispatch} from 'react-redux'
//import { AsyncStorage } from '@react-native-community/async-storage';
import {AsyncStorage} from 'react-native'
import {SocialIcon} from 'react-native-elements'

import * as authAction from '../Redux/actions/authAction'


const formSchema = yup.object({
    email : yup.string().email().required(),
    password : yup.string().required().min(2)
})

const googleURL = 'https//www.google.com/auth/google'

const LoginScreen = navData => {

    const dispatch = useDispatch()

    const OpenURLGoogle = ({url, children}) => {    
        const handlePress = useCallback( async () => {

            // check if link can support the url
            const support = await Linking.canOpenURL(url)

            if (support){
                // open the link
                await Linking.openURL(url)
        
            }else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }

        }, [url])

        return <Button title ="Sign in with Google" onPress = {handlePress} /> 
        

    }

        return (
            
            <KeyboardAvoidingView
                behavior = {Platform.OS === 'ios' ? 'padding' : 'height'}
                style = {{flex : 1}}
            >

                <ScrollView>
                    <Formik
                        initialValues ={{
                            email : "",
                            password : "",
                        }}
                        validationSchema = {formSchema}
                        onSubmit = {value =>{

                            dispatch(authAction.loginUser(value))
                                .then( async result => {

                                    if(result.success) {
                                        try {
                                            await AsyncStorage.setItem('token', result.token)
                                            //await AsyncStorage.setItem('type', "shopkeeper")
                                            //console.log('Login')
                                            navData.navigation.navigate("Home")
                                        }catch(err){
                                            console.log(err)
                                        }
                                    }
                                    else {
                                        Alert.alert(result.message)
                                    }
                                })
                                .catch(err => console.log(err))
                            
                        }}
                    >

                            {
                                props => (
                                    <View style = {styles.container}>

<Image
                                     source={require("../../assets/authHeader.png")}
                                 style={{ marginTop: -176, marginLeft: -50 }}
                                 ></Image>


        <Image
          source={require("../../assets/authFooter.png")}
          style={{ position: "absolute", bottom: -325, right: -225 }}
        ></Image>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
        ></Image>
         <Text style={{ color: "#414959", fontSize: 30,marginBottom:25 }}> 
        Smart RepairShop Search 
      </Text>

                                        <View>

                                            <TextInput
                                                style = {styles.input}
                                                placeholder = "Email"
                                                placeholderTextColor ="#fff"
                                                keyboardType ="email-address"
                                                onChangeText = {props.handleChange('email')}
                                                value = {props.values.email}
                                                onBlur ={props.handleBlur('email')}
                                            />
                                            <Text style= {styles.errors}>{props.touched.email && props.errors.email }</Text>
                                            
                                            <TextInput
                                                style = {styles.input}
                                                placeholder = "Password"
                                                placeholderTextColor ="#fff"
                                                secureTextEntry = {true}
                                                onChangeText = {props.handleChange('password')}
                                                value = {props.values.password}
                                                onBlur = {props.handleBlur('password')}
                                            /> 
                                            <Text style = {styles.errors}>{props.touched.password && props.errors.password}</Text>

                                            <TouchableOpacity 
                                                style={styles.button}
                                                onPress = {props.handleSubmit}

                                                >
                                                <Text style ={styles.bottonText}>Login</Text>
                                            </TouchableOpacity>

                                            <View style={styles.registerContainer}>
                                                <Text style = {styles.registerText}>Sign up for Customer </Text>

                                                <TouchableOpacity
                                                    //onPress = {() => navigation.navigate('Register')}
                                                    onPress = {() => navData.navigation.navigate("Register")}
                                                >
                                                    <Text style={styles.registerButton}> Register </Text>
                                                </TouchableOpacity>
                                                
                                                
                                            </View>
                                            
                                            {/* <View>
                                                <OpenURLGoogle url = {googleURL}></OpenURLGoogle>
                                            </View> */}
                                            

                                            {/* <SocialIcon 
                                                title='Sign In With Google' 
                                                button type= 'google'  
                                                onPress={ async () => {
                                                    await AsyncStorage.setItem('type', 'customer')
                                                    //this.signInWithGoogleAsync()
                                                    navData.navigation.navigate('Home')

                                                }}

                                            />
       
                                            <SocialIcon 
                                                title='Sign In With Facebook' 
                                                button type='facebook' 
                                                onPress={ async () => {
                                                    await AsyncStorage.setItem('type', 'customer')
                                                   // this.loginWithFacebook()
                                                }} 

                                            /> */}
                                            

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
        marginBottom : 40,
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

export default LoginScreen