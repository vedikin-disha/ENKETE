import axios from "axios";

export const cortexSurveyApi = axios.create({
    baseURL: "https://www.cortexsolutions.in/cortexsurvey/api",
    // baseURL:'http://192.168.1.21:5000/',
    // baseURL:'http://192.168.1.100:6000',
    headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
});

export const cortexSurveyFirebaseApi = axios.create({
    baseURL: "https://cortexsolutions.in/surveyfirebase/api",
    

    headers:{ 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
});

export const pdfApi = "http://cortexsolutions.in/surveyfirebase/public/api/survey";