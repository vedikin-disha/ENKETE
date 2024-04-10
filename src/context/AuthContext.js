import createDataContext from "./createDataContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from "../helpers/navigationRef";
import { cortexSurveyFirebaseApi } from "../api/cortexSurveyApi";
import { Alert } from "react-native";
import axios from "axios";
import { getData, storeData, storeDataObject } from '../helpers'

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload }
        case 'signup':
            return { errorMessage: '', isSignedIn: action.payload }
        case 'signin':
            return { errorMessage: '', isSignedIn: action.payload }
        case 'signout':
            return { errorMessage: '', isSignedIn: action.payload }
        default:
            return state;
    }
}

const tryLocalSignin = (dispatch) => async () => {
    try {
        const token = await AsyncStorage.getItem('@signinStatus')
        if (token == '1') {
            dispatch({ type: 'signin', payload: true })
            RootNavigation.navigate('Dashboard');
        } else {
            RootNavigation.navigate('Login');
        }
    } catch (e) {
        // saving error
    }
};

const signup = (dispatch) => async ({ name, phone, pincode, dob, gender }) => {
    console.log(name.value)
    try {
        //make api request to sign up with that phone 

        //if signed up, modify our state, and say that we are athenticated

        //if signin fail, need to show error massage

        const response = await digiclinicApi.post('/patient/register', {
            "name": name.value,
            "phone_no": phone.value,
            "dob": dob.value,
            "gender": gender.value,
        });

        console.log(response.data)

        if (response.data.status == 1) {

            dispatch({ type: 'signup', payload: '1' })

            Alert.alert(
                'Successfull!',
                response.data.message,
                [
                    { text: 'OK', onPress: () => RootNavigation.navigate('Signin') },
                ],
                { cancelable: false },
            );

        } else {
            dispatch({ type: 'add_error', payload: response.data.message })
            return
        }

    } catch (e) {
        console.log(e);
    }
};

const signin = (dispatch) => async ({ email, password }) => {
    try {

        var data = JSON.stringify({
            "email": email,
            "password": password
        });
        
        const response = await cortexSurveyFirebaseApi.post('/login', data);

        console.log(response.data);

        if (response.data.error == 0) {

            const jsonValue = JSON.stringify(response.data.data);

            await AsyncStorage.setItem("@userdata", jsonValue);
            await storeData(JSON.stringify(response.data.data.id), "@userId");
            
            //update signin status
            await AsyncStorage.setItem("@signinStatus", "1");

            dispatch({ type: "signin", payload: true, });

            //navigate to patient Dashboard
            RootNavigation.navigate("Dashboard");
        } else {
            Alert.alert(
                'Error!',
                response.data.message,
                [
                    { text: 'OK', onPress: () => console.log('ok') },
                ],
                { cancelable: false },
            );
            dispatch({ type: 'add_error', payload: response.data.message })
            return
        }

    } catch (e) {
        console.log(e);
    }
};

const signout = dispatch => async () => {
    try {
        await AsyncStorage.setItem('@signinStatus', '0');
        await AsyncStorage.removeItem('@userdata');
        dispatch({ type: 'signout', payload: false });

        RootNavigation.navigate('Login');
    } catch (e) {
        console.log(e);
    }
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup, tryLocalSignin },
    { isSignedIn: false }
);