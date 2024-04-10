import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapView, { Marker, Callout, Circle } from 'react-native-maps'
import Container from '../components/Container'
import Row from '../components/Row'
import { Button, ActivityIndicator } from 'react-native-paper'
import { theme } from '../core/theme'
import PickLocationScreen from './PickLocationScreen'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MapViewScreen = ({ route, navigation }) => {

    const [activeLoader, setActiveLoader] = React.useState(true);

    const { latitude, longitude } = route.params;
    const [location, setLocation] = useState({
        latitude: latitude,
        longitude: longitude
    });

    return (
        <Container style={{ backgroundColor: theme.colors.backgroundLight }}>
            <PickLocationScreen style={{top:30}}/>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                provider="google"
            >
                <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
                <Marker
                    coordinate={location}
                    pinColor="black"
                    draggable={true}
                    onDragStart={(e) => {
                        console.log("Drag start", e.nativeEvent.coordinates)
                    }}
                    onDragEnd={(e) => {
                        setLocation({
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude
                        })
                    }}
                >
                    <Callout>
                        <Text>I'm here</Text>
                    </Callout>
                </Marker>
                <Circle center={location} radius={500} />
            </MapView>
            <Row style={styles.btnRow}>
                <Button
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
                </Button>
                <Button
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
                    Confirm This Location
                </Button>
            </Row>
        </Container>
    )
}

export default MapViewScreen

const styles = StyleSheet.create({
    map: {
        margin:10,
        alignSelf:'center',
        width: windowWidth/1,
        height: windowHeight - windowHeight / 2,
        bottom: windowHeight / 15,
    },
    btnRow: {
        padding: 5,
        width: windowWidth,
        height: windowHeight / 15,
        justifyContent: 'center'
    },
    lowerBtn: {
        borderRadius: 0,
        marginHorizontal: 5,
        height: 38
    }
})