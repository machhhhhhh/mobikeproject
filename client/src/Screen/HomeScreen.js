import React , {useEffect, useState} from 'react'
import {Text, View, StyleSheet, Button,Image,TouchableOpacity} from 'react-native'
//import {AsyncStorage} from '@react-native-community/async-storage'
import {AsyncStorage} from 'react-native'
import jwtDecode from 'jwt-decode'

const HomeScreen = navData => {

    
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    //const [token,setToken]=useState('')
    const [type, checkUserType] = useState(false)

    const checkType = async () => {

        try {
            const token = await AsyncStorage.getItem('token')
        
            if(!token) {
                    navData.navigation.navigate("Login")
            }

            const decode = jwtDecode(token)
            //console.log(token);

            if (decode.typeUser === "shopkeeper"){
                navData.navigation.navigate("ShopMainScreen")
            }
            
            setFullname(decode.fullname)
            setEmail(decode.email)

            
  
        } catch (error) {
            console.log(error);
        }
    }
     
    useEffect(()=>{
         checkType()
    })

    const mapLocation = () => {
        navData.navigation.navigate("Map")
       
    }

    const logout =  async () => {
        await AsyncStorage.removeItem('token')
        navData.navigation.replace("Login")
        
    }
    const search = () => {
        navData.navigation.navigate("Order")
    }
    
    return (
        <View>

<View style={{flexDirection: 'row', marginTop: 200}} >
        <Image
          source={require("../../assets/authHeader.png")}
          style={{ marginTop: -306, marginLeft: -50 }}
        ></Image></View>
            
            <View style={{ position: "absolute", bottom: -150,right:10  }}>
                <Text style= {styles.text}>Welcome {fullname ? fullname : '' }</Text>
            

            
                <Text style = {styles.text}>Your Email {email ? email : '' }</Text>
           
            
            
</View>
        
        
            <View>

            <TouchableOpacity style={styles.commandButton} onPress = {()=> mapLocation()} >
          <Text style={styles.title}>See Location</Text>
        </TouchableOpacity>  
            </View>
            <TouchableOpacity style={styles.commandButton} onPress = {()=> search()} >
          <Text style={styles.title}>Search</Text>
        </TouchableOpacity>  

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
    },
   
  },);

export default HomeScreen