import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { theme } from '../core/theme'

import Container from '../components/Container';
import Row from '../components/Row';
import HomeCard from '../components/HomeCard';
import { Button, Headline } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { storeDataObject, removeFew, getData } from '../helpers';
import { cortexSurveyApi, cortexSurveyFirebaseApi } from '../api/cortexSurveyApi';
import config from '../config/Configuration';
import AsyncStorage from '@react-native-async-storage/async-storage'

const NewSurvey = ({ navigation }) => {

  const [totalNoSurvey, setTotalNoSurvey] = React.useState(0);
  const [surveyTillDate, setSurveyTillDate] = React.useState('N/A');
  const [disasters, setDisasters] = React.useState([]);
  const [disastersArray, setDisastersArray] = React.useState([]);
  const [assesments, setAssesments] = React.useState([]);
  const [assesmentsArray, setAssesmentsArray] = React.useState([]);
  const [structures, setStructures] = React.useState([]);
  const [structuresArray, setStructuresArray] = React.useState([]);
  const [selectedDisaster, setSelectedDisaster] = useState(null);
  const [assessmentMethods, setAssessmentMethods] = useState([]);
  const [selectedAssessmentMethod, setSelectedAssessmentMethod] = useState('');



  useEffect(() => {
    fetchDisasters();
  }, []);

  const [newSurveyArray, setNewSurveyArray] = React.useState({
    "disasterType": "",
    "assesment_method": "",
    "structure_type": "",
    
  });
  const [errorSurveyArray, setErrorSurveyArray] = React.useState({
    "disasterType": false,
    "assesment_method": false,
    "structure_type": false
  });

  useEffect(() => {
    setNewSurveyArray({
      "disasterType": "",
      "assesment_method": "",
      "structure_type": "",
    });
    clearAllData();
    fetchTotalSurvey();
    fetchDisasters();
    fetchAssessmentMethod();
    fetchStuctureType();
  }, []);

  const clearAllData = () => {
    removeFew(['@surveyId', '@geoInfo', '@cameraPhoto', '@answerState', '@conditionSurvey']).then((result) => {
      console.log('All localstorage data removed');
    }).catch((err) => {
      console.log(err);
    });

  }

  const getCuUserId = async () => {
    
    var userId = '';
    const user_id = await getData('@userId');
    console.log( "UserID" , user_id)
    if (user_id) {
      userId = user_id;
      
    } else {
      const guestUserId = await getData('@guestUserId');
      console.log( "GUEST_ID" , guestUserId)
      if (guestUserId) {
        userId = guestUserId;
      } else {
        userId = uuid.v4();
        await storeData(userId, '@guestUserId');
      }
    }
    return userId;
  
  }
  console.log( "GetCuUserId" , getCuUserId)

  //fetch disaster data
  const fetchTotalSurvey = async () => {
    const userId = await getCuUserId();
    console.log('USERID' , userId)
    cortexSurveyFirebaseApi.post('totalSurvey', { user_id: userId }).then((result) => {
      const data = result.data.data;
      console.log(data);
      setTotalNoSurvey(data.total_survey < 9 ? '0' + data.total_survey : data.total_survey);
      setSurveyTillDate(data.till_date);
    }).catch((err) => {
      console.log(err.message);
    });
  }

  //fetch disaster data


  //  const fetchDisasters = () => {
  //   const requestBody = {
  //     auth_key: "ltnfvh18zxItOhP2qzrtynnVvbyniu"
  //   };

  //   fetch('http://192.168.1.100:6000/disasters', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(requestBody)
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       if (data.is_successful === "1") {
  //         setDisasters(data.data); // Set the disasters state variable with data
  //         console.log(data);
  //       }
  //     })
  //     .catch(error => {
  //       console.error('There was a problem with the fetch operation:', error);
  //     });
  // };



  const fetchDisasters = () => {
    const requestBody = {
      auth_key: config.authKey // Use the authKey from the configuration
    };

    const url = `${config.baseUrl}/disasters`; // Construct the URL using the baseUrl from the configuration

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
          setDisasters(data.data); // Set the disasters state variable with data
          // console.log(data);
        }
      })
      .catch(error => {
        // console.error('There was a problem with the fetch operation:', error);
      });
  };





  const fetchAssessmentMethod = () => {
    const requestBody = {
      auth_key: config.authKey // Use the authKey from the configuration
    };

    const url = `${config.baseUrl}/assessment_methods`

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
          setAssessmentMethods(data.data);
          console.log(data);
        }
      })
      .catch(error => {
        // console.error('There was a problem with the fetch operation:', error);
      });
  };

  useEffect(() => {
    fetchAssessmentMethod();
  }, []);



  const fetchStuctureType = () => {
    const requestBody = {
      auth_key: config.authKey
    };
    const url = `${config.baseUrl}/structure_type`;

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
          setStructures(data.data);
          console.log(data);
        }
      })
      .catch(error => {
        // console.error('There was a problem with the fetch operation:', error);
      });
  };


  useEffect(() => {
    fetchStuctureType();
  }, []);

  // useEffect(() => {
  //   let errorCount = 0;
  //   Object.keys(newSurveyArray).map((element, i) => {
  //     if (newSurveyArray[element] === "") {
  //       errorCount++;
  //     }
  //   });

  //   if (errorCount === 0) {
  //     storeDataObject(newSurveyArray, '@questionFilters').then((result) => {
  //       console.log('data store successfully');
  //       navigation.navigate('PickLocation');
  //     }).catch((err) => {
  //       console.log(err.message + 'data could not store');
  //     });
  //   }
  // }, [newSurveyArray]);


  const handleChange = (index, key) => {
    let selectedDisaster = disasters[index];
    let selectedAssessmentMethod = assessmentMethods[index]; 
    console.log(selectedAssessmentMethod)
    setNewSurveyArray((prev) => {
      if (key === 'disasterType') {
        return {
          ...prev,
          // [key]: disasters[index]
          [key]: selectedDisaster.disaster_name,
          disasterId: selectedDisaster.disasters_id 

        }
      }
     
    
      if (key === 'assesment_method') {
        console.log('assessmentMethodId:', selectedAssessmentMethod.assesment_methods_id);
        return {
          ...prev,
          // [key]: assesments[index],
          [key]: selectedAssessmentMethod.assesment_methods_code,
          assessmentMethodId: selectedAssessmentMethod.assesment_methods_id 
        }
      }
     
      if (key === 'structure_type') {
        return {
          ...prev,
          [key]: structures[index]
        }
      }
    })

    console.log("disasters_id",selectedDisaster.disasters_id); 
    console.log("assessment_methods_id", selectedAssessmentMethod.assesment_methods_id); 
  }

  const handleSubmit = async  () => {
    // let errorCount = 0;
    // Object.keys(newSurveyArray).forEach(element => {
    //   if (newSurveyArray[element] === "") {
    //     errorCount++;
    //     setErrorSurveyArray(prev => ({
    //       ...prev,
    //       [element]: true
    //     }));
    //   }
    // });

    // if (errorCount === 0) {
      // storeDataObject(newSurveyArray, '@questionFilters').then((result) => {
      //   console.log('data store successfully');
      //   navigation.navigate('PickLocation');
      // }).catch((err) => {
      //   console.log(err.message + 'data could not store');
      // });

    //   try {
    //     // Save the disasterId to AsyncStorage
    //     await AsyncStorage.setItem('disasterId',newSurveyArray.disasterId.toString());
    //     console.log('Disaster ID stored successfully:', newSurveyArray.disasterId);
        
    //     await AsyncStorage.setItem('assessmentMethodId', newSurveyArray.assessmentMethodId.toString());
    //     console.log('assessmentMethod ID stored successfully:', newSurveyArray.assessmentMethodId);
        
    //     // Store the survey data
    //     await storeDataObject(newSurveyArray, '@questionFilters');
    //     console.log('Data stored successfully');
    //     // Navigate to the PickLocation screen
        navigation.navigate('PickLocation');
    //   } catch (error) {
    //     console.log('Error storing data or disasterId:', error);
    //   }
    // }
  }

  // console.log('newSurveyArray', newSurveyArray);

  return (
    <Container style={styles.container}>
      <ScrollView>
{/*         
        <Row style={{ marginTop: 20 }}>
          <HomeCard
            style={styles.topCard}
            icon="account"
            icon_size={30}
            para={<Text style={{fontSize:11, fontWeight:'900'}}>Guest Professional Surveyor</Text>}
            paraStyle={{ fontSize: theme.fontsizes.xsmall }} />
          <HomeCard
            style={styles.topCard}
            icon="certificate"
            icon_size={30} para={<Text style={{fontSize:11, fontWeight:'900'}}>E-certification</Text>}
            paraStyle={{ fontSize: theme.fontsizes.xsmall }} />
          <HomeCard
            style={styles.topCard}
            icon="phone"
            icon_size={30}
            para={<Text style={{ fontSize: 11, fontWeight:'900' }}>Call Helpline</Text>}
            paraStyle={{ fontSize: theme.fontsizes.xsmall }} />
        </Row>
        <View style={styles.notice_row}>
          <Text style={styles.notice_txt}>Notice or Advertiesment issued by Company</Text>
        </View>
        <Row>
          <HomeCard
            style={styles.midCard}
            icon="comment-text-outline"
            icon_size={30}
            para="Review Survey"
            paraStyle={{ fontSize: theme.fontsizes.mid }} />
          <HomeCard
            style={styles.midCard}
            icon="clock-outline"
            icon_size={30}
            para="Survey History"
            paraStyle={{ fontSize: theme.fontsizes.mid }} />
        </Row> */}
        {/* <Row style={{ marginTop: 10, alignSelf: 'center' }}>
          <Headline>New Survey</Headline>
        </Row> */}

        <View style={styles.formGroup}>
          <Row style={{ marginHorizontal: 0 }}>
            {/* <SelectDropdown
              data={disastersArray}
              onSelect={(selectedDisaster, index) => {
                handleChange(index, 'disasterType');
              }}
              defaultValue={newSurveyArray['disasterType']}
              buttonTextAfterSelection={(selectedDisaster, index) => {
                return selectedDisaster
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
              buttonStyle={{
                ...styles.dropdown3BtnStyle, ...{
                  width: '100%',
                  borderColor: errorSurveyArray.disasterType ? theme.colors.danger : theme.colors.primary
                }
              }}
              renderCustomizedButtonChild={(selectedItem, index) => {
                return (   
                  <View style={styles.dropdown3BtnChildStyle}>
                    <Icon name="weather-snowy-rainy" color={theme.colors.text} size={32} />
                    <Text style={styles.dropdown3BtnTxt}>{selectedItem ? selectedItem : 'Type of Disaster'}</Text>
                  </View>
                );
              }}
            /> */}
            <SelectDropdown
              data={disasters.map(disaster => disaster.disaster_name)}
              onSelect={(selectedDisaster, index) => {
                handleChange(index, 'disasterType');
                
                
              }}
              defaultValue={newSurveyArray['disasterType']}
              buttonTextAfterSelection={(selectedDisaster, index) => {
                return selectedDisaster
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
              buttonStyle={{
                ...styles.dropdown3BtnStyle, ...{
                  width: '100%',
                  borderColor: errorSurveyArray.disasterType ? theme.colors.danger : theme.colors.primary
                }
              }}
              renderCustomizedButtonChild={(selectedItem, index) => {
                return (
                  <View style={styles.dropdown3BtnChildStyle}>
                    <Icon name="weather-snowy-rainy" color={theme.colors.textDark} size={32} />
                    <Text style={styles.dropdown3BtnTxt}>{selectedItem ? selectedItem : 'Type of Disaster'}</Text>
                  </View>
                );
              }}
            />

          </Row>
          <Row style={{ marginTop: 10, marginHorizontal: 0 }}>

            <SelectDropdown
              data={assessmentMethods.map(method => method.assesment_methods_code)} // Map the data to display only assessment method codes
              onSelect={(selectedAssessmentMethod, index) => {
                handleChange(index, 'assesment_method');
                
              }}
              defaultValue={newSurveyArray['assesment_method']}
              buttonTextAfterSelection={(selectedAssessmentMethod, index) => {
                return selectedAssessmentMethod
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
              buttonStyle={{
                ...styles.dropdown3BtnStyle, ...{
                  width: '48%',
                  borderColor: errorSurveyArray.assesment_method ? theme.colors.danger : theme.colors.primary
                }
              }}
              renderCustomizedButtonChild={(selectedItem, index) => {
                return (
                  <View style={styles.dropdown3BtnChildStyle}>
                    <Icon name="card-bulleted-outline" color={theme.colors.textDark} size={32} />
                    <Text style={styles.dropdown3BtnTxt}>{selectedItem ? selectedItem : 'Assessment Method'}</Text>
                  </View>
                );
              }}
            />

            <SelectDropdown
              data={structures.map(method => method.stucture_name)} 
              onSelect={(selectedItem, index) => {
                handleChange(index, 'structure_type');
              }}
              defaultValue={newSurveyArray['structure_type']}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
              buttonStyle={{ ...styles.dropdown3BtnStyle, ...{ width: '48%' } }}
              renderCustomizedButtonChild={(selectedItem, index) => {
                return (
                  <View style={styles.dropdown3BtnChildStyle}>
                    <Icon name="office-building" color={theme.colors.textDark} size={32} />
                    <Text style={styles.dropdown3BtnTxt}>{selectedItem ? selectedItem : 'Structure Type'}</Text>
                  </View>
                );
              }}
            />
          </Row>

          <Button
            style={styles.btn_large}
            mode="contained"
            
            contentStyle={{ height: 40 }}
            labelStyle={{ fontSize: 15 }}
            onPress={handleSubmit}
            // disabled={isDisabled}
            // loading={submitLoader}
            uppercase={false}
          >
            Start Survey
          </Button>
        </View>
      </ScrollView>
    </Container>
  )
}

export default NewSurvey

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: 'flex-start',
  },
  topCard: {
    width: 100,
    height: 110,
  },
  midCard: {
    width: 170,
    height: 80,
  },
  card_txt: {
    flex: 1,
    color: theme.colors.text,
    textAlign: 'center',
    fontSize: theme.fontsizes.medium,
  },
  notice_row: {
    marginTop: 20,
    marginBottom: 20,
    paddingVertical: 100,
    backgroundColor: '#e9ecf2',
    justifyContent: 'center'
  },
  notice_txt: {
    color: theme.colors.textDark,
    fontWeight:'700',
    textAlign: 'center'
  },
  dropdown3BtnStyle: {
      height: 70,
      color:'black',    
    backgroundColor: '#e9ecf2',
    paddingHorizontal: 0,
    borderWidth: 0,
    borderRadius: 0,
    borderColor: '#444',
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  dropdown3BtnTxt: {
    color: theme.colors.textDark,
    textAlign: 'center',
      fontSize: theme.fontsizes.xlarge,
    fontWeight:'600',
    marginHorizontal: 5,
  },
  btn_large: {
      marginVertical: 15,
      backgroundColor:'#3371cb',
    justifyContent: 'center'
  },
  formGroup: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
})