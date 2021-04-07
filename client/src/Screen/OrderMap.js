import React, { Component } from 'react';
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Constants from 'expo-constants'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapViewDirections from "react-native-maps-directions";


import { COLORS, FONTS, icons, SIZES, GOOGLE_API_KEY } from "../../constants"




export default class OrderMap extends Component {

  shop1 = {latitude:18.79268468643248 ,longitude:98.9539063516657}; // ohm
  shop2 = {latitude:18.799351977671343 ,longitude:98.94839402671037}; // tong
  shop3 = {latitude:18.791218486442517 ,longitude:98.96113336262425}; // mach
  shop4 = {latitude:18.78945498018443 ,longitude:98.95605535765088}; // same
  shop5 = {latitude:18.789602489876494, longitude:98.96922554654546 }; // ae


  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    console.log(mapRegion);
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   } else {
     this.setState({ hasLocationPermissions: true });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location) });
   
   // Center the map on the location we just fetched.
    this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.000452, longitudeDelta: 0.0421 }});
  };

  render() {
    return (
      <View >
        {
          this.state.locationResult === null ?
          <Text>Finding your current location...</Text> :
          this.state.hasLocationPermissions === false ?
            <Text>Location permissions are not granted.</Text> :
            this.state.mapRegion === null ?
            <Text>Map region doesn't exist.</Text> :
            <MapView
            showsUserLocation 
              style={{ alignSelf: 'stretch', height: 650 }}
              provider={PROVIDER_GOOGLE} 
              region={this.state.mapRegion}
              >
              
             
                   <MapViewDirections
                        origin={this.state.mapRegion}
                        destination={this.shop3}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={5}
                        
                       
                        optimizeWaypoints={true}>

                      
                  </MapViewDirections>

                  <MapView.Marker
      coordinate={this.shop3}
      title="Mach"
      description="0928156735"/>
                 
                  
     
    
            </MapView>

            
        }
        
        
      </View>
        
    );
  }
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
