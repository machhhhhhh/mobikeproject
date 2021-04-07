import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from "@react-navigation/stack"

const Stack = createStackNavigator()

import LoginScreen from '../Screen/LoginScreen'
import HomeScreen from '../Screen/HomeScreen'
import RegisterScreen from '../Screen/RegisterScreen'
import OrderScreen from '../Screen/OrderScreen'
import mapLocation from '../Screen/Map'
import SearchScreen from '../Screen/SearchScreen'
import OrderMap from '../Screen/OrderMap'
import ResultScreen from '../Screen/ResultScreen'
import FixTimeScreen from '../Screen/FixTimeScreen'


import ShopMainScreenn from '../Shop/ShopMainScreen'
import GetOrder from '../Shop/GetOrder'
import CustomerScreen from '../Screen/CustomerScreen'
import ProfileScreen from '../Shop/ProfileScreen'
import EditProfileScreen from '../Shop/EditProfileScreen'
import Score from '../Shop/Score'
import MatchScreen from '../Shop/MatchScreen'

export default function AppNavigator(){

    return (

        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name ="Login" component={LoginScreen} options ={{headerShown : false}} />
                <Stack.Screen name ="Register" component={RegisterScreen} options ={{headerShown : false}} />
                <Stack.Screen name ="Home" component={HomeScreen} options ={{headerLeft : null}} />
                <Stack.Screen name ="Order" component={OrderScreen} options ={{headerLeft : null}} />
                <Stack.Screen name ="Map" component={mapLocation} />
                <Stack.Screen name ="Search" component={SearchScreen} options ={{headerLeft : null}} />
                <Stack.Screen name ="CustomerScreen" component={CustomerScreen} options ={{headerLeft : null}} />
                <Stack.Screen name ="ShopMainScreen" component={ShopMainScreenn} options ={{headerLeft : null}} />
                <Stack.Screen name ="GetOrder" component={GetOrder}  />
                <Stack.Screen name ="Profile" component={ProfileScreen}  />
                <Stack.Screen name ="EditProfile" component={EditProfileScreen}  />
                <Stack.Screen name ="Score" component={Score}  />
                <Stack.Screen name ="OrderMap" component={OrderMap}  />
                <Stack.Screen name ="Result" component ={ResultScreen}options ={{headerLeft : null}} />
                <Stack.Screen name ="Match" component ={MatchScreen}/>
                <Stack.Screen name ="Fix" component ={FixTimeScreen}/>

            </Stack.Navigator>
        </NavigationContainer>

    )
}