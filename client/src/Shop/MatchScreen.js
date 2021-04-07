import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Button, KeyboardAvoidingView, ScrollView, RefreshControl, SafeAreaView} from 'react-native'
import {AsyncStorage} from 'react-native'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { Formik } from 'formik'
import {useDispatch} from 'react-redux'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const BASE_URL = 'http://10.80.146.237:5000'

const MatchScreen = navData => {

    const [refesh, setRefreshing] = useState(false)

    const [score, setSCore] = useState('')


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(10).then(() => setRefreshing(false));
      }, []);


      const loadScore = async () => {
          try {

            const result = await axios.get(`${BASE_URL}/calculate`)

            console.log(result);
              
          } catch (error) {
              console.log(error);
          }
      }

      useEffect(()=>{
          loadScore()
      })

    // const [currentDate, setCurrentDate] = useState('');

    // const loadTime = async () => {
    //     console.log(currentDate);
    // }

    // useEffect(() => {
    //     var date = new Date().getDate(); //Current Date
    //     var month = new Date().getMonth() + 1; //Current Month
    //     var year = new Date().getFullYear(); //Current Year
    //     var hours = new Date().getHours(); //Current Hours
    //     var min = new Date().getMinutes(); //Current Minutes
    //     var sec = new Date().getSeconds(); //Current Seconds
    //     setCurrentDate(
    //     date + '/' + month + '/' + year 
    //     + ' ' + hours + ':' + min + ':' + sec
    //     );

    //     // console.log(currentDate);


    // }, []);
    

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
                    
                        initialValues = {{

                        }}
                        onSubmit ={()=>{

                        }}
                        >

                        {props => (
                            <View style = {styles.container}>
                                {score ?(
                                    <Text>have score {score} </Text>

                                ) : (
                                    <Text>Wait for Customer Press Finish</Text>
                               
                                )}
                            </View>
                        )}

                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )

}

export default MatchScreen

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : "center",
        alignItems : 'center',
        backgroundColor : '#ffffff',

    },
})