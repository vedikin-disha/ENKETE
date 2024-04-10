import { StyleSheet, Text, View, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useContext, useRef, useState } from 'react'
import { theme } from '../core/theme'
import Container from '../components/Container'
import Row from '../components/Row'
import { TextInput, Title, Button, ActivityIndicator, Caption } from 'react-native-paper'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Geocoder from 'react-native-geocoding';
import { getData, getObjectData, storeData, storeDataObject } from '../helpers'
import { ref, set } from "firebase/database";
import { db } from "../config/firebase";
import uuid from 'react-native-uuid';
import { Context } from "../context/AuthContext";
import { Formik } from 'formik';
import * as Yup from 'yup';
import "yup-phone";
import { cortexSurveyApi, cortexSurveyFirebaseApi } from '../api/cortexSurveyApi'
import config from '../config/Configuration'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { selectedDisaster, selectedAssessmentMethod } from './HomeScreen';
import { NavigationContainer } from '@react-navigation/native'


// const API_KEY = "AIzaSyCss9ZwOhKSje-44Fz35U-Y11sK3JhoSAE";
const API_KEY = "AIzaSyAUlbxHExenYwhZRuWvQvoKy2W6_sRuGck";
const country = '1559032693';

const GeoInfoScreen = ({ route, navigation }) => {

  const { state } = useContext(Context);

  const formRef = useRef();

  const [activeLoader, setActiveLoader] = React.useState(true);
  const [submitLoader, setSubmitLoader] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
   const [dataFetched, setDataFetched] = useState(false);

  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);

  const { latitude, longitude } = route.params;
  const [geoInfo, setGeoInfo] = React.useState({
    "building_name": '',
    "street_name": '',
    "city": "",
    "district": '',
    "state": "",
    "pincode": '',
    "local_authority": '',
    "lat": '',
    "long": '',
    "microzonation": "",
    "soil": '',
    "owner_name": '',
    "owner_aadhar": '',
    "owner_phone": '',
  });
  const [selectedCityId, setSelectedCityId] = useState("");
  const [disasterId, setDisasterId] = useState(null);
  const [assesmentId,setAssesmentId] = useState()
  const [selectedStateId, setSelectedStateId] = useState("");
  const [selectedStateID, setSelectedState] = useState()

  const [microzonation, setMicrozonation] = useState('');
  const [soil, setSoil] = useState('');

  // const [microzonationData, setMicrozonationData] = useState({
  //   microzonation: '',
  //   soil: ''
  // });

  
  // useEffect(() => {
  //   if (selectedCityId) {
  //     fetchMicroAndSoil()
  //       .then(data => {
  //         setMicrozonationData(data);
  //         console.log("Data Form",setMicrozonationData.data);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching microzonation and soil:', error);
  //       });
  //   }
  // }, [selectedCityId]);


  const geoInfoSchema = Yup.object().shape({
    building_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Building Name is Required'),
    city: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('city is Required'),
    district: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('District is Required'),
    state: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('state is Required'),
    pincode: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('pincode is Required'),
    pincode: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('pincode is Required'),
    microzonation: Yup.string().required('microzonation is Required'),
    soil: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('soil is Required'),
    owner_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('owner_name is Required'),
    owner_phone: Yup.string().phone("IN", "Please enter a valid phone number").required("phone number is required"),
  });


  // useEffect(() => {
  //   const getDisasterId = async () => {
  //     try {
  //       const storedDisasterId = await AsyncStorage.getItem('disasterId');
  //       setDisasterId(storedDisasterId);
  //       console.log('Stored Disaster ID:', storedDisasterId);
  //     } catch (error) {
  //       console.log('Error retrieving disasterId from AsyncStorage:', error);
  //     }
  //   };

  //   getDisasterId();
  // }, []);


  // call when first load
  useEffect(() => {
    //load state
    fetchState();
    if (latitude !== '' && longitude !== '') {
      initGeoInfo(latitude, longitude);
    }
  }, []);

  // const fetchState = async () => {
  //   try {
  //     const results = await cortexSurveyApi.get('state?country=' + country);
  //     const res = results.data;
  //     if (res.error === 0) {
  //       const states = res.data.map((item, j) => {
  //         return item['state'];
  //       });
  //       if (states.length > 0) {
  //         setStates(states);
  //       }
  //     }
  //   } catch (error) {
  //     console.log("🚀 ~ file: GeoInfoScreen.js:79 ~ fetchState ~ error", error);
  //   }
  // }


  const fetchState = async () => {
    const requestBody = {
      auth_key: config.authKey
    };
  
    const url = `${config.baseUrl}/state`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      if (data.is_successful === "1") {
        setStates(data.data);
        
      } else {
        // Handle unsuccessful response
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      // Handle error appropriately
    }
  };
  

  // const fetchState = () => {
  //   const requestBody = {
  //     auth_key: config.authKey
  //   };
  
  //   const url = `${config.baseUrl}/state`;
  
  //   fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(requestBody)
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     if (data.is_successful === "1") {
  //       setStates(data.data);
  //     }
  //   })
  //   .catch(error => {
  //     console.error('There was a problem with the fetch operation:', error);
  //   });
  // };
  // useEffect(() => {
  //   if (selectedStateId !== null) {
  //     // Store the selected state ID in AsyncStorage
  //     AsyncStorage.setItem('selectedStateId', selectedStateId.toString())
  //       .then(() => console.log('State ID stored successfully'))
  //       .catch(error => console.error('Error storing state ID:', error));
  //   }
  // }, [selectedStateId]);

  const fetchCities = (stateName) => {
    const requestBody = {
      auth_key: config.authKey,
      state_name: stateName
    };
  console.log(requestBody);
    const url = `${config.baseUrl}/city`;
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.is_successful === "1") {
        setCities(data.data);
      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };


//   useEffect(() => {
//     if (selectedCityId) {
//         fetchMicroAndSoil(selectedCityId)
//             .then(data => {
//                 // Log the fetched data
//                 console.log('Microzonation and Soil data:', data);
//                 // Update state with fetched data
//                 setMicrozonation(data.microzonation);
//                 setSoil(data.soil);
//                 console.log('Microzonation value set:', data.microzonation);
//                 console.log('Soil value set:', data.soil);
//             })
//             .catch(error => {
//                 console.error('Error fetching microzonation and soil:', error);
//             });
//     }
// }, [selectedCityId]);

//   useEffect(() => {
//     console.log('Selected City ID :', selectedCityId);
// }, [selectedCityId]);

  // useEffect(() => {
  //   if (selectedCityId !== null) {
  //     // Store the selected city ID in AsyncStorage
  //     AsyncStorage.setItem('selectedCityId', selectedCityId.toString())
  //       .then(() => console.log('City ID stored successfully'))
  //       .catch(error => console.error('Error storing city ID:', error));
  //   }
  // }, [selectedCityId]);

  // const fetchCities = async (state) => {
  //   try {
  //     const results = await cortexSurveyApi.get('city?country=' + country + '&state=' + state);
  //     const res = results.data;
  //     if (res.error === 0) {
  //       const cities = res.data.map((item, j) => {
  //         return item['city'];
  //       });
  //       if (states.length > 0) {
  //         setCities(cities);
  //       }
  //     }
  //   } catch (error) {
  //     console.log("🚀 ~ file: GeoInfoScreen.js:79 ~ fetchState ~ error", error);
  //   }
  // }

  const initGeoInfo = (latitude, longitude) => {
    Geocoder.init(API_KEY);

    Geocoder.from(latitude, longitude).then(json => {

      console.log('results', json.results);

      var address = [];

      if (address.length === 0) {
        address = json.results.filter((value, index) => {
          return value.types[0] === 'premise';
        });
      }

      if (address.length === 0) {
        address = json.results.filter((value, index) => {
          return value.types[0] === 'street_address';
        });
      }

      if (address.length === 0) {
        address = json.results.filter((value, index) => {
          return value.types[0] === 'establishment';
        });
      }

      console.log('address', address);

      try {

        const addressComponent = address[0].address_components;

        //set pincode
        let pincode = '';
        Object.entries(addressComponent).map(([key, value], index) => {
          if (value.types.includes("postal_code")) {
            pincode = value.long_name;
          }
        })

        //set state
        let state = '';
        Object.entries(addressComponent).map(([key, value], index) => {
          if (value.types.includes("administrative_area_level_1")) {
            state = value.long_name;
          }
        })

        //set district
        let district = '';
        Object.entries(addressComponent).map(([key, value], index) => {
          if (value.types.includes("administrative_area_level_2")) {
            district = value.long_name;
          }
        })

        //set city
        let city = '';
        Object.entries(addressComponent).map(([key, value], index) => {
          if (value.types.includes("administrative_area_level_3")) {
            city = value.long_name;
          }
        })

        //set local_authority
        let local_authority = '';
        Object.entries(addressComponent).map(([key, value], index) => {
          if (value.types.includes("sublocality_level_2")) {
            local_authority = value.long_name;
          }
        })

        //set street_name
        let street_name = '';
        Object.entries(addressComponent).map(([key, value], index) => {
          if (value.types.includes("route")) {
            street_name = value.long_name;
          }
        })

        setGeoInfo((prev) => {
          return {
            ...prev,
            "street_name": street_name,
            "local_authority": local_authority,
            // "city": city,
            "district": district,
            // "state": state,
            "pincode": pincode,
            "lat": JSON.stringify(latitude),
            "long": JSON.stringify(longitude),
            // "microzonation": result.microzonations,
            // "soil": result.soil
          }
        })

        setActiveLoader(false);

      } catch (error) {
        console.log('error with fetch location data', error);
      }

    })
    .catch(error => console.warn(error));
  }


  const fetchMicroAndSoil = async () => {
    try {
      const storedDisasterId = await AsyncStorage.getItem('disasterId');
      const storedAssessmentId = await AsyncStorage.getItem('assessmentMethodId');

      AsyncStorage.setItem('selectedStateId', selectedStateId);
      AsyncStorage.setItem('selectedCityId', selectedCityId);

      const requestBody = {
        city_id: selectedCityId,
        disaster_id: storedDisasterId,
        assessment_method_id: storedAssessmentId,
        state_id: selectedStateId,
        country: "1559032693",
        auth_key: "ltnfvh18zxItOhP2qzrtynnVvbyniu"
      };

      const url = `${config.baseUrl}/microzonation`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

      if (responseData.is_successful === "1" && responseData.data && responseData.data.length > 0) {
        const microzonationData = responseData.data[0].microzonation;
        const soilData = responseData.data[0].soil;

        setMicrozonation(microzonationData);
        setSoil(soilData);
        setDataFetched(true); // Set dataFetched to true after successfully fetching data
      } else {
        console.error('No microzonation or soil data found in the response');
      }
    } catch (error) {
      console.error('Error retrieving microzonation data:', error);
    }
  };

  useEffect(() => {
    if (!dataFetched) {
      fetchMicroAndSoil(); // Fetch data only if it hasn't been fetched already
    }
  }, [selectedCityId]); // Trigger fetchMicroAndSoil when selectedCityId changes

  const handleCitySelection = (selectedCityId) => {
    setSelectedCityId(selectedCityId);
    console.log('Selected City ID:', selectedCityId);
  };


  // const fetchMicroAndSoil = async (city) => {
  //   const cuState = formRef.current.values.state;
  //   let questionFilters = await getObjectData('@questionFilters');
  //   const url = 'microzonation?city=' + city + '&disaster_zone=' + questionFilters.disasterType + '&assesment_method=' + questionFilters.assesment_method + '&country='+ country + '&state=' + cuState;
  //   console.log('url: ', url);
  //   const res = await cortexSurveyApi.get(url);
  //   const result = res.data;
  //   if (result.error === 0) {
  //     return {
  //       microzonations: result.data.microzonation ? result.data.microzonation : "",
  //       soil: result.data.soil ? result.data.soil : ''
  //     }
  //   }
  // }


//   const fetchMicroAndSoil = async () => {
//     const storedDisasterId = await AsyncStorage.getItem('disasterId');
//       console.log('Stored Disaster ID:', storedDisasterId);
//     const storedAssessmentId = await AsyncStorage.getItem('assessmentMethodId');
//       console.log('Stored Assessment ID:', storedAssessmentId);
//     AsyncStorage.setItem('selectedStateId', selectedStateId)
//       console.log('Stored State ID:', selectedStateId);
//     AsyncStorage.setItem('selectedCityId', selectedCityId)
//       console.log('Stored City ID:', selectedCityId);
//   const requestBody = {
//     city_id:selectedCityId ,
//     disaster_id: storedDisasterId,
//     assessment_method_id: storedAssessmentId,
//     state_id: selectedStateId,
//     country: "1559032693", 
//     auth_key: "ltnfvh18zxItOhP2qzrtynnVvbyniu" 
//   };

// //   console.log('REQUEST BODY', requestBody);

// //   const url = `${config.baseUrl}/microzonation`;

// //   const response = await fetch(url, {
// //     method: 'POST',
// //     headers: {
// //       'Content-Type': 'application/json'
// //     },
// //     body: JSON.stringify(requestBody)
// //   });

// //   if (!response.ok) {
// //     throw new Error('Network response was not ok');
// //   }

// //   const data = await response.json();

// //   if (data.is_successful === "1" && data.data && data.data.length > 0) {
// //     return {
// //       microzonation: data.data[0].microzonation,
// //       soil: data.data[0].soil
// //     };
// //   } else {
// //     throw new Error(data.success_message || 'Microzonation data retrieval failed');
// //   }
//     // };
    
 
//     console.log('REQUEST BODY', requestBody);

//     const url = `${config.baseUrl}/microzonation`;

//     return fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(requestBody)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         if (data.is_successful === "1" && data.data && data.data.length > 0) {
//             return {
//                 microzonation: data.data[0].microzonation,
//                 soil: data.data[0].soil
//             };
//         } else {
//           // throw new Error(data.success_message || 'Microzonation data retrieval failed');
//           console.error('Error retrieving microzonation data:', error);
//           throw error;
//         }
//     });
//   };
// const fetchMicroAndSoil = async () => {
//   try {
//       const storedDisasterId = await AsyncStorage.getItem('disasterId');
//       console.log('Stored Disaster ID:', storedDisasterId);
      
//       const storedAssessmentId = await AsyncStorage.getItem('assessmentMethodId');
//       console.log('Stored Assessment ID:', storedAssessmentId);
      
//       AsyncStorage.setItem('selectedStateId', selectedStateId)
//       console.log('Stored State ID:', selectedStateId);
      
//       AsyncStorage.setItem('selectedCityId', selectedCityId)
//       console.log('Stored City ID:', selectedCityId);
      
//       const requestBody = {
//           city_id: selectedCityId,
//           disaster_id: storedDisasterId,
//           assessment_method_id: storedAssessmentId,
//           state_id: selectedStateId,
//           country: "1559032693",
//           auth_key: "ltnfvh18zxItOhP2qzrtynnVvbyniu"
//       };

//       console.log('REQUEST BODY', requestBody);

//       const url = `${config.baseUrl}/microzonation`;

//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(requestBody)
       
        
//       }
//       );
    
//     console.log('RESPONSE', response);
    
    
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
    
//     const data = await response.json();
// console.log("DATA", data); // Check the structure of data in the console
// if (data.is_successful === "1") { // Note that is_successful is a string in your data
//     // Set microzonation and soil values from response
//     if (data.data && data.data.length > 0) {
//         const microzonation = data.data[0].microzonation;
//         const soil = data.data[0].soil;
//         console.log('Microzonation:', microzonation);
//         console.log('Soil:', soil);
//         setMicrozonation(microzonation);
//         setSoil(soil);
//     } else {
//         console.error('No microzonation or soil data found in the response');
//     }
// } else {
//     console.error('Error retrieving microzonation data:', data.success_message || 'Microzonation data retrieval failed');
//     throw new Error(data.success_message || 'Microzonation data retrieval failed');
// }
// } catch (error) {
//     console.error('Error retrieving microzonation data:', error);
//     throw error; // Rethrow the error to handle it in the calling function
// }
//   };
  
 
  

// const handleCitySelection = (selectedCityId) => {
//   setSelectedCityId(selectedCityId);

//   console.log('Selected City ID:', selectedCityId);
//   fetchMicroAndSoil();

//   // // Call fetchMicroAndSoil when the user selects a city
//   // fetchMicroAndSoil(selectedCityId,selectedStateId, disasterId,assesmentId,)
//     // .then(data => {
//     //   // Update microzonation and soil state variables
//     //   setMicrozonation(data.microzonation);
//     //   setSoil(data.soil);
//     //   console.log("setMicrozonation", setMicrozonation);
//     // })
//     // .catch(error => {
//     //   console.error('Error fetching microzonation and soil:', error);
//     // });
// };








// useEffect(() => {
//   fetchMicroAndSoil()
//     .then(data => {
//       setValues({
//         microzonation: data.microzonation,
//         soil: data.soil
//       });
//     })
//     .catch(error => {
//       console.error('Error fetching microzonation data:', error);
//       setErrors({ microzonation: true, soil: true });
//     });
// }, []);
  
// const setMicroAndSoil = (disasterId, assessmentMethodId, cityId, stateId) => {
//   fetchMicroAndSoil(disasterId, assessmentMethodId, cityId, stateId)
//     .then(result => {
//       console.log(result);
//       setGeoInfo(prev => ({
//         ...prev,
//         microzonation: result.microzonation,
//         soil: result.soil
//       }));
//     })
//     .catch(error => {
//       console.error('Error retrieving microzonation data:', error);
//     });
// };

  
//   const setMicroAndSoil = () => {
//     fetchMicroAndSoil()
//     .then(result => {
//         console.log(result);
//         setGeoInfo(prev => ({
//             ...prev,
//             microzonation: result.microzonation,
//             soil: result.soil
//         }));
//     })
//     .catch(error => {
//         console.error('Error retrieving microzonation data:', error);
//     });
// };

  
  
  

// const setMicroAndSoil = (disasterId, assessmentMethodId, cityId, stateId) => {
//   fetchMicroAndSoil(disasterId, assessmentMethodId, cityId, stateId)
//     .then(result => {
//       console.log(result);
//       setGeoInfo(prev => ({
//         ...prev,
//         microzonation: result.microzonation,
//         soil: result.soil
//       }));
//     })
//     .catch(error => {
//       console.error('Error retrieving microzonation data:', error);
//     });
//   };
  
  const handleSubmit = () => {
    navigation.navigate('ImagesUpload');
}

  const handleFormChange = (key, text) => {
    setGeoInfo((prev) => {
      return (
        {
          ...prev,
          [key]: text
        }
      )
    });
  }

  console.log(geoInfo);

  // const storeFirebase = async (userId, cortexServerData, newSurveyData) => {
  //   let getSurveyId = await getData('@surveyId');
  //   if (!getSurveyId) {
  //     getSurveyId = cortexServerData.last_survey_id;
  //     await storeData(getSurveyId, '@surveyId');
  //   }

  //   if (getSurveyId) {
  //     //save in firebase database
  //     set(ref(db, 'survey/' + userId + '/' + getSurveyId), newSurveyData).then((result) => {
  //       console.log('success');
  //       setIsDisabled(false);
  //       setSubmitLoader(false);
  //       ToastAndroid.show('Geo info saved successfull', ToastAndroid.SHORT);
  //       navigation.navigate('ImagesUpload');
  //     }).catch((err) => {
  //       console.log(err);
  //     });
  //   }
  // }

  // const saveAndContinue = async (values) => {

  //   setIsDisabled(true);
  //   setSubmitLoader(true);

  //   try {

  //     const newSurvey = { ...values };
  //     let questionFilters = await getObjectData('@questionFilters');

  //     var userId;
  //     const user_id = await getData('@userId');
  //     if (user_id) {
  //       userId = user_id;
  //     }else{
  //       newSurvey['is_guest'] = "Y";
  //       const guestUserId = await getData('@guestUserId');
  //       if(guestUserId){
  //         userId = guestUserId;
  //       }else{
  //         userId = uuid.v4();
  //         await storeData(userId, '@guestUserId');
  //       }
  //     }
            
  //     newSurvey['user_id'] = userId;
  //     newSurvey['disaster_type'] = questionFilters.disasterType;
  //     newSurvey['assesment_method'] = questionFilters.assesment_method;
  //     newSurvey['structure_type'] = questionFilters.structure_type;

  //     console.log('newSurvey', newSurvey);

  //     const cortexServerRes = await cortexSurveyFirebaseApi.post('surveyDataEntry', newSurvey);
  //     if (cortexServerRes.data && cortexServerRes.data.error === 0) {
  //       await storeFirebase(userId, cortexServerRes.data.data, newSurvey);
  //     }

  //   } catch (error) {
  //     console.log("🚀 ~ file: GeoInfoScreen.js:227 ~ saveAndContinue ~ error", error);
  //   }

  // }

  return (
    <>
      {!activeLoader ?

        <Container style={styles.container}>
          <Formik
            enableReinitialize
            initialValues={geoInfo}
            // validationSchema={geoInfoSchema}
            innerRef={formRef}
            onSubmit={values => saveAndContinue(values)}
          >
            {({ handleChange, setFieldValue, values, errors, touched }) => (
              <ScrollView>
                <View style={styles.form}>
                  <Title style={styles.title}>Geographical Information</Title>
                  <TextInput
                    theme={{ colors: { text: 'black' } }}
                    label="Name Of The Building"
                    style={styles.inputTxt}
                    mode='outlined'
                    onChangeText={handleChange('building_name')}
                    value={values.building_name}
                    error={errors.building_name ? true : false}
                  />
                  <TextInput
                    theme={{ colors: { text: 'black' } }}
                    label="Street Name"
                    style={styles.inputTxt}
                    mode='outlined'
                    onChangeText={handleChange('street_name')}
                    value={values.street_name}
                    error={errors.street_name ? true : false}
                  />
                  <TextInput
                    theme={{ colors: { text: 'black' } }}
                    label="District"
                    style={styles.inputTxt}
                    mode='outlined'
                    onChangeText={handleChange('district')}
                    value={values.district}
                    error={errors.district ? true : false}
                  />
                  {/* <TextInput
                    label="City"
                    style={styles.inputTxt}
                    mode='outlined'
                    onChangeText={handleChange('city')}
                    onEndEditing={() => setMicroAndSoil(values.city)}
                    value={values.city}
                    error={errors.city ? true : false}
                  /> */}
                  <Row style={{ marginHorizontal: 0 }}>
                    {/* <TextInput
                      label="District"
                      style={styles.inputTxtInline}
                      mode='outlined'
                      onChangeText={handleChange('district')}
                      value={values.district}
                      error={errors.district ? true : false}
                    /> */}
                     <SelectDropdown
                      // data={states}
                      data={states.map(states => states.state_name)}
                      onSelect={(selectedItem, index) => {
                        setFieldValue('state', selectedItem)
                        const selectedState = states[index];
                        console.log('Selected State ID:', selectedState.state_id);
                        setSelectedStateId(selectedState.state_id);
                        handleFormChange('state', selectedItem)
                        setMicrozonation(selectedDisaster, selectedAssessmentMethod, selectedItem, state);
                        fetchCities(selectedItem);
                      }}
                      defaultValue={values.state}
                      defaultButtonText={'State'}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                      buttonStyle={{ ...styles.dropdown1BtnStyle, ...{ borderColor: errors.microzonation && touched.microzonation ? theme.colors.danger : theme.colors.primary } }}
                      buttonTextStyle={{ ...styles.dropdown1BtnTxtStyle, ...{ color: errors.microzonation && touched.microzonation ? theme.colors.danger : theme.colors.textDark } }}
                      renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={theme.colors.primary} size={18} />;
                      }}
                      dropdownIconPosition={'right'}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                    {/* <TextInput
                      label="State"
                      style={styles.inputTxtInline}
                      mode='outlined'
                      onChangeText={handleChange('state')}
                      value={values.state}
                      error={errors.state ? true : false}
                    /> */}
                    <SelectDropdown
                      // data={cities}
                      data={cities.map(cities => cities.city_name)}
                      onSelect={(selectedItem, index) => {
                        setFieldValue('city', selectedItem)
                        const selectedCity = cities[index]
                        const selectedCityId = cities[index].city_id;
                       handleCitySelection(selectedCityId);
                        console.log('Selected City ID:', selectedCity.city_id);
                        setSelectedCityId(selectedCity.city_id)
                        fetchCities(selectedItem, selectedCity.city_id);
                        setMicrozonation(selectedDisaster, selectedAssessmentMethod, selectedItem, cities);
                        fetchCities(selectedItem)
                      }}
                      defaultValue={values.city}
                      defaultButtonText={'City'}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                      buttonStyle={{ ...styles.dropdown1BtnStyle, ...{ borderColor: errors.microzonation && touched.microzonation ? theme.colors.danger : theme.colors.primary } }}
                      buttonTextStyle={{ ...styles.dropdown1BtnTxtStyle, ...{ color: errors.microzonation && touched.microzonation ? theme.colors.danger : theme.colors.textDark } }}
                      renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={theme.colors.primary} size={18} />;
                      }}
                      
                      dropdownIconPosition={'right'}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                  </Row>
                  <Row style={{ marginHorizontal: 0 }}>
                    <TextInput
                        theme={{ colors: { text: 'black' } }}
                      label="Pincode"
                      style={styles.inputTxtInline}
                      mode='outlined'
                      onChangeText={handleChange('pincode')}
                      value={values.pincode}
                      error={errors.pincode ? true : false}
                    />
                    <TextInput
                        theme={{ colors: { text: 'black' } }}
                      label="Local Authority"
                      style={styles.inputTxtInline}
                      mode='outlined'
                      onChangeText={handleChange('local_authority')}
                      value={values.local_authority}
                      error={errors.local_authority ? true : false}
                    />
                  </Row>
                  <Row style={{ marginHorizontal: 0 }}>
                    <TextInput
                        theme={{ colors: { text: 'black' } }}
                      label="Latitude"
                      style={styles.inputTxtInline}
                      mode='outlined'
                      onChangeText={handleChange('lat')}
                      value={values.lat}
                      error={errors.lat ? true : false}
                    />
                    <TextInput
                        theme={{ colors: { text: 'black' } }}
                      label="Longitude"
                      style={styles.inputTxtInline}
                      mode='outlined'
                      onChangeText={handleChange('lang')}
                      value={values.long}
                      error={errors.long ? true : false}
                    />
                  </Row>
                  <Row style={{ marginHorizontal: 0 }}>
                    {/* <SelectDropdown
                      data={values.microzonation}
                      onSelect={(selectedItem, index) => {
                        setFieldValue('microzonation', selectedItem)
                      }}
                      defaultButtonText={'Microzonation'}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                      buttonStyle={{ ...styles.dropdown1BtnStyle, ...{ borderColor: errors.microzonation && touched.microzonation ? theme.colors.danger : theme.colors.primary } }}
                      buttonTextStyle={{ ...styles.dropdown1BtnTxtStyle, ...{ color: errors.microzonation && touched.microzonation ? theme.colors.danger : theme.colors.primary } }}
                      renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={theme.colors.primary} size={18} />;
                      }}
                      dropdownIconPosition={'right'}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                    />  */}


                    {/* ////////////// */}
                    {/* <TextInput
                      label="Microzonation"
                      style={styles.inputTxtInline}
                      mode='outlined'
                      editable={false}
                      onChangeText={handleChange('microzonation')}
                      value={values.microzonation}
                      error={errors.microzonation ? true : false}
                    />
                    <TextInput
                      label="Soil"
                      style={styles.inputTxtInline}
                      mode='outlined'
                      editable={false}
                      onChangeText={handleChange('soil')}
                      value={values.soil}
                      error={errors.soil ? true : false}
                    /> */}

                    <TextInput
                        theme={{ colors: { text: 'black' } }}
            label="Microzonation"
            style={styles.inputTxtInline}
            mode='outlined'
            editable={false}
            value={microzonation} 
        />
                    <TextInput
                        theme={{ colors: { text: 'black' } }}
            label="Soil"
            style={styles.inputTxtInline}
            mode='outlined'
            editable={false}
            value={soil} 
        />

{/* <TextInput
        label="Microzonation"
        style={styles.inputTxtInline}
        mode='outlined'
        editable={false}
        value={values.microzonation}
        error={errors.microzonation}
      />
      <TextInput
        label="Soil"
        style={styles.inputTxtInline}
        mode='outlined'
        editable={false}
        value={values.soil}
        error={errors.soil}
      /> */}
                  </Row>
                </View>
                <View style={styles.form}>
                  <Title style={styles.title}>Owner's Information</Title>
                  <TextInput
                    theme={{ colors: { text: 'black' } }}
                    label="Owners Name"
                    style={styles.inputTxt}
                    mode='outlined'
                    onChangeText={handleChange('owner_name')}
                    value={values.owner_name}
                    error={errors.owner_name ? true : false}
                  />
                  <Row style={{ marginHorizontal: 0 }}>
                    <TextInput
                      theme={{ colors: { text: 'black' } }}
                      keyboardType="numeric"
                      label="Aadhar Number"
                      style={styles.inputTxt}
                      mode='outlined'
                      onChangeText={handleChange('owner_aadhar')}
                      value={values.owner_aadhar}
                      error={errors.owner_aadhar ? true : false}
                    />
                  </Row>
                  <View style={{ fleex: 1 }}>
                    <TextInput
                      theme={{ colors: { text: 'black' } }}
                      keyboardType="numeric"
                      label="Phone Number"
                      style={styles.inputTxt}
                      mode='outlined'
                      onChangeText={handleChange('owner_phone')}
                      value={values.owner_phone}
                      error={errors.owner_phone ? true : false}
                    />
                    {errors.owner_phone && touched.owner_phone ? (
                      <Text>{errors.owner_phone}</Text>
                    ) : null}
                  </View>
                </View>
                <View style={styles.form}>
                  <Button
                     color="#4b89df"
                    mode='contained'
                    contentStyle={{ height: 45 }}
                    labelStyle={{ fontSize: 18 }}
                    uppercase={false}
                    disabled={isDisabled}
                    loading={submitLoader}
                    onPress={handleSubmit}
                  >
                   <Text style={{color:'white'}}> {!submitLoader ? 'Continue' : 'Submitting ...'}</Text>
                  </Button>
                </View>
              </ScrollView>
            )}
          </Formik>
        </Container>
        :
        <Container>
          <ActivityIndicator
            animating={true}
            color={theme.colors.blue}
            style={styles.loader}
            size="large"
          />
          <Caption style={{ textAlign: 'center' }}>Please wait, while we obtain location information ...</Caption>
        </Container>
      }
    </>
  )
}

export default GeoInfoScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor:'',
    justifyContent: 'flex-start',
  },
  title: {
    fontWeight:'bold',
    color:'black',
    paddingTop: 5,
    paddingBottom: 10
  },
  form: {
    marginTop: 5,
    paddingHorizontal: 15,
    paddingBottom: 10
  },
  inputTxt: {
    backgroundColor:'white',
    width: '100%',
    height: 50,
  },
  inputTxtInline: {
    backgroundColor:'white',
    width: '49%',
    height: 50,
  },
  dropdown1BtnStyle: {
    width: '49%',
    height: 50,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  dropdown1BtnTxtStyle: {
    color: 'black',
    textAlign: 'left',
  },
  dropdown1DropdownStyle: {
    backgroundColor: theme.colors.background,
    
    color: theme.colors.primary
  },
  dropdown1RowStyle: {
    backgroundColor: theme.colors.background,
   
    borderBottomColor: '#C5C5C5',
    color: theme.colors.primary
  },
  dropdown1RowTxtStyle: {
    color: theme.colors.primary,
    textAlign: 'left'
  },
})


