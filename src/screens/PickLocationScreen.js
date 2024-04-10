// import { StyleSheet, Text, View, PermissionsAndroid, Platform, Dimensions, ToastAndroid } from 'react-native'
// import React, { useEffect } from 'react'
// import MapView, { Marker, Callout, Circle } from 'react-native-maps';
// import { Button, Avatar, ActivityIndicator } from 'react-native-paper'
// import Geolocation from 'react-native-geolocation-service';

// navigator.geolocation = require('react-native-geolocation-service');

// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import Container from '../components/Container';
// import Row from '../components/Row';
// import { theme } from '../core/theme';
// import Icon from "react-native-vector-icons/MaterialIcons";
// import MapViewScreen from './MapViewScreen';

// // const GOOGLE_PLACES_API_KEY = 'AIzaSyD_SWdXado5fwMUF5_P0eIWE8lWKLuZU_Y';
// const GOOGLE_PLACES_API_KEY = 'AIzaSyAUlbxHExenYwhZRuWvQvoKy2W6_sRuGck';

// const PickLocationScreen = ({ navigation }) => {

//   const [activeLoader, setActiveLoader] = React.useState(true);
//   const [forceLocation, setForceLocation] = React.useState(true);
//   const [highAccuracy, setHighAccuracy] = React.useState(true);
//   const [locationDialog, setLocationDialog] = React.useState(true);
//   const [useLocationManager, setUseLocationManager] = React.useState(false);
//   const [location, setLocation] = React.useState({
//     latitude: 37.78825,
//     longitude: -122.4324
//   });
//   const [region, setRegion] = React.useState({
//     latitude: 37.78825,
//     longitude: -122.4324,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421
//   })

//   useEffect(() => {
//     getLocation();
//   }, []);

//   const hasLocationPermission = async () => {
//     if (Platform.OS === 'ios') {
//       const hasPermission = await hasPermissionIOS();
//       return hasPermission;
//     }

//     if (Platform.OS === 'android' && Platform.Version < 23) {
//       return true;
//     }

//     const hasPermission = await PermissionsAndroid.check(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     );

//     if (hasPermission) {
//       return true;
//     }

//     const status = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     );

//     if (status === PermissionsAndroid.RESULTS.GRANTED) {
//       return true;
//     }

//     if (status === PermissionsAndroid.RESULTS.DENIED) {
//       ToastAndroid.show(
//         'Location permission denied by user.',
//         ToastAndroid.LONG,
//       );
//     } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
//       ToastAndroid.show(
//         'Location permission revoked by user.',
//         ToastAndroid.LONG,
//       );
//     }

//     return false;
//   };

//   const getLocation = async () => {
//     const hasPermission = await hasLocationPermission();

//     if (!hasPermission) {
//       return;
//     }

//     Geolocation.getCurrentPosition(
//       (position) => {
//         setLocation({
//           latitude: position?.coords?.latitude,
//           longitude: position?.coords?.longitude
//         });
//         setRegion({
//           latitude: position?.coords?.latitude,
//           longitude: position?.coords?.longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421
//         });

//         setActiveLoader(false);
//       },
//       (error) => {
//         Alert.alert(`Code ${error.code}`, error.message);
//         setLocation(null);
//         console.log(error);
//       },
//       {
//         accuracy: {
//           android: 'high',
//           ios: 'best',
//         },
//         enableHighAccuracy: highAccuracy,
//         timeout: 15000,
//         maximumAge: 10000,
//         distanceFilter: 0,
//         forceRequestLocation: forceLocation,
//         forceLocationManager: useLocationManager,
//         showLocationDialog: locationDialog,
//       },
//     );
//   };

//   console.log("location: ", location);

//   return (
//     <>
//       {!activeLoader ?
//         <View style={{ marginTop: 0, flex: 1 }}>
//           <GooglePlacesAutocomplete
//             placeholder="Search for area, street name..."
//             fetchDetails={true}
//             GooglePlacesSearchQuery={{
//               rankby: "distance"
//             }}
//             onPress={(data, details = null) => {
//               console.log(data, details)
//               setRegion({
//                 latitude: details.geometry.location.lat,
//                 longitude: details.geometry.location.lng,
//                 latitudeDelta: 0.0922,
//                 longitudeDelta: 0.0421
//               })
//               navigation.navigate('MapView', {
//                 latitude: details.geometry.location.lat,
//                 longitude: details.geometry.location.lng
//               })
//             }}
//             query={{
//               key: GOOGLE_PLACES_API_KEY,
//               language: "en",
//               components: "country:ind",
//               types: "establishment",
//               radius: 30000,
//               // location: `${region.latitude}, ${region.longitude}`
//             }}
//             textInputProps={{ placeholderTextColor: theme.colors.primaryDark, }}
//             styles={{
//               container: {
//                 flex: 0,
//                 position: "absolute",
//                 width: "100%",
//                 zIndex: 1,
//                 backgroundColor: theme.colors.primaryDark
//               },
//               textInputContainer: {
//                 color: theme.colors.primaryDark,
//               },
//               textInput: {
//                 color: theme.colors.primaryDark,
//               },
//               listView: {
//                 color: theme.colors.primaryDark,
//               },
//               row: {
//                 color: theme.colors.primaryDark,
//               },
//               description: {
//                 color: theme.colors.primaryDark,
//               },
//               predefinedPlacesDescription: {
//                 color: theme.colors.primaryDark,
//               },
//               separator: {
//                 color: theme.colors.primaryDark,
//               },
//               poweredContainer: {
//                 color: theme.colors.primaryDark,
//               },
//               powered: {
//                 color: theme.colors.primaryDark,
//               },
//             }}
//             onFail={(error) => ToastAndroid.show(error, ToastAndroid.LONG)}
//           />
//           <View style={styles.btnView}>
//             <Avatar.Text
//               style={{ marginBottom: 30, marginTop: 50 }}
//               size={22}
//               label="OR"
//             />
//             <Button
//               color={theme.colors.text}
//               uppercase={false}
//               labelStyle={{ color: theme.colors.primaryDark }}
//               mode='contained'
//               icon="crosshairs-gps"
//               onPress={() =>
//                 navigation.navigate('MapView', {
//                   latitude: location.latitude,
//                   longitude: location.longitude
//                 })
//               }>
//               Use Current Location
//             </Button>
         
