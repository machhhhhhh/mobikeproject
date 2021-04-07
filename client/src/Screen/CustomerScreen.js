import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, Button} from 'react-native'
import {AsyncStorage} from 'react-native'
import jwtDecode from 'jwt-decode'

const CustomerScreen = navData => {

    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')

    const loadProfile = async () => {

        const token = await AsyncStorage.getItem('token')
        if (!token) {
            navData.navigation.navigate("login")
        }
        
        const decode = jwtDecode(token)
        setFullname(decode.fullname)
        setEmail(decode.email)
    }

    

    useEffect(() => {
        loadProfile()
    })

    return (
        <View></View>
    )
}

export default CustomerScreen