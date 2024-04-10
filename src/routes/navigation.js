// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { theme } from '../core/theme'
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { navigationRef } from "../helpers/navigationRef";

import { CustomDrawerContent } from '../components/CustomDrawerContent';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import SignupTwoScreen from '../screens/SignupTwoScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import ChangeNewPasswordScreen from '../screens/ChangeNewPasswordScreen';

import HomeScreen from '../screens/HomeScreen';
import PickLocationScreen from '../screens/PickLocationScreen';
import MapViewScreen from '../screens/MapViewScreen';
import GeoInfoScreen from '../screens/GeoInfoScreen';
import ImagesUploadScreen from '../screens/ImagesUploadScreen';
import QuestionsViewScreenNew from '../screens/QuestionsViewScreenNew';
import ConditionInfoScreen from '../screens/ConditionInfoScreen';
import ReportDownloadScreen from '../screens/ReportDownloadScreen';
import SurveyListScreen from '../screens/SurveyListScreen';
import ReportViewScreen from '../screens/ReportViewScreen';
import { Button} from 'react-native-paper';
import AddNewScreen from '../screens/conditionInfo/AddNewScreen';
import { TouchableOpacity } from 'react-native';
import { Text, StyleSheet, View } from 'react-native'
import ProfileScreen from '../screens/ProfileScreen';
import UserProfile from '../screens/ProfileScreen';
import NewSurvey from '../screens/NewSurveyScreen';

const Drawer = createDrawerNavigator();
const NativeStack = createNativeStackNavigator();

const Dashboard = (route) => {
    // const { latitude, longitude } = route.params;
    // const [location, setLocation] = React.useState({
    //     latitude: latitude,
    //     longitude: longitude
    // });
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#4b89df",
                },
                headerTintColor: theme.colors.text,
            }}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="SurveyList" component={SurveyListScreen} />
        </Drawer.Navigator>
    );
}

const App = (navigation) => {
    return (
        <NavigationContainer ref={navigationRef}>
            <NativeStack.Navigator>
                <NativeStack.Group>
                    <NativeStack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    <NativeStack.Screen
                        name="Signup"
                        component={SignupScreen}
                        options={{
                            title: "Register",
                            headerStyle: {
                                backgroundColor: "#4b89df",
                            },
                            headerTintColor:'white',
                        }}
                    />
                    <NativeStack.Screen
                        name="SignupTwo"
                        component={SignupTwoScreen}
                        options={{
                            title: "Registration",
                            headerStyle: {
                                backgroundColor: "#4b89df",
                            },
                            headerTintColor: theme.colors.text,
                        }}
                    />
                    <NativeStack.Screen
                        name="ForgetPassword"
                        component={ForgetPasswordScreen}
                        options={{ headerShown: false }}
                    />
                    <NativeStack.Screen
                        name="ChangeNewPassword"
                        component={ChangeNewPasswordScreen}
                        options={{ headerShown: false }}
                    />
                </NativeStack.Group>
                <NativeStack.Group>
                    <NativeStack.Screen
                        name="Dashboard"
                        component={Dashboard}
                        options={{ headerShown: false }}
                    />
                   <NativeStack.Screen
  name="PickLocation"
  component={PickLocationScreen}
  options={({ navigation }) => ({
    title: "Location Selection",
    headerStyle: {
      backgroundColor: "#4b89df",
    },
    headerTintColor: theme.colors.text,
    headerRight: () => (
        <Button
        onPress={() => {
            // Retrieve the location from wherever it's stored
            const location = { latitude: 37.78825, longitude: -122.4324 }; // Example location
            navigation.navigate('GeoInfo', {
                latitude: location.latitude,
                longitude: location.longitude
            })
        }}
        title="Submit"
        color="#fff"
    >Submit </Button>
    ),
  })}
/>
                    <NativeStack.Screen
                        name="MapView"
                        component={MapViewScreen}
                        options={{ headerShown: false }}
                    />
                    <NativeStack.Screen
                        name="GeoInfo"
                        component={GeoInfoScreen}
                        options={{
                            title: "Geographic Information",
                            headerStyle: {
                                backgroundColor: "#4b89df",
                            },
                            headerTintColor: theme.colors.text,
                        }}
                    />
                    <NativeStack.Screen
                        name="ImagesUpload"
                        component={ImagesUploadScreen}
                        options={{
                            title: "Upload Images",
                            headerStyle: {
                                backgroundColor: "#4b89df",
                            },
                            headerTintColor: theme.colors.text,
                        }}
                    />
                    <NativeStack.Screen
                        name="QuestionsView"
                        component={QuestionsViewScreenNew}
                        options={{
                            title: "Cortex-Survey",
                            headerStyle: {
                                backgroundColor: "#4b89df",
                            },
                            headerTintColor: theme.colors.text,
                        }}
                    />
                    <NativeStack.Screen
    name="ConditionInfo"
    component={ConditionInfoScreen}
    options={({ navigation }) => ({
        title: "Add New Survey",
        headerStyle: {
            backgroundColor: "#4b89df",
        },
        headerTintColor: theme.colors.text,
        headerRight: () => (
            <TouchableOpacity
                onPress={() => {
                    // Add your button's functionality here
                    // For example, navigate to another screen
                    navigation.navigate('addNewScreen');
                }}
                style={{ marginRight: 10 }}
            >
                <Text style={{ color: theme.colors.text , fontWeight:'bold'}}>Add New</Text>
            </TouchableOpacity>
        ),
    })}
/>

<NativeStack.Screen
                        name="addNewScreen"
                        component={AddNewScreen}
                        options={{
                            title: "Add New Survey",
                            headerStyle: {
                                backgroundColor: "#4b89df",
                            },
                            headerTintColor: theme.colors.text,
                        }}
                    />
                    <NativeStack.Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{
                            title: "Profile",
                            headerStyle: {
                                backgroundColor: "#4b89df",
                            },
                            headerTintColor: theme.colors.text,
                        }}
                    />
                    <NativeStack.Screen
                        name="NewSurvey"
                        component={NewSurvey}
                        options={{
                            title: "New Survey",
                            headerStyle: {
                                backgroundColor: "#4b89df",
                            },
                            headerTintColor: theme.colors.text,
                        }}
                    />
                    <NativeStack.Screen
                        name="ReportDownload"
                        component={ReportDownloadScreen}
                        options={{ headerShown: false }}
                    />
                    <NativeStack.Screen
                        name="ReportView"
                        component={ReportViewScreen}
                        options={{
                            title: "Cortex-Survey",
                            headerStyle: {
                                backgroundColor: "#4b89df",
                            },
                            headerTintColor: theme.colors.text,
                        }}
                    />
                </NativeStack.Group>
                {/* <NativeStack.Screen
                    name="Report"
                    component={ReportScreen}
                    options={{headerShown: false}}
                /> */}
            </NativeStack.Navigator>
        </NavigationContainer>
    );
}

export default App;