//           </View>
//         </View>
//         :
//         <Container >
//           <ActivityIndicator
//             animating={true}
//             color={theme.colors.blue}
//             style={styles.loader}
//             size="large"
//           />
//         </Container>
//       }
//     </>
//   )
// }

// export default PickLocationScreen

// const styles = StyleSheet.create({
//   btnView: {
//     marginTop: 45,
//     width: '100%',
//     height: '20%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderTopWidth: 1,
//     borderTopColor: theme.colors.backgroundDark,
//   }
// })


import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform, PermissionsAndroid, ToastAndroid,Text } from 'react-native';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import { Button, Avatar, ActivityIndicator } from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Container from '../components/Container';
import { theme } from '../core/theme';
import MapViewScreen from './MapViewScreen';
import Row from '../components/Row';

const GOOGLE_PLACES_API_KEY = 'YOUR_API_KEY_HERE';

const PickLocationScreen = ({ navigation }) => {
  const [activeLoader, setActiveLoader] = useState(true);
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324
  });

  useEffect(() => {
    getLocation();
  }, []);

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setActiveLoader(false);
      },
      (error) => {
        ToastAndroid.show(`Code ${error.code}: ${error.message}`, ToastAndroid.LONG);
        console.log(error);
        setLocation(null);
        setActiveLoader(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (

    <View style={{ flex: 1 }}>
      
      {!activeLoader ? (
        <>
       
          <GooglePlacesAutocomplete
            placeholder="Search for area, street name..."
            fetchDetails={true}
            onPress={(data, details = null) => {
              if (details) {
                const { lat, lng } = details.geometry.location;
                navigation.navigate('MapView', { latitude: lat, longitude: lng });
              }
            }}
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: "en",
              components: "country:ind",
              types: "establishment",
              radius: 30000,
            }}
            textInputProps={{ placeholderTextColor: theme.colors.primaryDark }}
            styles={{
              container: { position: "absolute", width: "100%", zIndex: 1 },
              textInputContainer: { backgroundColor: "transparent" },
              textInput: { backgroundColor: "transparent", color: theme.colors.primaryDark },
              listView: { backgroundColor: theme.colors.background },
              separator: { backgroundColor: theme.colors.background },
            }}
            onFail={(error) => ToastAndroid.show(error, ToastAndroid.LONG)}
          />
          <View style={styles.btnView}>
            <Text style={{fontWeight:'bold', fontSize:15, color:'black'}}>OR</Text>
            {/* <Avatar.Text size={22} label="OR" /> */}
            {/* <Button
              color="#4b89df"
              uppercase={false}
              labelStyle={{ color: theme.colors.primaryDark }}
              mode='contained'
              icon="crosshairs-gps"
              onPress={() => navigation.navigate('Dashboard')}>
              select current Location
            </Button> */}

             <Button
                    color="#4b89df"
                    uppercase={false}
                    style={styles.lowerBtn}
                    labelStyle={{ color: theme.colors.text }}
                    mode='contained'
                    icon="check"
                    onPress={() =>
                        navigation.navigate('GeoInfo', {
                            latitude: location.latitude,
                            longitude: location.longitude
                        })
                    }>
                    select Current Location
                </Button>
          </View>
          <View style={styles.mapContainer}>
  <MapView
    style={{ flex: 1 }}
    region={{ ...location, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
    <Marker coordinate={{ ...location }} />
  </MapView>
</View>
          <Row style={styles.btnRow}>
                {/* <Button
                    color={theme.colors.default}
                    uppercase={false}
                    style={styles.lowerBtn}
                    labelStyle={{ color: theme.colors.primaryDark }}
                    mode='contained'
                    icon="keyboard-backspace"
                    onPress={() =>
                        navigation.navigate('PickLocation')
                    }>
                    Back
                </Button> */}
                {/* <Button
                    color={theme.colors.success}
                    uppercase={false}
                    style={styles.lowerBtn}
                    labelStyle={{ color: theme.colors.text }}
                    mode='contained'
                    icon="check"
                    onPress={() =>
                        navigation.navigate('GeoInfo', {
                            latitude: location.latitude,
                            longitude: location.longitude
                        })
                    }>
                    select Current Location
                </Button> */}
            </Row>
        </>
      ) : (
        <Container>
          <ActivityIndicator
            animating={true}
            color={theme.colors.blue}
            style={styles.loader}
            size="large"
          />
        </Container>
      )}
    </View>
  
    
  );
};

export default PickLocationScreen;

const styles = StyleSheet.create({
  btnView: {
    marginTop: 45,
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    // borderTopColor: theme.colors.backgroundDark,
    backgroundColor:'#d1dbe9'
  },
  lowerBtn:{
    width:"90%",
    marginTop:30
  },
  btnRow: {
        marginHorizontal:1,
        padding: 30,
        // width: windowWidth,
        // height: windowHeight / 15,
        justifyContent: 'space-around',
        backgroundColor:'#d1dbe9'
    },
    mapContainer: {
      flex: 1,
      // borderWidth: 2,
      // borderColor: 'blue',
      // borderRadius: 10, 
      overflow: 'hidden', 
      padding:20,
      backgroundColor:'#d1dbe9'
     
    },
});
