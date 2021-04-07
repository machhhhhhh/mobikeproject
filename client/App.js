import React from 'react';
import {Provider} from 'react-redux'

import AppNavigator from './src/Navigation/AppNavigation'
import store from './src/Redux/store'

import { f, database, auth ,storage} from './src/configs/config'
// import * as Facebook from 'expo-facebook'

export default function App() {
      
      // async function  loginWithFacebook() {

      //       try
      //       {
        
      //          await Facebook.initializeAsync({ appId : '649880462610406'
      //         })
        
      //         const {type, token} = await Facebook.logInWithReadPermissionsAsync(
      //           // '649880462610406' ,
      //           { permissions: [ 'public_profile' ,'email' ] }
      //         )
      //         if (type === 'success'){
      //           const credential = f.auth.FacebookAuthProvider.credential(token)
      //           f.auth().signInWithCredential(credential).catch(error => {
      //             console.log("Error in facebook login ", error)
      //           })
        
      //         }
      //       }
      //       catch(error) {
      //         console.log(error);
      //       }
            
      //      }

  return (

        <Provider store = {store} >
              <AppNavigator/>
        </Provider>

  );
}