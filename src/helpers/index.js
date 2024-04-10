import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, get } from "firebase/database";
import { db } from "../config/firebase";

//store string data
export const storeData = async (value, storage_Key) => {
    try {
        await AsyncStorage.setItem(storage_Key, value)
    } catch (e) {
        console.error('error', e);
    }
}

//store object data
export const storeDataObject = async (value, storage_Key) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(storage_Key, jsonValue)
    } catch (e) {
        console.error('error', e);
    }
}

export const getData = async (storage_Key) => {
    try {
        const value = await AsyncStorage.getItem(storage_Key)
        if (value === undefined || value === null) {
            return false
        }
        return value
    } catch (e) {
        console.error('error', e);
    }
}


export const getObjectData = async (storage_Key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(storage_Key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error('error', e);
    }
}

export const removeFew = async (keys) => {
    try {
        await AsyncStorage.multiRemove(keys)
    } catch (e) {
        console.log(e);
    }
    console.log('clear local-Storage')
}

export const getYears = (fromYear, toYear) => {
    let currentYear = fromYear === 'cu' ? new Date().getFullYear() : fromYear;
    var years = [];
    for (let index = currentYear - 1; index >= toYear; index--) {
        // console.log(index);
        years.push(index);
    }
    return years;
}

export const getTotalNoOfSurvey = () => {

    var totalNo = 0;
    get(ref(db, 'survey')).then((snapshot) => {
        if (snapshot.exists()) {
            const survey = snapshot.val();
            Object.keys(survey).map((result, index) => {
                // console.log(Object.keys(survey[result]).length);
                totalNo = totalNo + parseInt(Object.keys(survey[result]).length);
            });
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

    console.log(totalNo);
    
    return totalNo;
}