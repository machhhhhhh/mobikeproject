import React, { Component } from 'react';
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Constants from 'expo-constants'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';






export default class Map extends Component {

  shop1 = {latitude:18.79268468643248 ,longitude:98.9539063516657};
  shop2 = {latitude:18.799351977671343 ,longitude:98.94839402671037};
  shop3 = {latitude:18.791218486442517 ,longitude:98.96113336262425};
  shop4 = {latitude:18.78945498018443 ,longitude:98.95605535765088};
  shop5 = {latitude:18.789602489876494, longitude:98.96922554654546 };


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
              style={{ alignSelf: 'stretch', height: 670 }}
              provider={PROVIDER_GOOGLE}
              region={this.state.mapRegion}
           
              >
               <MapView.Marker
      coordinate={this.shop1}
      title="Same"
      description="โทรศัพท์: 0866589844"/>
      <MapView.Marker
      coordinate={this.shop2}
      title="Ohm"
      description="โทรศัพท์: 0866585466"/>
      <MapView.Marker
      coordinate={this.shop3}
      title="Mach"
      description="โทรศัพท์: 0884648616"/>
      <MapView.Marker
      coordinate={this.shop4}
      title="Tong"
      description="โทรศัพท์: 0958415463"/>
       <MapView.Marker
      coordinate={this.shop5}
      title="Ae"
      description="Some description"/>
    
            </MapView>
        }
        <Text>
          Location: {this.state.locationResult}
        </Text>
        
      </View>
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    resizeMode: 'cover'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});