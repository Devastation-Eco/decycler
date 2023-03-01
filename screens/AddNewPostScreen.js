import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import MapView from "react-native-maps";
import {Marker} from "react-native-maps";
import * as Location from "expo-location";
import { MagnifyingGlassIcon } from 'react-native-heroicons/solid';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const AddNewPostScreen = ({navigation}) => {

    const [mapRegion, setRegion] = useState({
      latitude: 46.7712,
      longitude: 23.6236,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    const [tempCoords, setCoords] = useState(null);

    const userLocation = async () => {
      let {status} = await Location.requestForegroundPermissionsAsync()
      if(status !== "granted"){
        alert("Location permission denied");
        return;
      }
    
      let location = await Location.getCurrentPositionAsync();
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: location.coords.latitudeDelta,
        longitudeDelta: location.coords.longitudeDelta,
      });
    }

    useEffect(() => {
      // Implementeaza asta altfel
      userLocation();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.topBar}> 
            <TouchableOpacity onPress={()=>{navigation.goBack()}}>
              <Image style={styles.backButton}
                    source={require('../assets/stanga.png')}/> 
            </TouchableOpacity>
        
            <GooglePlacesAutocomplete
                placeholder='Search your location'
                fetchDetails={true}
                currentLocation={true}
                currentLocationLabel="Your current location"
                onPress={(data, details = null) => {
                  setRegion({
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  })
                }}
                query={{key: 'AIzaSyCHW0EFt0l5yNopkX062Ds8Y75SvDoHJHc', language: 'en'}}
                enablePoweredByContainer={false}
                styles={{container:{paddingLeft: 13, paddingRight: 13, bottom: 2}}}
            />
            
            <MagnifyingGlassIcon size={35} color='black'/> 
          </View>
          
          <View style={styles.mapContainer}>
             <MapView style={styles.map} region={mapRegion}>
                <Marker 
                  coordinate={mapRegion} title="Your location"/>
              </MapView>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("AddInfo", {long: mapRegion.longitude, lat: mapRegion.latitude})}} >
              <Text style={styles.buttonText}>Set location</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
  );
}

export default AddNewPostScreen;

const SCREEN_HEIGHT = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: "column",
    backgroundColor: "green",
  },

  topBar:{
    flexDirection: "row",
    alignItems: "flex-start",
    alignContent: "space-around",
    padding: 15,
  },
  backButton:{
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "green",
    borderWidth: 1,
    borderColor: "black",
  },

  mapContainer: {
    width: "100%",
    marginTop: 0,
    alignItems: "center"
  },

  map: {
    width: "100%",
    height: "100%",
    borderColor: 'black'
  },

  buttonContainer: {
    position: 'absolute',
    width: "100%",
    alignItems: "center",
  },

  button:{
    backgroundColor: "#086b2e",
    width: "50%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 20,
    top: SCREEN_HEIGHT-120,
  },

  buttonText:{
    color: "white",
    fontWeight: "700",
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
  },

});
