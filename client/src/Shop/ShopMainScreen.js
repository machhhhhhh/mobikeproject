import React, {useState, useEffect} from 'react'
import {Text,View, StyleSheet, Button,Image,TouchableOpacity} from 'react-native'
import {AsyncStorage} from 'react-native'
import jwtDecode from 'jwt-decode'

const ShopMainScreen = navData => {
    
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')

    const loadProfile = async () => {

        
        const token = await AsyncStorage.getItem('token')

        if (!token) {
            navData.navigation.navigate("Login")
        }
    
        // decode the shop token
        const decode = jwtDecode(token)
        setFullname(decode.fullname)
        setEmail(decode.email)

    }

    useEffect(()=>{
        loadProfile()
    })

    const mapLocation = async () => {
        await AsyncStorage.setItem('type', 'shopkeeper')
        navData.navigation.navigate("Map")
       
    }
    
    const Profile = async () => {
        navData.navigation.navigate('Profile')
    }

    const logout = async () => {
        await AsyncStorage.removeItem('token')
        navData.navigation.replace("Login")
        
    }

    const getDetail =() => {
        
        navData.navigation.navigate("GetOrder")
    }
    const Score =() => {
        
      navData.navigation.navigate("Score")
  }

    return ( 
        <View>

<View style={{flexDirection: 'row', marginTop: 200}} >
        <Image
          source={require("../../assets/authHeader.png")}
          style={{ marginTop: -306, marginLeft: -50 }}
        ></Image></View>
            
            <View style={{ position: "absolute", bottom: -70,right:10  }}>
                <Text style= {styles.text}>Welcome {fullname ? fullname : '' }</Text>
            

            
                <Text style = {styles.text}>Your Email {email ? email : '' }</Text>
           
            
            
</View>
          <Text style={{justifyContent : "center",fontSize: 18, fontWeight: 'bold',color:"#ff2216"}}>Status: Wait for Customer's request</Text>
        
            <View>

            {<TouchableOpacity style={styles.commandButton} onPress={() => Profile()} >
          <Text style={styles.title}>Shop information</Text>
        </TouchableOpacity>   }
            </View>
            <TouchableOpacity style={styles.commandButton} onPress ={() => getDetail()} >
          <Text style={styles.title}>Get Order</Text>
        </TouchableOpacity>  

        {/* <TouchableOpacity style={styles.commandButton} onPress = {()=> Score()} >
          <Text style={styles.title}>Score</Text>
        </TouchableOpacity>   */}
        <TouchableOpacity style={styles.commandButton} onPress = {()=> logout()} >
          <Text style={styles.title}>Logout</Text>
        </TouchableOpacity>  
                
            
        </View>
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
    },errors : {
      color : 'red'
  }
   
  },);

export default ShopMainScreen